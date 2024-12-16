import React, { useState } from "react";
import "../../static/styles/Navigation.scss";

export default function Navigation() {
  const [activeItem, setActiveItem] = useState<string>("home"); 

  const handlerClickNavigate = (item: string) => {
    setActiveItem(item); 
    console.log(`Navigated to: ${item}`);
  };

  return (
    <section
      className="d-flex"
      style={{
        position: "absolute",
        right: 0,
        left: "2.5%",
        bottom: "5px",
        width: "95%",
      }}
    >
      <section
        className={`navigate-item ${activeItem === "home" ? "active" : ""}`}
        onClick={() => handlerClickNavigate("home")}
      >
        <i className={`bi ${activeItem === "home" ? "bi-house-door-fill" : "bi-house-door"}`}></i>
      </section>
      <section
        className={`navigate-item ${activeItem === "task" ? "active" : ""}`}
        onClick={() => handlerClickNavigate("task")}
      >
        <i className={`bi  ${activeItem === "task" ? "bi-list-task" : "bi-card-checklist"}`}></i>
      </section>
      <section
        className={`navigate-item ${activeItem === "friends" ? "active" : ""}`}
        onClick={() => handlerClickNavigate("friends")}
      >
        <i className={`bi ${activeItem === "friends" ? "bi-people-fill" : "bi-people"}`}></i>
      </section>
      <section
        className={`navigate-item ${activeItem === "wallet" ? "active" : ""}`}
        onClick={() => handlerClickNavigate("wallet")}
      >
        <i className={`bi  ${activeItem === "wallet" ? "bi-wallet-fill" : "bi-wallet"}`}></i>
      </section>
    </section>
  );
}
