import { Layout } from "../layout.tsx";
import "../../../assets/css/menu.css";
import "../../../assets/css/salarie.css";
import { LayoutRH } from "./layout.tsx";
import { useEffect, useState } from "react";

import {BeatLoader} from "react-spinners";

interface Salarie {
  idsalarie: number;
  nom: string;
  prenom: string;
}

import supabase from "../../../lib/supabaseClient.ts";

export function Salarie() {
  const [salaries, setSalarie] = useState<Salarie[] | null>(null);

  useEffect(() => {
    async function readSalarie() {
      let { data: salaries, error } = await supabase
        .from("salarie")
        .select("*");
      if (error) {
        console.log(error);
      }
      return setSalarie(salaries);
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
              paddingLeft: "30px",
              fontWeight: "bold",
              borderBottom: "1px solid #000",
            }}
          >
            <h2>Liste des employés</h2>
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
