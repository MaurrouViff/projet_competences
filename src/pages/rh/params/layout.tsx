import {BadgeCheck, LayoutDashboard, PlusSquare} from "lucide-react";
import {Link} from "react-router-dom";
import {useState} from "react";
import {AjoutCompetences} from "./AjoutCompétences.tsx";
import {AjoutEvaluations} from "./AjoutEvaluations.tsx";
import {CreerEvaluation} from "./CreerEvaluations.tsx";

export function LayoutRH() {
    const [showModal, setShowModal] = useState(false);
    const [showModalEval, setShowModalEval] = useState(false);
    const [showModalCreer, setShowModalCreer] = useState(false);
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
                <p onClick={()=> setShowModalCreer(true)}>
                <PlusSquare/>
                    Créer évaluations
                </p>
            </div>

            {showModal && <AjoutCompetences setShowModal={setShowModal}/>}
            {showModalEval && <AjoutEvaluations setShowModalEval={setShowModalEval}/>}
            {showModalCreer && <CreerEvaluation setShowModalCreer={setShowModalCreer}/>}
        </>
)
}