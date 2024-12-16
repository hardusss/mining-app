// import react
import React, { useState, useEffect } from "react";

// Import styles
import "../../static/styles/Main.scss";

// import components
import Header from "../header/Header";
import Parser from "../parser-address/Parser";
import WalletConnect from "../wallet-connect/Wallet";
import Navigation from "../navigation/NavigationBar";

// Import ton connect
import { TonConnectUIProvider } from '@tonconnect/ui-react';

// import images
import tonIcon from "../../static/img/icons/ton.png"; 
import btcIcon from "../../static/img/icons/btc.png"; 
import ethIcon from "../../static/img/icons/eth.png"; 

export default function Main() {
    const [classBtc, setClassBtc] = useState<string>("default-border");
    const [classEth, setClassEth] = useState<string>("default-border");
    const [classTon, setClassTon] = useState<string>("default-border");
    const [countdown, setCountdown] = useState<number | null>(null);
    const [isMining, setIsMining] = useState<boolean>(false);
    const [selectedCoin, setSelectedCoin] = useState<string>("");;
    const [sectionAdresses, setSectionAddresses] = useState<JSX.Element | null>(null);

    useEffect(() => {
        const startTime = localStorage.getItem('miningStartTime');
        if (startTime) {
            const remainingTime = 86400000 - (Date.now() - parseInt(startTime, 10));
            if (remainingTime > 0) {
                setIsMining(true);
                setCountdown(remainingTime);
            } else {
                localStorage.removeItem('miningStartTime');
            }
        }
    }, []);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isMining && countdown && countdown > 0) {
            timer = setInterval(() => {
                setCountdown(prev => {
                    if (!prev || prev <= 1000) {
                        clearInterval(timer);
                        setIsMining(false);
                        localStorage.removeItem('miningStartTime');
                        return 0;
                    }
                    return prev - 1000;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isMining, countdown]);

    const startMining = () => {
        if (selectedCoin !== ""){
            setSectionAddresses(<Parser coin={selectedCoin} />)
            const startTime = Date.now();
            localStorage.setItem('miningStartTime', startTime.toString());
            setIsMining(true);
            setCountdown(86400000); 
        }
    };

    const formatTime = (milliseconds: number): string => {
        const hours = String(Math.floor(milliseconds / (1000 * 60 * 60))).padStart(2, '0');
        const minutes = String(Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
        const seconds = String(Math.floor((milliseconds % (1000 * 60)) / 1000)).padStart(2, '0');
        return `${hours}h ${minutes}m ${seconds}s`;
    };

    const hendlerSectionClick = (id: string) => {
        if (id === "btc") {
            setClassBtc("active-border");
            setClassEth("default-border");
            setClassTon("default-border");
        } else if (id === "eth") {
            setClassEth("active-border");
            setClassBtc("default-border");
            setClassTon("default-border");
        } else if (id === "ton") {
            setClassTon("active-border");
            setClassBtc("default-border");
            setClassEth("default-border");
        }
        setSelectedCoin(id)
    };

    return (
        <>
        <TonConnectUIProvider manifestUrl="https://raw.githubusercontent.com/hardusss/tonconnect/refs/heads/main/tonconnect-manifest.json">
        <WalletConnect />
            <Header />
            <main className="mt-3">
                <section>
                    <h1>SELECT CRYPTO</h1>
                    <div className="d-flex mt-3 select-crypto">
                        <div
                            className={`section ${classBtc}`}
                            onClick={() => hendlerSectionClick('btc')}
                        >
                            <img src={btcIcon} id="btc" alt="bitcoin" />
                        </div>
                        <div
                            className={`section ${classEth}`}
                            onClick={() => hendlerSectionClick('eth')}
                        >
                            <img src={ethIcon} id="eth" alt="ethereum" />
                        </div>
                        <div
                            className={`section ${classTon}`}
                            onClick={() => hendlerSectionClick('ton')}
                        >
                            <img src={tonIcon} id="ton" alt="toncoin" />
                        </div>
                    </div>
                </section>
                <button className="mt-2" onClick={startMining}>
                    {isMining && countdown !== null ? formatTime(countdown) : "START MINING!"}
                </button>
            </main>
            {sectionAdresses}
            <Navigation />
        </TonConnectUIProvider>
        
        </>
    );
}
