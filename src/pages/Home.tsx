// import button from bootstrap
import Button from "react-bootstrap/Button";

import { useState, useEffect } from "react";

// importing supabase
import supabase from "../lib/supabaseClient";

// import react router dom
import { Link } from "react-router-dom";

// import css
import "../assets/css/login.css";

export function Home() {

  async function signInWithEmail() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      console.log(error);
    }
    window.location.href = "/rh";
    setLoading(false)
  }

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <div id="welcome" className="welcome container-fluid py-5">
        <h2>Projet Compétences</h2>
        <h1>Bienvenue, name</h1>
      </div>

      <div className="login split-screen">
        <div className="left">
          <section className="copy">
            <h1>Projet Compétences</h1>
            <p>Progiciel de gestion des acquis en entreprise</p>
          </section>
        </div>

        <div className="right">
          <Link to="/rh">
            <h1>Connexion</h1>
          </Link>
          <h2>Projet Compétences</h2>

         
            <div>
              <input
                className="inputField"
                type="email"
                placeholder="email"
                required={true}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                className="inputField"
                type="password"
                placeholder="password"
                required={true}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <Button onClick={signInWithEmail} className="button" variant="primary" disabled={loading}>
                {loading ? "Loading ..." : "Connexion"}
              </Button>
            </div>
    

          <div className="version">
            <Link to="/about">
              <h5>Alpha 0.0.1 - Electron x React </h5>
              <h5>made by guillaume / delange / aubriet</h5>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
