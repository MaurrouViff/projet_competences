// import react router dom
import { Link } from "react-router-dom";

import "../assets/css/about.css";

export function About() {
  return (
    <>
      <div className="about">
        <h1>About</h1>
        <Link to="/"> Retour</Link>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda vel
          dolor deserunt a quasi ea eligendi quod, perferendis error sed in
          recusandae qui saepe laborum minus labore, tempore consectetur sint.
        </p>

        <div className="dev">
          <h2>Developed by</h2>
          <ul className="list">
            <li>Corentin Guillaume</li>
            <li>Aurélien Aubriet</li>
            <li>Aymeric Delange</li>
          </ul>
        </div>

        <div className="stack">
            <h3>Made with React / Electron</h3>
        </div>
      </div>
    </>
  );
}
