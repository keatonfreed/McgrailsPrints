
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
  // const { error: delError } = await supabase
  //   .from('Listings')
  //   .delete()
  // if (delError) return console.log("Delete Error:", delError)

  // const { data: added, insError } = await supabase
  //   .from('Listings')
  //   .insert([
  //     { data: 'Inset from API DATA LALA' },
  //   ])
  // if (insError) return console.log("Delete Error:", delError)


  // let { data: listings, error } = await supabase
  //   .from('Listings')
  //   .select('*')
  // console.log(listings, error)
  // return sendSuccess([added, err, listings, error])

  try {
    const apiKey = process.env.ETSY_API_KEY
    if (!apiKey) {
      console.log("API Key not loaded properly:", apiKey)
      return sendError("API Error")
    }

    console.log("Function init, fetching listings...")
    let { data: etsyData } = await axios.get("https://openapi.etsy.com/v3/application/shops/46422638/listings/active", {
      headers: {
        "x-api-key": apiKey
      },
      method: 'GET'
    })


    let results = etsyData.results;
    let listingIds = [];
    let filtered = results.map(({ title, description, id, url, featured_rank, price }) => {
      let priceNum = price.amount / price.divisor;
      listingIds.push(id);
      return {
        id, title, description, url, rank: featured_rank, price: priceNum
      };
    });
    console.log("Got Etsy listings API response:", filtered.length, listingIds);

    const { data: imgSelectData, error: imgSelectError } = await supabase
      .from("Listings")
      .select("listing_id, data")
    // .in("listing_id", listingIds);

    if (imgSelectError) {
      return console.log("Select Error:", imgSelectError);
    }
    console.log("Selected all images from IDs", imgSelectData);
    return

    let listingsNotFound = [...listingIds];
    imgSelectData.forEach(({ listing_id, data }) => {
      listingsNotFound.splice(listingsNotFound.indexOf(listing_id), 1);
      let listing = filtered.find(item => item.id === listing_id);
      if (listing) {
        listing.image = data;
      }
    });
    console.log("Listing images not cached:", listingsNotFound);

    for (let i = 0; i < listingsNotFound.length; i++) {
      let { data: etsyImageData } = await axios.get(`https://openapi.etsy.com/v3/application/listings/${listingsNotFound[i]}/images`, {
        headers: {
          "x-api-key": apiKey
        },
        method: 'GET'
      });
      let etsyImageResults = etsyImageData.results;
      console.log("Fetched Etsy image data", etsyImageResults);

      const { data: added, error: insError } = await supabase
        .from('Listings')
        .insert([
          { listing_id: listingsNotFound[i], data: etsyImageResults }
        ]);
      if (insError) {
        return console.log("Insert Error:", insError);
      }

      let listing = filtered.find(item => item.id === listingsNotFound[i]);
      if (listing) {
        listing.image = etsyImageResults;
      }

      await new Promise(res => setTimeout(res, 200));
    }

    console.log("Function Success, sending:", filtered.length);
    return sendSuccess(filtered);
  } catch (error) {
    console.log("Runtime Error:", error)
    return sendError("Server Error")
  }
}

// export const config = {
//   path: "/api/listings"
// };

module.exports = { handler }
