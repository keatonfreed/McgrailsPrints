
require('dotenv').config();
const {
  DATABASE_URL,
  SUPABASE_SERVICE_API_KEY
} = process.env;

// Connect to our database 
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(DATABASE_URL, SUPABASE_SERVICE_API_KEY);

const axios = require('axios')


function sendSuccess(message) {
  return {
    statusCode: 200,
    body: JSON.stringify({ output: message })
  }
}
function sendError(message) {
  return {
    statusCode: 500,
    body: JSON.stringify({ error: message })
  }
}


const handler = async (event) => {
  let { data: listings, error } = await supabase
    .from('Listings')
    .select('*')
  console.log(listings, error)
  return sendSuccess([listings, error])

  try {
    const apiKey = process.env.ETSY_API_KEY
    if (!apiKey) {
      console.log("API Key not loaded properly:", apiKey)
      return sendError("API Error")
    }

    console.log("Function init, running...")
    let { data } = await axios.get("https://openapi.etsy.com/v3/application/shops/46422638/listings/active", {
      headers: {
        "x-api-key": apiKey
      },
      method: 'GET'
    })

    let results = data.results
    console.log("Got Etsy listings API response:", results.length)
    let filtered = results.map(({ title, description, id, url, featured_rank, price }) => {
      let priceNum = price.amount / price.divisor
      return {
        id, title, description, url, rank: featured_rank, price: priceNum
      }
    })
    console.log("Function Success, sending:", filtered.length)
    return sendSuccess(filtered)
  } catch (error) {
    console.log("Runtime Error:", error)
    return sendError("Server Error")
  }
}

// export const config = {
//   path: "/api/listings"
// };

module.exports = { handler }
