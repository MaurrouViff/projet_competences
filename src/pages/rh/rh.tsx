import "../../assets/css/rh.css";
import { Layout } from "./layout.tsx";
import { useContext } from "react";

import  {UserContext}  from "../../App.tsx";

export function Rh() {
  const user = useContext(UserContext);

  return (
    <>
      <Layout>
        <div style={{ display: "flex", background: "#fff", width: "100%" }}>
          <div className="rh">
            <h1>Espace RH</h1>
            <h3>{user.prenom + " " + user.nom}</h3>
            <img src="/OASIS-logo.jpg" alt="" />
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Rh;
