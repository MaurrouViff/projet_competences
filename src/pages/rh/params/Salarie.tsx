import { Layout } from "../layout.tsx";
import "../../../assets/css/menu.css";
import "../../../assets/css/salarie.css";
import { LayoutRH } from "./layout.tsx";
import { useEffect, useState } from "react";

import { BeatLoader } from "react-spinners";

interface Salarie {
    idsalarie: number;
    nom: string;
    prenom: string;
}

import supabase from "../../../lib/supabaseClient.ts";

export function Salarie() {
    const [salaries, setSalarie] = useState<Salarie[] | null>(null);
    const [employeeCount, setEmployeeCount] = useState<number>(0);

    useEffect(() => {
        async function readSalarie() {
            try {
                const { data: salaries, error } = await supabase
                    .from("salarie")
                    .select("*");

                if (error) {
                    console.error("Erreur lors de la récupération des salariés:", error);
                    return;
                }

                setEmployeeCount(salaries.length);
                setSalarie(salaries);
            } catch (error) {
                console.error("Erreur lors de la récupération des salariés:", error);
            }
        }

        readSalarie();
    }, []);

    return (
        <div className="salarie">
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
                        <div>
                            <h2>Liste des employés</h2>
                            <p>{employeeCount} employés</p>
                        </div>
                    </div>

                    <div>
                        {salaries && salaries.length > 0 ? (
                            salaries.map((salarie) => (
                                <div
                                    key={salarie.idsalarie}
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "8px",
                                        borderBottom: "1px solid #000",
                                        padding: "8px 30px",
                                        margin: "0",
                                    }}
                                >
                                    <p style={{ fontWeight: "400" }}>
                                        {salarie.prenom} {salarie.nom}
                                    </p>
                                    <p style={{ fontWeight: "700", fontSize: "20px" }}>
                                        Développeur mobile / IOS
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p className="loading text-center display-5 justify-content-center">
                                <BeatLoader color="#000000" />
                            </p>
                        )}
                    </div>
                </div>
            </Layout>
        </div>
    );
}

export default Salarie;
