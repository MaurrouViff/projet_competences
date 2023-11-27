import { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import { X } from "lucide-react";
import supabase from "../../../lib/supabaseClient.ts";

interface Salarie {
  idsalarie: number;
  nom: string;
  prenom: string;

}

interface Evaluations {
  idevaluation: number;
  nom: string;
  remarque: string;
  idsalarie: number;
}

interface AjoutEvaluationProps {
  setShowModalEval: (show: boolean) => void;
}

export function AjoutEvaluations({ setShowModalEval }: AjoutEvaluationProps) {
  const [evaluations, setEvaluations] = useState<Evaluations[]>([]);
  const [salaries, setSalaries] = useState<Salarie[]>([]);

  useEffect(() => {
    async function chargerEvaluations() {
      try {
        const { data, error } = await supabase
            .from('evaluation')
            .select('idevaluation, nom, remarque');

        if (error) {
          console.error('Erreur lors du chargement des évaluations depuis Supabase:', error);
          return;
        }

        // Mettre à jour l'état local avec les évaluations
        setEvaluations(data as Evaluations[]);
      } catch (error) {
        console.error('Erreur lors du chargement des évaluations depuis Supabase:', error);
      }
    }

    // Charger les employés depuis Supabase
    async function chargerSalaries() {
      try {
        const { data, error } = await supabase
            .from('salarie')
            .select('idsalarie, nom, prenom');

        if (error) {
          console.error('Erreur lors du chargement des employés depuis Supabase:', error);
          return;
        }

        // Mettre à jour l'état local avec les employés
        setSalaries(data as Salarie[]);
      } catch (error) {
        console.error('Erreur lors du chargement des employés depuis Supabase:', error);
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
            <SelectEvaluationsRH evaluations={evaluations} />
            <p>Nom de l'employé :</p>
            <SelectEmployeRH salaries={salaries} />
            <div>
              <button
                  style={{backgroundColor: "#FFF", border: "1px solid #002aff", borderRadius: "4px", padding: "8px 16px", color: "#002aff"}}
                  onClick={() => setShowModalEval(false)}>Annuler
              </button>
              <button
                  style={{backgroundColor: "#FFF", border: "1px solid #1cff00", borderRadius: "4px", padding: "8px 16px", color: "#1cff00"}}
                  onClick={() => setShowModalEval(false)}>Valider
              </button>
            </div>
          </div>

        </div>
      </>
  );
}

interface SelectEmployeRHProps {
  salaries: Salarie[];
}

function SelectEmployeRH({ salaries }: SelectEmployeRHProps) {
  return (
      <Form.Select className="select-rh">
        <option>Sélectionner l'employé</option>
        {salaries.map((salarie) => (
            <option key={salarie.idsalarie}>{`${salarie.prenom} ${salarie.nom}`}</option>
        ))}
      </Form.Select>
  );
}

interface SelectEvaluationsRHProps {
  evaluations: Evaluations[];
}

function SelectEvaluationsRH({ evaluations }: SelectEvaluationsRHProps) {
    return (
        <Form.Select className="select-rh">
          <option>Sélectionner l'évaluation</option>
          {evaluations.map((evaluation) => (
            <option key={evaluation.idevaluation}>{`${evaluation.nom}`}</option>
          ))}
        </Form.Select>
    );
}
