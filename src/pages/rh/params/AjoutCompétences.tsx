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

interface Comp {
  id_competence: number;
  nom_competence: string;
}

interface AjoutCompetencesProps {
  setShowModal: (show: boolean) => void;
}

export function AjoutCompetences({ setShowModal }: AjoutCompetencesProps) {
  const [competences, setCompetences] = useState<Comp[]>([]);
  const [salaries, setSalaries] = useState<Salarie[]>([]);
  const [selectedCompetence, setSelectedCompetence] = useState<number | null>(null);
  const [selectedSalarie, setSelectedSalarie] = useState<number | null>(null);
  const [operationSuccess, setOperationSuccess] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleCompetenceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCompetence(parseInt(e.target.value));
  };

  const handleSalarieChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSalarie(parseInt(e.target.value));
  };

  const handleValiderClick = async () => {
    if (selectedCompetence && selectedSalarie) {
      try {
        const { data: associationData, error: associationError } = await supabase
            .from("comp")
            .upsert(
                [
                  {
                    id_competence: selectedCompetence,
                    idsalarie: selectedSalarie,
                  },
                ],
                { onConflict: ["id_competence"] }
            );

        if (associationError) {
          console.error("Erreur lors de l'association de la compétence:", associationError);
          return;
        }

        setOperationSuccess(true);
        setTimeout(() => {
          setOperationSuccess(false);
          setShowModal(false);
          navigate("/rh/competences"); // Naviguer vers la page des compétences
        }, 2000); // Afficher "Opération réussie" pendant 2 secondes
      } catch (error) {
        console.error("Erreur lors de l'association de la compétence:", error);
      }
    }
  };

  useEffect(() => {
    async function chargerCompetences() {
      try {
        const { data, error } = await supabase
            .from("comp")
            .select("id_competence, nom_competence");

        if (error) {
          console.error(
              "Erreur lors du chargement des compétences depuis Supabase:",
              error
          );
          return;
        }

        setCompetences(data as Comp[]);
      } catch (error) {
        console.error(
            "Erreur lors du chargement des compétences depuis Supabase:",
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

    // Appeler les fonctions pour charger les compétences et les employés lors du montage du composant
    chargerCompetences();
    chargerSalaries();
  }, []); // Le tableau vide assure que l'effet ne se déclenche qu'une seule fois au montage

  return (
      <>
        <div className="modal">
          <div className="container">
            <a onClick={() => setShowModal(false)}>
              <X style={{ cursor: "pointer" }} />
            </a>

            <h2>Ajouter une compétence</h2>
            <p>Nom de la compétence :</p>
            <SelectCompetencesRH competences={competences} onChange={handleCompetenceChange} />
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
                  onClick={() => setShowModal(false)}
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

interface SelectCompetencesRHProps {
  competences: Comp[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

function SelectCompetencesRH({ competences, onChange }: SelectCompetencesRHProps) {
  return (
      <Form.Select className="select-rh" onChange={onChange}>
        <option>Sélectionner la compétence</option>
        {competences.map((comp) => (
            <option key={comp.id_competence} value={comp.id_competence}>
              {comp.nom_competence}
            </option>
        ))}
      </Form.Select>
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
