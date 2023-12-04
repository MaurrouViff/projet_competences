// import button from bootstrap
import Button from "react-bootstrap/Button";

import { useState } from "react";

// importing supabase
import supabase from "../lib/supabaseClient";

// import react router dom
import { Link } from "react-router-dom";

// import css
import "../assets/css/login.css";

export function Home() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function getRole(id_user) {
    supabase
      .from("salarie")
      .select("role")
      .eq("uuid", id_user)
      .then((data) => {
        let target = data.data[0].role;
        setLoading(false);

        if (target === 2) {
          console.log(target + " RH ");
          window.location.href = "/rh";
        } else if (target === 1) {
          console.log(target + " Collaborateur ");
          // set role in session storage
          sessionStorage.setItem("role", target);
          window.location.href = "/collaborateur";
        }
      });
  }

  async function signInWithEmail() {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      console.log(error);
      setLoading(false);
    }
    await getRole(data.user.id);

    
  }

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
          <h1>Connexion</h1>
          <h2>Projet Compétences</h2>

          <form>
            <div>
              <input
                style={{
                  padding: "10px",
                  borderRadius: 8,
                  outline: "none",
                  border: "none",
                  minWidth: "300px",
                }}
                className="inputField"
                type="email"
                placeholder="email"
                required={true}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                style={{
                  padding: "10px",
                  borderRadius: 8,
                  outline: "none",
                  border: "none",
                  marginTop: "8px",
                  minWidth: "300px",
                }}
                className="inputField"
                type="password"
                placeholder="password"
                required={true}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <Button
                style={{ width: "100%", marginTop: "8px" }}
                onClick={signInWithEmail}
                className="button"
                variant="primary"
                disabled={loading}
              >
                {loading ? "Chargement..." : "Se connecter"}
                  
                
              </Button>
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
