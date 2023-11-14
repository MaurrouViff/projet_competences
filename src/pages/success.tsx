// import react router dom
import { Link } from "react-router-dom";

import "../assets/css/about.css";

import supabase from "../lib/supabaseClient";

export function Success() {

    return (
        <>
            <div className="about">
                
                <Link to="/"> Retour</Link>
            </div>
        </>
    );
}
