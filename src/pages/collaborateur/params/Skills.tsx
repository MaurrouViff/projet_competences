import { Layout } from "../layout.tsx";
import "../../../assets/css/menu.css";
import "../../../assets/css/salarie.css";
import "../../../assets/css/collabo.css";
import { LayoutCollaborateur } from "./layout.tsx";

import { useEffect, useState } from "react";

// import supabase
import supabase from "../../../lib/supabaseClient.ts";

export function SkillsCollaborateur() {
  interface Skills {
    idcompetence: number;
    titre: string;
    nom_domaine: string;
  }

  const [showModal, setShowModal] = useState(false);

  // <Skills[] | null>
  const [skills, setSkills] = useState<Skills[] | null>(null);

  useEffect(() => {
    async function readEvaluation() {
      let { data: skills, error } = await supabase
        .from("comp")
        .select("*");

      if (error) {
        console.log(error);
      }
      return setSkills(skills);
    }
    readEvaluation();
  }, []);

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
import Form from "react-bootstrap/Form";

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
