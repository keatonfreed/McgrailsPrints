import React, { useEffect, useState, useRef } from 'react'
import "pages/Landing.css"
import banner from "assets/mainbanner.jpg"
// import banner from "assets/mainbanner_copy.jpg"
import Listing from 'components/Listing'
import Header from 'components/Header'

function Landing() {
    const parallaxRef = useRef();
    const [listings, setListings] = useState([]);
    const [columns, setColumns] = useState(3);
    // const [scrollY, setScrollY] = useState(0);
    // const [targetScrollY, setTargetScrollY] = useState(0);

    // useEffect(() => {
    //     const updateScrollPosition = () => {
    //         const newScrollY = document.body.scrollTop || document.documentElement.scrollTop;
    //         setTargetScrollY(newScrollY / 2);
    //     };

    //     const interpolateScroll = () => {
    //         setScrollY((prevScrollY) => {
    //             const delta = targetScrollY - prevScrollY;
    //             const smoothingFactor = Math.abs(delta) > 5 ? 0.3 : 1; // Smooth if delta is large, otherwise stay in sync
    //             // const smoothingFactor = 1; // Smooth if delta is large, otherwise stay in sync

    //             return prevScrollY + delta * smoothingFactor;
    //         });

    //         if (parallaxRef.current) {
    //             parallaxRef.current.style.transform = `translateY(${scrollY}px)`;
    //         }

    //         requestAnimationFrame(interpolateScroll);
    //     };

    //     document.body.addEventListener('scroll', updateScrollPosition);
    //     requestAnimationFrame(interpolateScroll);

    //     return () => {
    //         document.body.removeEventListener('scroll', updateScrollPosition);
    //     };
    // }, [targetScrollY, scrollY]);

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
                console.log(data);
                if (data.error) throw new Error("Error from API", data.error);
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
                    <div className="MainBannerParallax" ref={parallaxRef} >
                        {/* <div className="MainBannerParallax" ref={parallaxRef} style={{ transition: 'transform 20ms ease-out' }}> */}
                        <Header />
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
    );
}

export default Landing;
