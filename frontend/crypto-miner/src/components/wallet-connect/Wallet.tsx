import React from "react";
import WalletConnectIcon from "../../static/img/icons/smart-wallet.png"
import { useTonConnectUI } from "@tonconnect/ui-react";
export default function WalletConnect () {
    const [tonConnectUI, setOptions] = useTonConnectUI();
    return (
            <>
            <section style={{width: "fit-content", float: "right", marginLeft: "10px", padding: "12px"}}>
                <button style={{backgroundColor: "transparent", border: "none"}} onClick={() => tonConnectUI.openModal()}>
                    <img src={WalletConnectIcon} alt="wallet" />
                </button>
            </section>
            </>
    )   
}