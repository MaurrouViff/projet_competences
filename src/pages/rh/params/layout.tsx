import {BadgeCheck, LayoutDashboard, PlusSquare} from "lucide-react";
import {Link} from "react-router-dom";
import {useState} from "react";
import {AjoutCompetences} from "./AjoutCompétences.tsx";
import {AjoutEvaluations} from "./AjoutEvaluations.tsx";
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
    const [showModal, setShowModal] = useState(false);
    const [showModalEval, setShowModalEval] = useState(false);
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
                <p onClick={() => setShowModal(true)}>
                    <PlusSquare/>
                    Ajouter compétences
                </p>
                <Link to="/rh/evaluations">
                    <BadgeCheck/>
                    Evaluations
                </Link>
                <p onClick={()=> setShowModalEval(true)}>
                    <PlusSquare/>
                    Ajouter évaluations
                </p>
            </div>

            {showModal && <AjoutCompetences setShowModal={setShowModal}/>}
            {showModalEval && <AjoutEvaluations setShowModalEval={setShowModalEval}/>}
        </>
)
}