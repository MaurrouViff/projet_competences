// import button from bootstrap
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

// import react router dom
import { Link } from "react-router-dom";

// import css
import "../assets/css/login.css";

export function Home() {
  return (
    <>
      <div className="split-screen">
        <div className="left">
          <section className="copy">
            <h1>Projet Compétences</h1>
            <p>Progiciel de gestion des acquis en entreprise</p>
          </section>
        </div>

        <div className="right">
          <Link to="/rh">
          <h1>Connexion</h1></Link>
          <h2>Projet Compétences</h2>

          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="email" placeholder="Adresse mail" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control type="password" placeholder="Mot de passe" />
            </Form.Group>
            <Button type="submit" variant="light">
              Connexion
            </Button>{" "}
          </Form>

          

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
