import { Layout } from "../layout.tsx";
import "../../../assets/css/menu.css";
import "../../../assets/css/salarie.css";
import { LayoutRH } from "./layout.tsx";
import { useEffect, useState } from "react";
import { Supprimer } from "./supprimer.tsx";
import supabase from "../../../lib/supabaseClient.ts";
import { Details_Eval } from "./details_eval.tsx";

import { BeatLoader } from "react-spinners";

interface Evaluation {
    idevaluation: number;
    remarque: string;
    nom: string;
    idsalarie: number;
}

export function Evaluations() {
    const [showModal, setShowModal] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [evaluationCount, setEvaluationCount] = useState<number>(0);

    const [evaluations, setEvaluations] = useState<Evaluation[] | null>(null);

    const [selectedEval, setSelectedEval] = useState<number | null>(null);

    useEffect(() => {
        async function readEvaluation() {
            try {
                const { data: evaluation, error } = await supabase
                    .from("evaluation")
                    .select("*");

                if (error) {
                    console.error("Erreur lors de la récupération des évaluations:", error);
                    return;
                }

                setEvaluationCount(evaluation.length);
                setEvaluations(evaluation);
            } catch (error) {
                console.error("Erreur lors de la récupération des évaluations:", error);
            }
        }
        readEvaluation();
    }, []);

    function renderEvaluation() {
        if (evaluations && evaluations.length > 0) {
            return evaluations?.map((evaluation) => (
                <div
                    onClick={() => {
                        setShowDetails(true);
                        setSelectedEval(evaluation.idevaluation);
                    }}
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
                    <BeatLoader color="#000000" />
                </p>
            );
        }
    }

    return (
        <div className="skills salarie">
            <Layout>
                <LayoutRH />

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
                            justifyContent: "space-between",
                            paddingLeft: "30px",
                            fontWeight: "bold",
                            borderBottom: "1px solid #000",
                        }}
                    >
                        <div>
                            <h2>Evaluations</h2>
                            <p>{evaluationCount} évaluations</p>
                        </div>
                    </div>

                    <div>{renderEvaluation()}</div>

                    {showModal && <Supprimer setShowModal={setShowModal} />}
                    {showDetails && (
                        <Details_Eval setShowModal={setShowDetails} evalID={selectedEval} />
                    )}
                </div>
            </Layout>
        </div>
    );
}
