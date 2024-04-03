import { Layout } from "../layout.tsx";
import "../../../assets/css/menu.css";
import "../../../assets/css/salarie.css";
import { LayoutRH } from "./layout.tsx";
import { useEffect, useState } from "react";
import { Supprimer } from "./supprimer.tsx";
import supabase from "../../../lib/supabaseClient.ts";



import BeatLoader from "react-spinners/BeatLoader";

interface Skills {
    idcompetence: number;
    titre: string;
}

export function Skills() {
    const [showModal, setShowModal] = useState(false);


    // <Skills[] | null>
    const [skills, setSkills] = useState<Skills[] | null>(null);
    const [skillsCount, setSkillsCount] = useState<number>(0);

    useEffect(() => {
        async function readSkills() {
            try {
                const { data: competence, error } = await supabase.from("comp").select("*");

                if (error) {
                    console.error("Erreur lors de la récupération des compétences:", error);
                    return;
                }

                setSkills(competence);
                setSkillsCount(competence.length);
            } catch (error) {
                console.error("Erreur lors de la récupération des compétences:", error);
            }
        }

        readSkills();
    }, []);

    function renderSkills() {
        if (skills && skills.length > 0) {
            return skills.map((skill, index) => (
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
                    <BeatLoader color="#000000" />
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
                            justifyContent: "space-between",
                            paddingLeft: "30px",
                            fontWeight: "bold",
                            borderBottom: "1px solid #000",
                        }}
                    >
                        <h2>Compétences</h2>
                        <p>{skillsCount} compétences</p>
                    </div>

                    <div>{renderSkills()}</div>

                    {showModal && <Supprimer setShowModal={setShowModal} />}
                </div>
            </Layout>
        </div>
    );
}
