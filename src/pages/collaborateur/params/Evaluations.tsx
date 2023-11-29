import { Layout } from "../layout.tsx";
import "../../../assets/css/menu.css";
import "../../../assets/css/salarie.css";
import "../../../assets/css/collabo.css";
import { LayoutCollaborateur } from "./layout.tsx";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import supabase from "../../../lib/supabaseClient.ts";

interface Evaluation {
    idevaluation: number;
    remarque: string;
    nom: string;
    idsalarie: number;
}

export function EvaluationsCollaborateur() {
    const [showModal, setShowModal] = useState(false);
    const [evaluations, setEvaluations] = useState<Evaluation[] | null>(null);

    useEffect(() => {
        async function readEvaluation() {
            try {
                const { data: evaluation, error } = await supabase
                    .from("evaluation")
                    .select("*");

                if (error) {
                    console.error(error);
                    return;
                }
                setEvaluations(evaluation);
            } catch (error) {
                console.error(error);
            }
        }
        readEvaluation();
    }, []);

    function renderEvaluation() {
        if (evaluations && evaluations.length > 0) {
            return evaluations?.map((evaluation) => (
                <div
                    key={evaluation.idevaluation}
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "8px",
                        borderBottom: "1px solid #000",
                        padding: "8px 30px",
                        margin: "0",
                    }}
                >
                    <p style={{ fontWeight: "700", fontSize: "20px", flex: "1" }}>
                        {evaluation.nom}
                    </p>

                </div>
            ));
        } else {
            return (
                <p className="loading text-center display-5 justify-content-center">
                    Chargement...
                </p>
            );
        }
    }

    return (
        <div className="skills salarie">
            <Layout>
                <LayoutCollaborateur />

                <div
                    style={{
                        backgroundColor: "#FFF",
                        width: "100%",
                        overflowY: "auto",
                        height: "100vh",
                    }}
                >
                    <div
                        style={{
                            height: "100px",
                            width: "100%",
                            backgroundColor: "#FFF",
                            display: "flex",
                            alignItems: "center",
                            paddingLeft: "30px",
                            fontWeight: "bold",
                            borderBottom: "1px solid #000",
                        }}
                    >
                        <h2>Evaluations</h2>
                    </div>

                    <div>{renderEvaluation()}</div>

                    {showModal && (
                        <div className="modal">
                            <div className="container">
                                <a onClick={() => setShowModal(false)}>
                                    <X style={{ cursor: "pointer" }} />
                                </a>

                                <h2>Contenu de la modal</h2>

                                <button
                                    style={{
                                        backgroundColor: "#FFF",
                                        border: "1px solid #1cff00",
                                        borderRadius: "4px",
                                        padding: "8px 16px",
                                        color: "#1cff00",
                                    }}
                                    onClick={() => setShowModal(false)}
                                >
                                    Valider
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </Layout>
        </div>
    );
}