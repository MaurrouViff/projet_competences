import "../../assets/css/rh.css"
import {Layout} from "./layout.tsx";

export function Rh() {
    return (
        <>
            <Layout>
                <div style={{display: "flex", background: "#fff", width: "100%"}}>
                    <div className="rh">
                        <h1>Team OASIS</h1>
                        <p>Ressources humaines</p>
                        <img src="/OASIS-logo.jpg" alt=""/>
                    </div>
                </div>
            </Layout>
        </>
    )
}