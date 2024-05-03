// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2

const axios = require('axios')


function sendSuccess(message) {
  return {
    statusCode: 200,
    body: JSON.stringify({ output: message }),
  }
}
function sendError(message) {
  return {
    statusCode: 500,
    body: JSON.stringify({ error: message }),
  }
}


const handler = async (event) => {
  try {
    const apiKey = process.env.ETSY_API_KEY
    if (!apiKey) {
      console.log("API Key not loaded properly:", apiKey)
      return sendError("API Error")
    }

    axios.get("https://openapi.etsy.com/v3/application/shops/46422638/listings/active", {
      headers: {
        "x-api-key": apiKey
      },
      method: 'GET'
    }).then(resp => resp.json()).then((resp) => {
      console.log("Got Etsy listings API response.")

      let results = resp.results
      let filtered = results.map(({ title, description, id, url, featured_rank, price }) => {
        let priceNum = price.amount / price.divisor
        return {
          id, title, description, url, rank: featured_rank, price: priceNum
        }
      })
      console.log("Function Success, sending:", filtered.length)
      return sendSuccess(filtered)
    }).catch((err) => {
      console.log("API Error:", err)
      return sendError("API Error")
    })
  } catch (error) {
    console.log("Runtime Error:", error)
    return sendError("Server Error")
  }
}

module.exports = { handler }
