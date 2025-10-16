import { useState } from "react";
import TraditionalModalContent from "./traditional-modal-content";
import { createPortal } from "react-dom";

const PortalModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative border border-black mb-5 p-2 w-64 h-20 overflow-hidden">
      <button
        className="px-2 py-3 text-white rounded bg-green-500"
        onClick={() => setIsOpen(true)}
      >
        Modal using React Portal
      </button>

      {isOpen &&
        createPortal(
          <TraditionalModalContent onClose={() => setIsOpen(false)} />,
          document.body
        )}
    </div>
  );
};

export default PortalModal;
