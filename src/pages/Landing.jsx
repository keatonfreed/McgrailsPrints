import React, { useEffect, useState } from 'react'
import "pages/Landing.css"
import banner from "assets/mainbanner.png"
import useScrollPosition from "hooks/useScrollPosition"
import Listing from 'components/Listing'


function Landing() {

    // const apiKey = https://openapi.etsy.com/v2/listings/active?api_key=prj207rtzok77jrk84zfv90f

    const scrollHeight = useScrollPosition()

    const [listings, setListings] = useState([]);

    useEffect(() => {
        fetch('/output.json')
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setListings(data);  // Update the state with the fetched listings data
            })
            .catch(error => {
                console.error('Error fetching listings:', error);
            });

        // No cleanup necessary, so no return statement is needed here
    }, []);  // Empty dependency array ensures this effect runs only once on mount

    // const listings = ["Darth Vader", "Luke Skywalker", "Thomas Jefferson", "James Madison", "John F Kennedy", "Frank Johnson", "Bobby Joe", "John Smith", "Jacob Junior", "Keaton Freed"]
    return (
        <div className='Landing'>
            <div className="MainBanner">
                <div className="MainBannerImg"><img src={banner} alt="Banner" style={{ "top": scrollHeight }} /></div>
                <div className='MainBannerBorder'></div>
            </div>
            <div className='Listings'>
                {listings.length ? listings.map(listing =>
                    <Listing listing={listing} key={listing.etsy_url} />
                ) : Array(6).fill({}).map((placeholder, index) =>
                    <Listing listing={placeholder} key={index} />
                )}
            </div>
        </div>
    )
}

// 130.211.40.170
// mcgrails3dprints.com.
// mcgrails3dprints.patternbyetsy.com

export default Landing