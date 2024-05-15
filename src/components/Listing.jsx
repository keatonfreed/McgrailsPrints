import React from 'react'
import "components/Listing.css"

function Listing({ listing }) {
    return (
        <div className='Listing' style={{ backgroundImage: `url(${listing.image[0]["urlfullxfull"]})` }}>
            <div className='ListingDetails'>
                <h1 className='ListingTitle'>{listing.title}</h1>
                <h1 className='ListingPrice'>{listing.price}</h1>
            </div>

        </div>
    )
}

export default Listing