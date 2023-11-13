import {Layout} from "./layout.tsx";
import {BadgeCheck, LayoutDashboard, PlusSquare} from "lucide-react";
import '../../assets/css/menu.css'

export function Salarie() {
    return (
        <>
            <Layout>
                <div style={{width: "300px", backgroundColor: "#F1F5F9", height: "100vh"}} className="menu-sandwich">
                    <p>
                        <LayoutDashboard/>
                        Employés
                    </p>
                    <p>
                        <BadgeCheck/>
                        Compétences
                    </p>
                    <p>
                        <PlusSquare/>
                        Ajouter compétences
                    </p>
                    <p>
                        <BadgeCheck/>
                        Evaluations
                    </p>
                    <p>
                        <PlusSquare/>
                        Ajouter évaluations
                    </p>
                </div>
            </Layout>
        </>
    )
}