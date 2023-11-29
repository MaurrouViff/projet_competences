// SkillsCollaborateur.tsx
import { Layout } from "../layout.tsx";
import "../../../assets/css/menu.css";
import "../../../assets/css/salarie.css";
import "../../../assets/css/collabo.css";
import { LayoutCollaborateur } from "./layout.tsx";
import { useEffect, useState } from "react";
import supabase from "../../../lib/supabaseClient.ts";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface Skills {
    idcompetence: number;
    titre: string;
    nom_domaine: string;
    nom_competence: string;
    nom_bloc: string;
}

export function SkillsCollaborateur() {


    const [showModal, setShowModal] = useState(false);
    const [skills, setSkills] = useState<Skills[] | null>(null);

    useEffect(() => {
        async function readSkills() {
            try {
                const { data: competence, error } = await supabase
                    .from("comp")
                    .select("*");

                if (error) {
                    console.error('Erreur lors du chargement des compétences depuis Supabase:', error);
                    return;
                }

                setSkills(competence);
            } catch (error) {
                console.error('Erreur lors du chargement des compétences depuis Supabase:', error);
            }
        }

        readSkills();
    }, []);

    async function exportSkillsToPDF() {
        console.log("exporting to PDF...");
        const doc = new jsPDF();

        doc.setFont("Helvetica", "normal");

        const tableColumn = ["Bloc", "Domaine", "Compétence"];
        const tableRows: (string | number)[][] = [];

        skills?.forEach((skill) => {
            const skillData = [
                skill.nom_bloc.normalize(),
                skill.nom_domaine.normalize(),
                skill.nom_competence.normalize(),
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
        if (skills && skills.length > 0) {
            return skills?.map((skill, index) => (
                <div
                    key={index}
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "8px",
                        borderBottom: "1px solid #000",
                        padding: "8px 30px",
                        margin: "0",
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
                    Chargement...
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
                        <SelectCollaboSkills />
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
                </div>
            </Layout>
        </div>
    );
}
import { Form } from "react-bootstrap";
function SelectCollaboSkills() {
    return (
        <>
            <br />
            <Form.Select className="select-collabo">
                <option>Sélectionner votre compétences</option>
            </Form.Select>
        </>
    );
}

export default SelectCollaboSkills;
