// details_eval.tsx
import { X } from "lucide-react";
import { useState, useEffect } from "react";
import supabase from "../../../lib/supabaseClient.ts";

interface Competence {
    idcompetence: number;
    titre: string;
    nom_domaine: string;
    nom_competence: string;
    nom_bloc: string;
}

export function Details_Eval({
                                 setShowModal,
                                 selectedEvalId,
                             }: {
    setShowModal: (show: boolean) => void;
    selectedEvalId: number | null;
}) {
    const [selectedEval, setSelectedEval] = useState<Competence | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCompetence() {
            if (selectedEvalId) {
                try {
                    const { data: competence, error } = await supabase
                        .from("comp")
                        .select("*")
                        .eq("idcompetence", selectedEvalId);

                    if (error) {
                        console.error("Erreur lors de la récupération de la compétence:", error);
                    } else if (competence && competence.length > 0) {
                        setSelectedEval(competence[0]);
                    } else {
                        setSelectedEval(null);
                    }
                } catch (error) {
                    console.error("Erreur lors de la récupération de la compétence:", error);
                } finally {
                    setLoading(false);
                }
            }
        }

        fetchCompetence();
    }, [selectedEvalId]);

    if (loading) {
        return (
            <>
                <div className="modal">
                    <div className="container">
                        <a onClick={() => setShowModal(false)}>
                            <X style={{ cursor: "pointer" }} />
                        </a>
                        <h2>Chargement...</h2>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <div className="modal">
                <div className="container">
                    <a onClick={() => setShowModal(false)}>
                        <X style={{ cursor: "pointer" }} />
                    </a>
                    {selectedEval && (
                        <>
                            <h2>{selectedEval.nom_competence}</h2>
                            <p>Titre: {selectedEval.titre}</p>
                            <p>Domaine: {selectedEval.nom_domaine}</p>
                            <p>Bloc: {selectedEval.nom_bloc}</p>
                            <p>ID: {selectedEval.idcompetence}</p>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default Details_Eval;
