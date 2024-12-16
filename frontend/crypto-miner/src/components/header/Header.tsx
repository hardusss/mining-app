import React from "react";
import btcIcon from "../../static/img/icons/btc.png"; 
import ethIcon from "../../static/img/icons/eth.png"; 
import "../../static/styles/Header.scss";

export default function Header () {
    return (
        <section className="d-flex">
            <img src={btcIcon} alt="bitcoin"/>
            <h3 className="mt-2">MINIG</h3>
            <img src={ethIcon}  alt="ethereum"/>
        </section>
    )
}