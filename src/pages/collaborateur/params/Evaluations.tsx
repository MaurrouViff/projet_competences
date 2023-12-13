// EvaluationsCollaborateur.tsx
import { Layout } from "../layout.tsx";
import "../../../assets/css/menu.css";
import "../../../assets/css/salarie.css";
import "../../../assets/css/collabo.css";
import { LayoutCollaborateur } from "./layout.tsx";

import { useState, useEffect, useContext } from "react";

import supabase from "../../../lib/supabaseClient.ts";

import { BeatLoader } from "react-spinners";

import { Details_Eval } from "./details_eval.tsx";

import { UserContext } from "../../../App.tsx";

interface Evaluation {
  idevaluation: number;
  remarque: string;
  nom: string;
  idsalarie: number;
}

export function EvaluationsCollaborateur() {
  const [showDetails, setShowDetails] = useState(false);

  const [evaluations, setEvaluations] = useState<Evaluation[] | null>(null);

  const [selectedEval, setSelectedEval] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  const user = useContext(UserContext);

  useEffect(() => {
    async function readEvaluation() {
      setLoading(true);
      try {
        const { data: evaluation, error } = await supabase
          .from("evaluation")
          .select("*");

        if (error) {
          console.error(error);
          return;
        }

        const filteredEvaluations = evaluation?.filter(
          (evals) => evals.idsalarie === user.idsalarie
        );

        if (filteredEvaluations) {
          setEvaluations(filteredEvaluations);
        }
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    }
    readEvaluation();
  }, []);

  function renderEvaluation() {
    if (loading) {
      return (
        <div className="loading text-center pt-5">
          <BeatLoader color="#000" />
        </div>
      );
    }

    if (evaluations && evaluations.length > 0 && user) {
      return evaluations?.map((evaluation) => (
        <div
          key={evaluation.idevaluation}
          onClick={() => {
            setShowDetails(true);
            setSelectedEval(evaluation.idevaluation);
          }}
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "8px",
            borderBottom: "1px solid #000",
            padding: "8px 30px",
            margin: "0",
            cursor: "pointer", // Ajouté pour indiquer que cet élément est cliquable
          }}
        >
          <p style={{ fontWeight: "700", fontSize: "20px", flex: "1" }}>
            {evaluation.nom}
          </p>
        </div>
      ));
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
          {showDetails && (
            <Details_Eval setShowModal={setShowDetails} evalID={selectedEval} />
          )}
        </div>
      </Layout>
    </div>
  );
}
