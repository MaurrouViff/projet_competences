// import {Modal} from "../../../components/Modal.tsx";
import "../../../assets/css/modal.css";
import { X } from "lucide-react";

export function Supprimer({
  setShowModal
}: {
  setShowModal: (show: boolean) => void;
}) {
  return (
    <>
      {/*<Modal/>*/}
      <div className="modal">
        <div className="container">
          <a onClick={() => setShowModal(false)}>
            <X style={{ cursor: "pointer" }} />
          </a>

          <h2>Suppression</h2>
        </div>
      </div>
      {/*style={{width: "80vw", height: "80vh", backgroundColor: "#333", position: "absolute", bottom: 0, right: 0}}*/}
    </>
  );
}
