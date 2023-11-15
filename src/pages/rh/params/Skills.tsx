import {Layout} from "../layout.tsx";
import '../../../assets/css/menu.css'
import '../../../assets/css/salarie.css'
import {LayoutRH} from "./layout.tsx";
import {useState} from "react";
import {Supprimer} from "./supprimer.tsx";


export function Skills() {
    const [showModal, setShowModal] = useState(false);
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
                        <div style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "8px",
                            borderBottom: "1px solid #000",
                            padding: "8px 30px",
                            margin: "0"
                        }}>
                            <p style={{fontWeight: "700", fontSize: "20px", flex: "1"}}>Travail en équipe</p>
                            <button style={{
                                backgroundColor: "#FFF",
                                border: "1px solid #FF0000",
                                borderRadius: "4px",
                                padding: "8px 16px",
                                color: "#FF0000"
                            }} onClick={() => setShowModal(true)}>Supprimer
                            </button>
                        </div>

                        <div style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "8px",
                            borderBottom: "1px solid #000",
                            padding: "8px 30px",
                            margin: "0"
                        }}>
                            <p style={{fontWeight: "700", fontSize: "20px", flex: "1"}}>Travail en équipe</p>
                            <button style={{
                                backgroundColor: "#FFF",
                                border: "1px solid #FF0000",
                                borderRadius: "4px",
                                padding: "8px 16px",
                                color: "#FF0000"
                            }} onClick={() => setShowModal(true)}>Supprimer
                            </button>
                        </div>

                        <div style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "8px",
                            borderBottom: "1px solid #000",
                            padding: "8px 30px",
                            margin: "0"
                        }}>
                            <p style={{fontWeight: "700", fontSize: "20px", flex: "1"}}>Travail en équipe</p>
                            <button style={{
                                backgroundColor: "#FFF",
                                border: "1px solid #FF0000",
                                borderRadius: "4px",
                                padding: "8px 16px",
                                color: "#FF0000"
                            }} onClick={() => setShowModal(true)}>Supprimer
                            </button>
                        </div>

                        <div style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "8px",
                            borderBottom: "1px solid #000",
                            padding: "8px 30px",
                            margin: "0"
                        }}>
                            <p style={{fontWeight: "700", fontSize: "20px", flex: "1"}}>Travail en équipe</p>
                            <button style={{
                                backgroundColor: "#FFF",
                                border: "1px solid #FF0000",
                                borderRadius: "4px",
                                padding: "8px 16px",
                                color: "#FF0000"
                            }} onClick={() => setShowModal(true)}>Supprimer
                            </button>
                        </div>

                        <div style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "8px",
                            borderBottom: "1px solid #000",
                            padding: "8px 30px",
                            margin: "0"
                        }}>
                            <p style={{fontWeight: "700", fontSize: "20px", flex: "1"}}>Travail en équipe</p>
                            <button style={{
                                backgroundColor: "#FFF",
                                border: "1px solid #FF0000",
                                borderRadius: "4px",
                                padding: "8px 16px",
                                color: "#FF0000"
                            }} onClick={() => setShowModal(true)}>Supprimer
                            </button>
                        </div>
                    </div>

                    {showModal && <Supprimer/>}
                </div>
            </Layout>
        </div>
    )
}