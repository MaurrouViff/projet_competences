import {Layout} from "../layout.tsx";
import '../../../assets/css/menu.css'
import '../../../assets/css/salarie.css'
import '../../../assets/css/collabo.css'
import {LayoutCollaborateur} from "./layout.tsx";

export function SkillsCollaborateur() {
    return (
        <div className="skills salarie">
            <Layout>
                <LayoutCollaborateur/>

                <div style={{backgroundColor: "#FFF", width: "100%", overflowY: "auto", height: "100vh"}}>
                    <div style={{
                        height: "100px",
                        width: "100%",
                        backgroundColor: "#FFF",
                        display: "flex",
                        alignItems: "center",
                        paddingLeft: "30px",
                        fontWeight: "bold",
                        borderBottom: "1px solid #000"
                    }}>
                        <h2>Tirage par compétences</h2>
                        <SelectCollaboSkills/>

                    </div>
                    <h2>Résultat de la recherche</h2>
                    <div>
                        <div style={{display: "flex", flexDirection: "column", gap: "8px", borderBottom: "1px solid #000", padding: "8px 30px", margin: "0"}}>
                            <p style={{fontWeight: "400"}}>Compétence</p>
                            <p style={{fontWeight: "700", fontSize: "20px"}}>Label compétence</p>
                        </div>

                        <div style={{display: "flex", flexDirection: "column", gap: "8px", borderBottom: "1px solid #000", padding: "8px 30px", margin: "0"}}>
                            <p style={{fontWeight: "400"}}>Compétence</p>
                            <p style={{fontWeight: "700", fontSize: "20px"}}>Label compétence</p>
                        </div>

                        <div style={{display: "flex", flexDirection: "column", gap: "8px", borderBottom: "1px solid #000", padding: "8px 30px", margin: "0"}}>
                            <p style={{fontWeight: "400"}}>Compétence</p>
                            <p style={{fontWeight: "700", fontSize: "20px"}}>Label compétence</p>
                        </div>

                        <div style={{display: "flex", flexDirection: "column", gap: "8px", borderBottom: "1px solid #000", padding: "8px 30px", margin: "0"}}>
                            <p style={{fontWeight: "400"}}>Compétence</p>
                            <p style={{fontWeight: "700", fontSize: "20px"}}>Label compétence</p>
                        </div>


                    </div>
                </div>
            </Layout>
        </div>
    )
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