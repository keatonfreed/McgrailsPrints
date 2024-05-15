import React from 'react'
import "components/Listing.css"
import he from 'he';


function Listing({ listing }) {
    const decodedTitle = listing.title ? he.decode(listing.title) : "Loading...";

    return (
        <a href={listing.url || "#0"} target="_blank" rel="noreferrer" className='Listing'>
            <img src={listing?.image?.[0]?.["url_fullxfull"] || "https://blank"} alt="Listing Display" srcset="" />
            <div className='ListingDetails'>
                <h1 className='ListingTitle'>{decodedTitle}</h1>
                <h1 className='ListingPrice'>${listing.price}</h1>
            </div>
            <div className="ListingBorder"></div>
        </a>
    )
}

export default Listing