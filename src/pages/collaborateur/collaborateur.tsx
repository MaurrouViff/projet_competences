import "../../assets/css/rh.css"
import {Layout} from "./layout.tsx";

export function Collaborateur() {
    return (
        <>
            <Layout>
                {/*<div style={{display: "flex", background: "#fff", width: "100%"}}>*/}
                    <div className="rh">
                        <h1>Team OASIS</h1>
                        <p>Collaborateurs</p>
                        <img src="/OASIS-logo.jpg" alt=""/>
                    </div>
                {/*</div>*/}
            </Layout>
        </>
    )
}