// import {Modal} from "../../../components/Modal.tsx";
import '../../../assets/css/modal.css'
import {X} from "lucide-react";

export function AjoutEvaluations() {

    return (
        <>
            {/*<Modal/>*/}
            <div className="modal">
                <div className="container">
                    <a href="">
                        <X style={{cursor: "pointer"}}/>
                    </a>


                    <h2>
                        Ajouter une évaluation
                    </h2>
                </div>
            </div>
            {/*style={{width: "80vw", height: "80vh", backgroundColor: "#333", position: "absolute", bottom: 0, right: 0}}*/}
        </>
    )
}