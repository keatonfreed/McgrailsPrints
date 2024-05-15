import React from 'react'
import "components/Listing.css"
import he from 'he';


function Listing({ listing }) {
    const decodedTitle = he.decode(listing.title);

    return (
        <div className='Listing'>
            <img src={listing?.image?.[0]?.["url_fullxfull"] || "https://blank"} alt="Listing Display" srcset="" />
            <div className='ListingDetails'>
                <h1 className='ListingTitle'>{decodedTitle}</h1>
                <h1 className='ListingPrice'>${listing.price}</h1>
            </div>
            <div className="ListingBorder"></div>
        </div>
    )
}

export default Listing