import { useState } from "react";
import ModalContent from "./modal-content";

const Modal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <div className="h-screen flex justify-center items-center">
      <button
        className="px-2 py-3 bg-green-500"
        onClick={() => setIsOpen(true)}
      >
        Open Modal
      </button>
      {isOpen && <ModalContent handleClose={handleClose} />}
    </div>
  );
};

export default Modal;
