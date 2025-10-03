import ProgressBarStatus from "./progress-bar-status";

const ProgressBar = () => {
  return (
    <div className="flex flex-col gap-4 p-4 w-full h-screen items-center justify-center">
      <h1>Progress Bar</h1>
      <ProgressBarStatus progress={10} />
    </div>
  );
};

export default ProgressBar;
