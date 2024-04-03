import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Form } from "react-bootstrap";
import supabase from "../../../lib/supabaseClient.ts";
import { useNavigate } from "react-router-dom";

interface Salarie {
    idsalarie: number;
    nom: string;
    prenom: string;
}

interface AjoutEvaluationProps {
    setShowModalCreer: (show: boolean) => void;
}

export function CreerEvaluation({ setShowModalCreer }: AjoutEvaluationProps) {
    const [salaries, setSalaries] = useState<Salarie[]>([]);
    const [selectedSalarie, setSelectedSalarie] = useState<number | null>(null);
    const [note, setNote] = useState<string>("");
    const [remarque, setRemarque] = useState<string>("");
    const [nomEvaluation, setNomEvaluation] = useState<string>("");
    const [operationSuccess, setOperationSuccess] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchSalaries() {
            try {
                const { data, error } = await supabase
                    .from("salarie")
                    .select("idsalarie, nom, prenom");

                if (error) {
                    console.error("Erreur lors de la récupération des salariés:", error);
                    return;
                }

                setSalaries(data as Salarie[]);
            } catch (error) {
                console.error("Erreur lors de la récupération des salariés:", error);
            }
        }

        fetchSalaries();
    }, []);

    const handleSalarieChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedSalarie(parseInt(e.target.value));
    };

    const handleNoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNote(e.target.value);
    };

    const handleRemarqueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRemarque(e.target.value);
    };

    const handleNomEvaluationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNomEvaluation(e.target.value);
    };

    const handleValiderClick = async () => {
        if (selectedSalarie && note && remarque && nomEvaluation) {
            try {
                const { error } = await supabase
                    .from("evaluation")
                    .insert([
                        {
                            nom: nomEvaluation,
                            remarque: remarque,
                            idsalarie: selectedSalarie,
                            note: note
                        }
                    ]);

                if (error) {
                    console.error("Erreur lors de la création de l'évaluation:", error);
                    return;
                }

                setOperationSuccess(true);
                setTimeout(() => {
                    setOperationSuccess(false);
                    setShowModalCreer(false);
                    navigate("/rh/evaluations"); // Naviguer vers la page des évaluations
                }, 2000); // Afficher "Opération réussie" pendant 2 secondes
            } catch (error) {
                console.error("Erreur lors de la création de l'évaluation:", error);
            }
        }
    };

    return (
        <>
            <div className="modal">
                <div className="container">
                    <a onClick={() => setShowModalCreer(false)}>
                        <X style={{ cursor: "pointer" }} />
                    </a>

                    <h2>Créer une évaluation</h2>
                    <div>
                        <p>Nom de l'évaluation :</p>
                        <input type="text" value={nomEvaluation} onChange={handleNomEvaluationChange} />
                    </div>
                    <div>
                        <p>Nom de l'employé :</p>
                        <SelectEmployeRH salaries={salaries} onChange={handleSalarieChange} />
                    </div>
                    <div>
                        <p>Note :</p>
                        <input type="text" value={note} onChange={handleNoteChange} />
                    </div>
                    <div>
                        <p>Remarque :</p>
                        <input type="text" value={remarque} onChange={handleRemarqueChange} />
                    </div>
                    <div>
                        <button
                            style={{
                                backgroundColor: "#FFF",
                                border: "1px solid #002aff",
                                borderRadius: "4px",
                                padding: "8px 16px",
                                color: "#002aff",
                            }}
                            onClick={() => setShowModalCreer(false)}
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
