const env = require("dotenv").config()
const fs = require("fs")

fetch("https://openapi.etsy.com/v3/application/shops/46422638/listings/active", {
    headers: {
        "x-api-key": process.env.ETSY_API_KEY
    }
}).then(resp => resp.text()).then((resp) => {
    console.log(resp)
    fs.writeFileSync("listings.json", resp)
})
console.log("sent", process.env.ETSY_API_KEY)
