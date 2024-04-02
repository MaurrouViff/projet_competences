import React, { useContext, useEffect, useState } from "react";
import supabase from "../../../lib/supabaseClient.ts";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Layout } from "../layout.tsx";
import { LayoutCollaborateur } from "./layout.tsx";
import { Details_Eval } from "./details_eval.tsx";
import { Form } from "react-bootstrap";
import { UserContext } from "../../../App.tsx"; // Assurez-vous d'avoir correctement défini UserContext

interface Skills {
    id_competence: number;
    titre: string;
    nom_domaine: string;
    nom_competence: string;
    nom_bloc: string;
}

export function SkillsCollaborateur() {
    const [skills, setSkills] = useState<Skills[] | null>(null);
    const [selectedSkillId, setSelectedSkillId] = useState<number | null>(null);
    const [showDetails, setShowDetails] = useState(false);
    const [selectedEval, setSelectedEval] = useState<number | null>(null);
    const [loadingSkills, setLoadingSkills] = useState<boolean>(false);
    const user = useContext(UserContext); // Obtenez les données de l'utilisateur connecté via le contexte

    useEffect(() => {
        async function readSkills() {
            try {
                setLoadingSkills(true);
                const { data: competence, error } = await supabase
                    .from("comp")
                    .select("*")
                    .eq('idsalarie', user.idsalarie); // Filtrez les compétences par idsalarie

                if (error) {
                    console.error(
                        "Erreur lors du chargement des compétences depuis Supabase:",
                        error
                    );
                    return;
                }

                setSkills(competence);
            } catch (error) {
                console.error(
                    "Erreur lors du chargement des compétences depuis Supabase:",
                    error
                );
            } finally {
                setLoadingSkills(false);
            }
        }

        if (user.idsalarie) { // Assurez-vous que idsalarie est disponible dans les données de l'utilisateur
            readSkills();
        }
    }, [user.idsalarie]); // Exécutez l'effet à chaque changement de idsalarie

    async function exportSkillsToPDF() {
        const doc = new jsPDF();
        doc.setFont("Helvetica", "normal");

        const tableColumn = ["Bloc", "Domaine", "Compétence", "ID"];
        const tableRows: (string | number)[][] = [];

        let filteredSkills = skills;

        if (selectedSkillId) {
            filteredSkills = skills?.filter(
                (skill) => skill.id_competence === selectedSkillId
            ) || [];
        }

        filteredSkills.forEach((skill) => {
            const skillData = [
                skill.nom_bloc.normalize(),
                skill.nom_domaine.normalize(),
                skill.nom_competence.normalize(),
                skill.id_competence,
            ];
            tableRows.push(skillData);
        });

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 30,
            didDrawPage: (data) => {
                const title = "Projet Compétences";
                const date = new Date().toLocaleDateString();
                doc.text(title, data.settings.margin.left, 10);
                doc.text(date, data.settings.margin.left, 20);
            },
        });

        const fileName = `compétences-${Date.now()}.pdf`;
        doc.save(fileName);
    }

    function renderSkills() {
        let filteredSkills = skills;

        if (selectedSkillId) {
            filteredSkills = skills?.filter(
                (skill) => skill.id_competence === selectedSkillId
            ) || [];
        }

        if (filteredSkills && filteredSkills.length > 0) {
            return filteredSkills.map((skill, index) => (
                <div
                    onClick={() => {
                        setShowDetails(true);
                        setSelectedEval(skill.id_competence);
                    }}
                    key={index}
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "8px",
                        borderBottom: "1px solid #000",
                        padding: "8px 30px",
                        margin: "0",
                        cursor: "pointer",
                    }}
                >
                    <div className="div">
                        <p style={{ fontWeight: "600" }}>{skill.nom_domaine}</p>
                        <p style={{ fontWeight: "400" }}>{skill.nom_bloc}</p>
                        <p style={{ fontWeight: "700", fontSize: "20px" }}>
                            {skill.nom_competence}
                        </p>
                    </div>
                </div>
            ));
        } else {
            return (
                <p className="loading text-center display-5 justify-content-center">
                    Aucune compétence correspondante.
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
                        <h2>Tirage par compétences</h2>
                        <SelectCollaboSkills
                            skills={skills}
                            onSelectSkill={(skillId) => setSelectedSkillId(Number(skillId))}
                            onLoadSkills={() => setLoadingSkills(true)}
                        />
                        <button
                            className="btn btn-outline-dark"
                            type="button"
                            onClick={exportSkillsToPDF}
                        >
                            Export PDF
                        </button>
                    </div>
                    <h2>Résultat de la recherche</h2>
                    <div>
                        <div>{renderSkills()}</div>
                    </div>
                    {showDetails && (
                        <Details_Eval setShowModal={setShowDetails} selectedEval={selectedEval} />
                    )}
                </div>
            </Layout>
        </div>
    );
}

function SelectCollaboSkills({
                                 skills,
                                 onSelectSkill,
                                 onLoadSkills,
                             }: {
    skills: Skills[] | null;
    onSelectSkill: (skillId: string | null) => void;
    onLoadSkills: () => void;
}) {
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onSelectSkill(e.target.value);
        onLoadSkills();
    };

    return (
        <>
            <br />
            <Form.Select className="select-collabo" onChange={handleSelectChange}>
                <option value="">Toutes les compétences</option>
                {skills &&
                    skills.map((skill, index) => (
                        <option key={index} value={String(skill.id_competence)}>
                            {skill.nom_competence}
                        </option>
                    ))}
            </Form.Select>
        </>
    );
}
