// import {Modal} from "../../../components/Modal.tsx";
import "../../../assets/css/modal.css";
import { X } from "lucide-react";

export function Details_Eval({
  setShowModal,
  evalID
  // parameters
}: {
  setShowModal: (show: boolean) => void;
  evalID: string;
  // define type for parameters
}) {
  return (
    <>
      {/*<Modal/>*/}
      <div className="modal">
        <div className="container">
          <a onClick={() => setShowModal(false)}>
            <X style={{ cursor: "pointer" }} />
          </a>

          <h2>let's build from here ({evalID})</h2>
        </div>
      </div>
      {/*style={{width: "80vw", height: "80vh", backgroundColor: "#333", position: "absolute", bottom: 0, right: 0}}*/}
    </>
  );
}
