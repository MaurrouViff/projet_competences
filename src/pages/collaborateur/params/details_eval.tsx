// import {Modal} from "../../../components/Modal.tsx";
import "../../../assets/css/modal.css";
import { X } from "lucide-react";
import { useState, useEffect } from "react";

// import supabase
import supabase from "../../../lib/supabaseClient.ts";
import { Evaluations } from "../../rh/params/Evaluations.tsx";

export function Details_Eval({
                                 setShowModal,
                                 evalID,
                             }: // parameters
                                 {
                                     setShowModal: (show: boolean) => void;
                                     evalID: string;
                                     // define type for parameters
                                 }) {
    interface Evaluation {
        idevaluation: number;
        remarque: string;
        nom: string;
        idsalarie: number;
    }

    interface Salarie {
        idsalarie: number;
        nom: string;
        prenom: string;
        uuid: string;
        role: string;
    }

    const [selectedEval, setSelectedEval] = useState<Evaluation | null>(null);
    const [selectedSalarie, setSelectedSalarie] = useState<Salarie | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getSalarie(id_salarie: number) {
            let { data: salarie, error } = await supabase
                .from("salarie")
                .select("*")
                .eq("idsalarie", id_salarie);

            if (error) {
                console.log(error);
            } else if (salarie && salarie.length > 0) {
                setSelectedSalarie(salarie[0]);
                setLoading(false);
            } else {
                setSelectedSalarie(null);
            }
        }

        async function readEvaluation() {
            let { data: evaluation, error } = await supabase
                .from("evaluation")
                .select("*")
                .eq("idevaluation", evalID);

            if (error) {
                console.log(error);
            } else if (evaluation && evaluation.length > 0) {
                setSelectedEval(evaluation[0]);
                getSalarie(evaluation[0].idsalarie);
            } else {
                setSelectedEval(null);
            }
        }

        readEvaluation();
    }, [evalID]);

    if (loading) {
        return (
            <>
                <div className="modal">
                    <div className="container">
                        <a onClick={() => setShowModal(false)}>
                            <X style={{ cursor: "pointer" }} />
                        </a>

                        <h2>Chargement</h2>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            {/*<Modal/>*/}
            <div className="modal">
                <div className="container">
                    <a onClick={() => setShowModal(false)}>
                        <X style={{ cursor: "pointer" }} />
                    </a>

                    <h2>{selectedEval?.nom}</h2>
                    <h3>{selectedEval?.remarque}</h3>
                    <h4>Salarié concerné : {selectedSalarie?.prenom + ' ' + selectedSalarie?.nom}</h4>
                </div>
            </div>
            {/*style={{width: "80vw", height: "80vh", backgroundColor: "#333", position: "absolute", bottom: 0, right: 0}}*/}
        </>
    );
}