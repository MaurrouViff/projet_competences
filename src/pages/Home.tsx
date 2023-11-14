// import button from bootstrap
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { useEffect, useState } from "react";

// importing supabase
import supabase from "../lib/supabaseClient";

// import react router dom
import { Link } from "react-router-dom";

// import css
import "../assets/css/login.css";

export function Home() {
  function test() {
    const welcome = document.getElementById("welcome");
    welcome?.style.setProperty("display", "block");
    setTimeout(() => {
      welcome?.style.setProperty("display", "none");
    }, 2000);
  }

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

   

    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ email });

    if (error) {
      alert("Error");
    } else {
      alert("Check your email for the login link!");
    }
    setLoading(false);
  };

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

          <form className="form-widget" onSubmit={handleLogin}>
            <div>
              <input
                className="inputField"
                type="email"
                placeholder="Your email"
                value={email}
                required={true}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <button className={"button block"} disabled={loading}>
                {loading ? <span>Loading</span> : <span>Send magic link</span>}
              </button>
            </div>
          </form>

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
