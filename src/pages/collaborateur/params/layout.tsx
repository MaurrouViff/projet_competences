import {BadgeCheck, LayoutDashboard} from "lucide-react";
import {Link} from "react-router-dom";

export function LayoutCollaborateur() {
    return (
        <>
            <div style={{width: "300px", backgroundColor: "#F1F5F9", height: "100vh"}} className="menu-sandwich">
                <Link to="/collaborateur/eval">
                    <LayoutDashboard/>
                    Evaluations
                </Link>
                <Link to="/collaborateur/skills">
                    <BadgeCheck/>
                    Voir les compétences

                </Link>

            </div>
        </>
    )
}
