import React, { useEffect, useState, useRef } from 'react'
import "pages/Landing.css"
import banner from "assets/mainbanner.jpg"
import Listing from 'components/Listing'
import Header from 'components/Header'


function Landing() {

    // const apiKey = https://openapi.etsy.com/v2/listings/active?api_key=prj207rtzok77jrk84zfv90f

    // const scrollHeight = useScrollPosition()
    const parallaxRef = useRef()
    const [listings, setListings] = useState([]);
    const [columns, setColumns] = useState(3);

    useEffect(() => {
        const paraHandler = () => {
            requestAnimationFrame(() => {
                if (parallaxRef.current) {
                    // console.log("update")
                    parallaxRef.current.style.transform = `translateY(${document.body.scrollTop / 2}px)`;
                }
            });
        };

        // const throttledHandler = throttle(paraHandler, 10); // Throttle the event to run every 10ms
        document.body.addEventListener('scroll', paraHandler);

        return () => {
            document.body.removeEventListener('scroll', paraHandler);
        };
    }, [])

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 450) {
                setColumns(1);
            } else if (window.innerWidth <= 812) {
                setColumns(2);
            } else {
                setColumns(3);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const distributeListingsIntoColumns = (listings, columns) => {
        const columnsArray = Array.from({ length: columns }, () => []);
        listings.forEach((listing, index) => {
            columnsArray[index % columns].push(listing);
        });
        return columnsArray;
    };

    const columnsArray = distributeListingsIntoColumns(listings.length ? listings : Array(6).fill({}), columns);


    useEffect(() => {
        fetch('https://mcgrails3dprints.com/api/listings')
            // fetch('/testlistings.json')

            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (data.error) throw new Error("Error from API", data.error)
                setListings(data.output);
            })
            .catch(error => {
                console.error('Error fetching listings:', error);
            });
    }, []);

    return (
        <div className='Landing'>
            <div className="MainBanner">
                <div className="MainBannerParallaxWrap">
                    <div className="MainBannerParallax" ref={parallaxRef} style={{ transition: 'transform 20ms ease-out' }}>
                        <Header></Header>
                        <div className="MainBannerImageWrap"><img src={banner} alt="Banner" /></div>
                    </div>
                </div>

                <div className='MainBannerBorder'></div>
            </div>
            <div className='Listings'>
                {columnsArray.map((column, columnIndex) => (
                    <div className='ListingsColumn' key={`column-${columnIndex}`}>
                        {column.map((listing, index) => (
                            <Listing listing={listing} key={listing.url || `col${columnIndex}-${index}`} />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}

// 130.211.40.170
// mcgrails3dprints.com.
// mcgrails3dprints.patternbyetsy.com

export default Landing