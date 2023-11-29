import {Layout} from "../layout.tsx";
import '../../../assets/css/menu.css'
import '../../../assets/css/salarie.css'
import '../../../assets/css/collabo.css'
import {LayoutCollaborateur} from "./layout.tsx";
import { useEffect, useState } from "react";
import supabase from "../../../lib/supabaseClient.ts";

export function SkillsCollaborateur() {
    const [skills, setSkills] = useState(null);

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

    function renderSkills() {
        if (skills && skills.length > 0) {
            return skills?.map((skill, index) => (
                <div
                    key={index}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                        borderBottom: "1px solid #000",
                        padding: "8px 30px",
                        margin: "0",
                    }}
                >
                    <p style={{ fontWeight: "400" }}>Compétence</p>
                    <p style={{ fontWeight: "700", fontSize: "20px" }}>{skill.nom_competence}</p>
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
                    </div>
                    <h2>Résultat de la recherche</h2>
                    <div>{renderSkills()}</div>
                </div>
            </Layout>
        </div>
    );
}
import Form from 'react-bootstrap/Form';

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