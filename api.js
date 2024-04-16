fetch("https://openapi.etsy.com/v3/shops/1626500092/listings/active", {
    headers: {
        "x-api-key": "j3z2zgyj2us0as604sehh1lw"
    }
}).then(resp => resp.json()).then((resp) => {
    console.log(resp)
})
console.log("sent")
