const TraditionalModalContent = ({ onClose }) => {
  return (
    <div className="flex justify-center items-center border rounded-lg absolute top-20 left-12 bottom-20 z-10 bg-black text-white w-48 h-32 flex-col gap-3">
      <p>Hey I am a modal</p>
      <button
        className="text-white p-1 border rounded-md bg-red-500"
        onClick={onClose}
      >
        Close
      </button>
    </div>
  );
};

export default TraditionalModalContent;
