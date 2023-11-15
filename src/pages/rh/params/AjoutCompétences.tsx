// import {Modal} from "../../../components/Modal.tsx";
import "../../../assets/css/modal.css";
import { X } from "lucide-react";

interface AjoutCompetencesProps {
  setShowModal: (show: boolean) => void;
}

export function AjoutCompetences({ setShowModal }: AjoutCompetencesProps) {
  return (
    <>
      {/*<Modal/>*/}
      <div className="modal">
        <div className="container">
          <a href="#" onClick={() => setShowModal(false)}>
            <X style={{ cursor: "pointer" }} />
          </a>

          <h2>Ajouter une compétence</h2>
        </div>
      </div>
      {/*style={{width: "80vw", height: "80vh", backgroundColor: "#333", position: "absolute", bottom: 0, right: 0}}*/}
    </>
  );
}
