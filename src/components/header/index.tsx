import React from "react";
import '../../style/header/header.css'
import HeaderMenu from "./menu/menu";
import MenuDropdown from "./dropdown/dropdown";
import CryptoCarousel from "../crypto-carousel";
import UserProfileHeader from "../user-profile-header";

function Header() {
    return (
        <>
            <div className="header">
                <HeaderMenu/>
                <div className={"menu-carousel-section"}>
                    <MenuDropdown/>
                    <CryptoCarousel/>
                </div>
                <UserProfileHeader/>
            </div>
        </>
    )
}

export default Header