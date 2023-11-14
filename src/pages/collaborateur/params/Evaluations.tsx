import {Layout} from "../layout.tsx";
import '../../../assets/css/menu.css'
import '../../../assets/css/salarie.css'
import {LayoutCollaborateur} from "./layout.tsx";

export function EvaluationsCollaborateur() {
    return (
        <div className="skills salarie">
            <Layout>
                <LayoutCollaborateur/>

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
                        <h2>Evaluations</h2>
                    </div>

                </div>
            </Layout>
        </div>
    )
}