import React from 'react'
import "components/Header.css"
import InstagramIcon from "assets/Instagram.svg"
import TikTokIcon from "assets/TikTok.svg"
import YoutubeIcon from "assets/Youtube.svg"

function Header() {
    return (
        <div className='Header'>
            <div className="HeaderLeft">
                {/* <h1></h1> */}
            </div>
            <div className="HeaderRight">
                <a href="https://www.instagram.com/mcgrails3dprints" target='_blank' rel="noreferrer"><img src={InstagramIcon} alt="Instagram" /></a>
                <a href="https://www.tiktok.com/@mcgrail_" target='_blank' rel="noreferrer"><img src={TikTokIcon} alt="TikTok" /></a>
                <a href="http://www.youtube.com/@McGrails3DPrints" target='_blank' rel="noreferrer"><img src={YoutubeIcon} alt="Youtube" /></a>
            </div>
        </div>
    )
}

export default Header