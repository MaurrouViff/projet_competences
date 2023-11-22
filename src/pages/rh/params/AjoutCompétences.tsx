import { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import { X } from "lucide-react";
import supabase from "../../../lib/supabaseClient.ts";

interface Competence {
    idcompetence: number;
    titre: string;
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
    const [competences, setCompetences] = useState<Competence[]>([]);
    const [salaries, setSalaries] = useState<Salarie[]>([]);

    useEffect(() => {
        // Charger les compétences depuis Supabase
        async function chargerCompetences() {
            try {
                const { data, error } = await supabase
                    .from('competence')
                    .select('idcompetence, titre');

                if (error) {
                    console.error('Erreur lors du chargement des compétences depuis Supabase:', error);
                    return;
                }

                // Mettre à jour l'état local avec les compétences
                setCompetences(data as Competence[]);
            } catch (error) {
                console.error('Erreur lors du chargement des compétences depuis Supabase:', error);
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
                    <p>Nom de l'évaluation :</p>
                    <SelectCompetenceRH competences={competences} />
                    <p>Nom de l'employé :</p>
                    <SelectEmployeRH salaries={salaries} />
                </div>
            </div>
        </>
    );
}

interface SelectCompetenceRHProps {
    competences: Competence[];
}

function SelectCompetenceRH({ competences }: SelectCompetenceRHProps) {
    return (
        <Form.Select className="select-rh">
            <option>Sélectionner votre évaluation</option>
            {competences.map((competence) => (
                <option key={competence.idcompetence}>{competence.titre}</option>
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
