import { Layout } from "../layout.tsx";
import "../../../assets/css/menu.css";
import "../../../assets/css/salarie.css";
import "../../../assets/css/collabo.css";
import { LayoutCollaborateur } from "./layout.tsx";
import { Details_Eval } from "./details_eval.tsx";

import { useState, useEffect } from "react";
import supabase from "../../../lib/supabaseClient.ts";

interface Evaluation {
  idevaluation: number;
  remarque: string;
  nom: string;
  idsalarie: number;
}

export function EvaluationsCollaborateur() {
  const [showModal, setShowModal] = useState(false);
  const [selectedEvalID, setSelectedEval] = useState<number | null>(null);

  const [evaluations, setEvaluations] = useState<Evaluation[] | null>(null);

  useEffect(() => {
    async function readEvaluation() {
      let { data: evaluation, error } = await supabase
        .from("evaluation")
        .select("*");

      if (error) {
        console.log(error);
      }
      return setEvaluations(evaluation);
    }
    readEvaluation();
  }, []);

  function renderEvaluation() {
    if (evaluations && evaluations.length > 0) {
      return evaluations?.map((evaluation) => (
        <div
        onClick={() => {
          setShowModal(true);
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
            <SelectCollaboEval />
          </div>
          <div>
           {renderEvaluation()}
          </div>
          {showModal && <Details_Eval setShowModal={setShowModal} evalID={selectedEvalID} />}
        </div>
      </Layout>
    </div>
  );
}

import Form from "react-bootstrap/Form";
import { render } from "react-dom";

function SelectCollaboEval() {
  return (
    <>
      <br />
      <Form.Select className="select-collabo">
        <option>Sélectionner votre évaluation</option>
      </Form.Select>
    </>
  );
}

export default SelectCollaboEval;
