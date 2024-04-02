import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { X } from "lucide-react";
import supabase from "../../../lib/supabaseClient.ts";

interface comp {
  id_competence: number;
  nom_competence: string;
  nom_bloc: string;
  nom_domaine: string;
}

interface Salarie {
  idsalarie: number;
  nom: string;
  prenom: string;
}

interface AjoutCompetencesProps {
  setShowModal: (show: boolean) => void;
}

export function AjoutCompetences({ setShowModal }: AjoutCompetencesProps) {
  const [competences, setCompetences] = useState<comp[]>([]);
  const [salaries, setSalaries] = useState<Salarie[]>([]);
  const [selectedBloc, setSelectedBloc] = useState<string | null>(null);

  useEffect(() => {
    // Charger les compétences depuis Supabase
    async function chargerCompetences() {
      try {
        const { data, error } = await supabase
            .from("comp")
            .select("id_competence, nom_competence, nom_bloc");

        if (error) {
          console.error(
              "Erreur lors du chargement des compétences depuis Supabase:",
              error
          );
          return;
        }

        // Mettre à jour l'état local avec les compétences
        setCompetences(data as comp[]);
      } catch (error) {
        console.error(
            "Erreur lors du chargement des compétences depuis Supabase:",
            error
        );
      }
    }

    // Charger les employés depuis Supabase
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

        // Mettre à jour l'état local avec les employés
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

  const blocs = [...new Set(competences.map((comp) => comp.nom_bloc))];

  const handleChangeBloc = (
      event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedBloc = event.target.value;
    setSelectedBloc(selectedBloc === "Sélectionner un bloc" ? null : selectedBloc);
  };

  const competencesFiltrees = selectedBloc
      ? competences.filter((comp) => comp.nom_bloc === selectedBloc)
      : [];

  return (
      <>
        <div className="modal">
          <div className="container">
            <a onClick={() => setShowModal(false)}>
              <X style={{ cursor: "pointer" }} />
            </a>

            <h2>Ajouter une compétence</h2>
            <p>Nom du bloc :</p>
            <SelectBloc blocs={blocs} onChange={handleChangeBloc} />
            <p>Nom de l'évaluation :</p>
            <SelectCompetenceRH competences={competencesFiltrees} />
            <p>Nom de l'employé :</p>
            <SelectEmployeRH salaries={salaries} />

            <button
                style={{
                  backgroundColor: "#FFF",
                  border: "1px solid blue",
                  borderRadius: "4px",
                  padding: "8px 16px",
                  color: "BLUE",
                }}
                onClick={() => setShowModal(true)}
            >
              Ajouter
            </button>
          </div>
        </div>
      </>
  );
}

interface SelectBlocProps {
  blocs: string[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

function SelectBloc({ blocs, onChange }: SelectBlocProps) {
  return (
      <Form.Select className="select-rh" onChange={onChange}>
        <option>Sélectionner un bloc</option>
        {blocs.map((bloc, index) => (
            <option key={index}>{bloc}</option>
        ))}
      </Form.Select>
  );
}

interface SelectCompetenceRHProps {
  competences: comp[];
}

function SelectCompetenceRH({ competences }: SelectCompetenceRHProps) {
  return (
      <Form.Select className="select-rh">
        <option>Sélectionner une compétence</option>
        {competences.map((comp) => (
            <option key={comp.id_competence}>{comp.nom_competence}</option>
        ))}
      </Form.Select>
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
