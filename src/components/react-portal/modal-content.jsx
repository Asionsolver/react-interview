import { IoMdClose } from "react-icons/io";

const ModalContent = ({ handleClose }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
    >
      {/* click-to-close backdrop layer */}
      <div
        onClick={handleClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />

      {/* Modal panel */}
      <div className="relative z-10 max-w-lg w-full rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-gray-900">Modal Title</h2>
            <p className="mt-1 text-sm text-gray-600">
              This is a description for the modal content.
            </p>
          </div>

          <button
            onClick={handleClose}
            aria-label="Close modal"
            className="rounded-md p-2 hover:bg-gray-100 active:scale-95 transition-transform"
          >
            {/* simple X icon (SVG) */}
            <IoMdClose className="h-5 w-5 text-gray-700" />
          </button>
        </div>

        {/* Content area */}

        {/* Footer actions (example) */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={handleClose}
            className="rounded-lg px-4 py-2 text-sm font-medium ring-1 ring-gray-100 hover:bg-gray-50 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalContent;
