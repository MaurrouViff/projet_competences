import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { X } from "lucide-react";
import supabase from "../../../lib/supabaseClient.ts";
import { useNavigate } from "react-router-dom";

interface Salarie {
  idsalarie: number;
  nom: string;
  prenom: string;
}

interface Evaluations {
  idevaluation: number;
  nom: string;
  remarque: string;
  idsalarie: number; // Clé étrangère vers la table "salarie"
}

interface AjoutEvaluationProps {
  setShowModalEval: (show: boolean) => void;
}

export function AjoutEvaluations({ setShowModalEval }: AjoutEvaluationProps) {
  const [evaluations, setEvaluations] = useState<Evaluations[]>([]);
  const [salaries, setSalaries] = useState<Salarie[]>([]);
  const [selectedEvaluation, setSelectedEvaluation] = useState<number | null>(null);
  const [selectedSalarie, setSelectedSalarie] = useState<number | null>(null);
  const [operationSuccess, setOperationSuccess] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleEvaluationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedEvaluation(parseInt(e.target.value));
  };

  const handleSalarieChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSalarie(parseInt(e.target.value));
  };

  const handleValiderClick = async () => {
    if (selectedEvaluation && selectedSalarie) {
      try {
        const { data: affectationData, error: affectationError } = await supabase
            .from("evaluation")
            .upsert(
                [
                  {
                    idevaluation: selectedEvaluation,
                    idsalarie: selectedSalarie,
                  },
                ],
                { onConflict: ["idevaluation"] }
            );

        if (affectationError) {
          console.error("Erreur lors de l'affectation de l'évaluation:", affectationError);
          return;
        }

        setOperationSuccess(true);
        setTimeout(() => {
          setOperationSuccess(false);
          setShowModalEval(false);
          navigate("/rh/evaluations"); // Naviguer vers la page des évaluations
        }, 2000); // Afficher "Opération réussie" pendant 2 secondes
      } catch (error) {
        console.error("Erreur lors de l'affectation de l'évaluation:", error);
      }
    }
  };

  useEffect(() => {
    async function chargerEvaluations() {
      try {
        const { data, error } = await supabase
            .from("evaluation")
            .select("idevaluation, nom, remarque, idsalarie");

        if (error) {
          console.error(
              "Erreur lors du chargement des évaluations depuis Supabase:",
              error
          );
          return;
        }

        setEvaluations(data as Evaluations[]);
      } catch (error) {
        console.error(
            "Erreur lors du chargement des évaluations depuis Supabase:",
            error
        );
      }
    }

    async function chargerSalaries() {
      try {
        const { data, error } = await supabase
            .from("salarie")
            .select("idsalarie, nom, prenom");

        if (error) {
          console.error(
              "Erreur lors du chargement des employés depuis Supabase:",
              error
          );
          return;
        }

        setSalaries(data as Salarie[]);
      } catch (error) {
        console.error(
            "Erreur lors du chargement des employés depuis Supabase:",
            error
        );
      }
    }

    // Appeler les fonctions pour charger les évaluations et les employés lors du montage du composant
    chargerEvaluations();
    chargerSalaries();
  }, []); // Le tableau vide assure que l'effet ne se déclenche qu'une seule fois au montage

  return (
      <>
        <div className="modal">
          <div className="container">
            <a onClick={() => setShowModalEval(false)}>
              <X style={{ cursor: "pointer" }} />
            </a>

            <h2>Ajouter une évaluation</h2>
            <p>Nom de l'évaluation :</p>
            <SelectEvaluationsRH evaluations={evaluations} onChange={handleEvaluationChange} />
            <p>Nom de l'employé :</p>
            <SelectEmployeRH salaries={salaries} onChange={handleSalarieChange} />
            <div>
              <button
                  style={{
                    backgroundColor: "#FFF",
                    border: "1px solid #002aff",
                    borderRadius: "4px",
                    padding: "8px 16px",
                    color: "#002aff",
                  }}
                  onClick={() => setShowModalEval(false)}
              >
                Annuler
              </button>
              <button
                  style={{
                    backgroundColor: "#FFF",
                    border: "1px solid #1cff00",
                    borderRadius: "4px",
                    padding: "8px 16px",
                    color: "#1cff00",
                  }}
                  onClick={handleValiderClick}
              >
                Valider
              </button>
            </div>
            {operationSuccess && <p>Opération réussie</p>}
          </div>
        </div>
      </>
  );
}

interface SelectEmployeRHProps {
  salaries: Salarie[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

function SelectEmployeRH({ salaries, onChange }: SelectEmployeRHProps) {
  return (
      <Form.Select className="select-rh" onChange={onChange}>
        <option>Sélectionner l'employé</option>
        {salaries.map((salarie) => (
            <option key={salarie.idsalarie} value={salarie.idsalarie}>
              {`${salarie.prenom} ${salarie.nom}`}
            </option>
        ))}
      </Form.Select>
  );
}

interface SelectEvaluationsRHProps {
  evaluations: Evaluations[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

function SelectEvaluationsRH({ evaluations, onChange }: SelectEvaluationsRHProps) {
  return (
      <Form.Select className="select-rh" onChange={onChange}>
        <option>Sélectionner l'évaluation</option>
        {evaluations.map((evaluation) => (
            <option key={evaluation.idevaluation} value={evaluation.idevaluation}>
              {`${evaluation.nom}`}
            </option>
        ))}
      </Form.Select>
  );
}
