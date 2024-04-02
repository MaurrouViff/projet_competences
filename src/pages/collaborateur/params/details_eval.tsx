import "../../../assets/css/modal.css";
import { X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import supabase from "../../../lib/supabaseClient.ts";
import { BeatLoader } from "react-spinners";
import jsPDF from "jspdf";

export function Details_Eval({
                                 setShowModal,
                                 evalID,
                             }: {
    setShowModal: (show: boolean) => void;
    evalID: string;
}) {
    interface Evaluation {
        idevaluation: number;
        remarque: string;
        nom: string;
        idsalarie: number;
        note: number; // Ajout de la propriété note
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
    const [noteValue, setNoteValue] = useState<number>(0);
    const [noteLabel, setNoteLabel] = useState<string>("");

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

                // Determine the note label
                const note = evaluation[0].note;
                setNoteValue(note);
                if (note >= 0 && note <= 33) {
                    setNoteLabel("Remaque : mauvais");
                } else if (note > 33 && note <= 66) {
                    setNoteLabel("Remarque : moyen");
                } else {
                    setNoteLabel("Remarque : très bon");
                }
            } else {
                setSelectedEval(null);
            }
        }

        readEvaluation();
    }, [evalID]);

    const componentRef = useRef<HTMLDivElement>(null);

    const handleExportPDF = () => {
        if (componentRef.current) {
            const pdf = new jsPDF();
            pdf.addHTML(componentRef.current, () => {
                pdf.save("evaluation_details.pdf");
            });
        }
    };

    if (loading) {
        return (
            <>
                <div className="modal">
                    <div className="container">
                        <a onClick={() => setShowModal(false)}>
                            <X style={{ cursor: "pointer" }} />
                        </a>
                        <BeatLoader color="#000000" />
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <div className="modal">
                <div className="container" ref={componentRef}>
                    <a onClick={() => setShowModal(false)}>
                        <X style={{ cursor: "pointer" }} />
                    </a>

                    <h2>{selectedEval?.nom}</h2>
                    <h3>{selectedEval?.remarque}</h3>
                    <h4>
                        Salarié concerné : {selectedSalarie?.prenom + " " + selectedSalarie?.nom}
                    </h4>
                    <h4>Note : {noteValue} - {noteLabel}</h4>
                </div>
            </div>
            <button onClick={handleExportPDF}>Exporter en PDF</button>
        </>
    );
}
