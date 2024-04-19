fetch("https://openapi.etsy.com/v3/shops/1626500092/listings/active", {
    headers: {
        "x-api-key": ""
    }
}).then(resp => resp.json()).then((resp) => {
    console.log(resp)
})
console.log("sent")
