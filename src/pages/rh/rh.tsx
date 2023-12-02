import "../../assets/css/rh.css";
import { Layout } from "./layout.tsx";
import { useState } from "react";

export function Rh() {
  const user = JSON.parse(localStorage.getItem("user")!);
  

  return (
    <>
      <Layout>
        <div style={{ display: "flex", background: "#fff", width: "100%" }}>
          <div className="rh">
            <h1>Team OASIS</h1>
            <h2>{user.nom}</h2>
            <img src="/OASIS-logo.jpg" alt="" />
          </div>
        </div>
      </Layout>
    </>
  );
}
