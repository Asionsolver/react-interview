import { useState } from "react";
import TraditionalModalContent from "./traditional-modal-content";

const TraditionalModal = () => {
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => {
    setShowModal(false);
  };
  return (
    <div className="relative border border-black mb-5 p-2 w-64 h-20 overflow-hidden">
      <button
        className="bg-amber-500 text-white p-1 border rounded-md"
        onClick={() => setShowModal(true)}
      >
        Open Modal
      </button>
      {showModal && <TraditionalModalContent onClose={handleClose} />}
    </div>
  );
};

export default TraditionalModal;
