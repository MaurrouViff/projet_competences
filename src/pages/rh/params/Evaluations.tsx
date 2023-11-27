import { Layout } from "../layout.tsx";
import "../../../assets/css/menu.css";
import "../../../assets/css/salarie.css";
import { LayoutRH } from "./layout.tsx";
import { useEffect, useState } from "react";
import { Supprimer } from "./supprimer.tsx";
import supabase from "../../../lib/supabaseClient.ts";

interface Evaluation {
  idevaluation: number;
  remarque: string;
  nom: string;
  idsalarie: number;
}

export function Evaluations() {
  const [showModal, setShowModal] = useState(false);

<<<<<<< HEAD
    const [evaluations, setEvaluations] = useState<Evaluation[] | null>(null);
=======
  const [evaluations, setEvaluations] = useState<Evaluation[] | null>(null);
>>>>>>> 60597e6a4dd5682741add0652b9e48c347b4cde7

  useEffect(() => {
    async function readEvaluation() {
      let { data: evaluation, error } = await supabase
        .from("evaluation")
        .select("*");

<<<<<<< HEAD
            if (error) {
                console.log(error);
            }
            return setEvaluations(evaluation);
        }
        readEvaluation();
    }, []);

    return (
        <div className="skills salarie">
            <Layout>
                <LayoutRH/>

                <div style={{backgroundColor: "#FFF", width: "100%", overflowY: "auto", height: "100vh"}}>
                    <div style={{
                        height: "100px",
                        width: "100%",
                        backgroundColor: "#FFF",
                        display: "flex",
                        alignItems: "center",
                        paddingLeft: "30px",
                        fontWeight: "bold",
                        borderBottom: "1px solid #000"
                    }}>
                        <h2>Evaluations</h2>
                    </div>

                    <div>
                        {evaluations && evaluations.map(evaluation => (
                            <div
                                key={evaluation.idevaluation}
                                style={{display: "flex", flexDirection: "row", gap: "8px", borderBottom: "1px solid #000", padding: "8px 30px", margin: "0"}}>
                                <p style={{fontWeight: "700", fontSize: "20px", flex: "1"}}>{evaluation.nom}</p>
                                <button
                                    style={{backgroundColor: "#FFF", border: "1px solid #FF0000", borderRadius: "4px", padding: "8px 16px", color: "#FF0000"}}
                                    onClick={() => setShowModal(true)}>Supprimer
                                </button>

                            </div>
                        ))}
                    </div>

                    {showModal && <Supprimer setShowModal={setShowModal}/>}

                </div>
            </Layout>
=======
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
          <button
            style={{
              backgroundColor: "#FFF",
              border: "1px solid #FF0000",
              borderRadius: "4px",
              padding: "8px 16px",
              color: "#FF0000",
            }}
            onClick={() => setShowModal(true)}
          >
            Supprimer
          </button>
>>>>>>> 60597e6a4dd5682741add0652b9e48c347b4cde7
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
              paddingLeft: "30px",
              fontWeight: "bold",
              borderBottom: "1px solid #000",
            }}
          >
            <h2>Evaluations</h2>
          </div>

          <div>{renderEvaluation()}</div>

          {showModal && <Supprimer setShowModal={setShowModal} />}
        </div>
      </Layout>
    </div>
  );
}
