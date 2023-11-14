import {Layout} from "../layout.tsx";
import '../../../assets/css/menu.css'
import '../../../assets/css/salarie.css'
import {LayoutRH} from "./layout.tsx";

export function Skills() {
    return (
        <div className="skills salarie">
            <Layout>
                <LayoutRH/>

                <div style={{backgroundColor: "#FFF", width: "100%"}}>
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
                        <h2>Compétences</h2>
                    </div>

                    <div>
                        <div style={{display: "flex", flexDirection: "column", gap: "8px", borderBottom: "1px solid #000", padding: "8px 30px", margin: "0"}}>
                            <p style={{fontWeight: "700", fontSize: "20px"}}>Travail en équipe</p>
                        </div>
                        <div style={{display: "flex", flexDirection: "column", gap: "8px", borderBottom: "1px solid #000", padding: "8px 30px", margin: "0"}}>
                            <p style={{fontWeight: "700", fontSize: "20px"}}>Travail en équipe</p>
                        </div>
                        <div style={{display: "flex", flexDirection: "column", gap: "8px", borderBottom: "1px solid #000", padding: "8px 30px", margin: "0"}}>
                            <p style={{fontWeight: "700", fontSize: "20px"}}>Travail en équipe</p>
                        </div>
                        <div style={{display: "flex", flexDirection: "column", gap: "8px", borderBottom: "1px solid #000", padding: "8px 30px", margin: "0"}}>
                            <p style={{fontWeight: "700", fontSize: "20px"}}>Travail en équipe</p>
                        </div>
                        <div style={{display: "flex", flexDirection: "column", gap: "8px", borderBottom: "1px solid #000", padding: "8px 30px", margin: "0"}}>
                            <p style={{fontWeight: "700", fontSize: "20px"}}>Travail en équipe</p>
                        </div>
                    </div>

                </div>
            </Layout>
        </div>
    )
}