// import {Modal} from "../../../components/Modal.tsx";
import "../../../assets/css/modal.css";
import { X } from "lucide-react";
import { useState, useEffect } from "react";

// import supabase
import supabase from "../../../lib/supabaseClient.ts";

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

  const [selectedEval, setSelectedEval] = useState<Evaluation | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function readEvaluation() {
      let { data: evaluation, error } = await supabase
        .from("evaluation")
        .select("*")
        .eq("idevaluation", evalID);

      if (error) {
        console.log(error);
      } else if (evaluation && evaluation.length > 0) {
        setSelectedEval(evaluation[0]);
        setLoading(false);
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
        </div>
      </div>
      {/*style={{width: "80vw", height: "80vh", backgroundColor: "#333", position: "absolute", bottom: 0, right: 0}}*/}
    </>
  );
}
