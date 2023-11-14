import {BadgeCheck, LayoutDashboard, PlusSquare} from "lucide-react";
import {Link} from "react-router-dom";
// import React, {ReactNode} from "react";
// import {Layout} from "../layout.tsx";
//
// interface RootLayoutProps {
//     children: ReactNode;
// }
//
// export const LayoutRH: React.FC<RootLayoutProps> = ({children}) => {
//     return (
//         <>
//             <Layout>
//                 <div style={{width: "300px", backgroundColor: "#F1F5F9", height: "100vh"}} className="menu-sandwich">
//                     <p>
//                         <LayoutDashboard/>
//                         Employés
//                     </p>
//                     <p>
//                         <BadgeCheck/>
//                         Compétences
//                     </p>
//                     <p>
//                         <PlusSquare/>
//                         Ajouter compétences
//                     </p>
//                     <p>
//                         <BadgeCheck/>
//                         Evaluations
//                     </p>
//                     <p>
//                         <PlusSquare/>
//                         Ajouter évaluations
//                     </p>
//                 </div>
//
//                 <div>
//                     {children}
//                 </div>
//
//             </Layout>
//         </>
//     )
// }

export function LayoutRH() {
    return (
        <>
            <div style={{width: "300px", backgroundColor: "#F1F5F9", height: "100vh"}} className="menu-sandwich">
                <Link to="/rh/salarie">
                    <LayoutDashboard/>
                    Employés
                </Link>
                <Link to="/rh/skills">
                    <BadgeCheck/>
                    Compétences
                </Link>
                <Link to="/rh/add-skills">
                    <PlusSquare/>
                    Ajouter compétences
                </Link>
                <Link to="/rh/evaluations">
                    <BadgeCheck/>
                    Evaluations
                </Link>
                <Link to="/rh/add-eval">
                    <PlusSquare/>
                    Ajouter évaluations
                </Link>
            </div>
        </>
)
}