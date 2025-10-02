const ProblemOne = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-[2%]">
      <div className="grid grid-cols-[200px_200px] grid-rows-[200px_200px_200px_200px] [grid-template-areas:'box-1_box-2'_'box-3_box-2'_'box-3_box-4'_'box-5_box-4'] sm:grid-cols-[200px_200px_200px] sm:grid-rows-[200px_200px_200px] sm:[grid-template-areas:'box-1_box-1_box-2'_'box-1_box-1_box-3'_'box-4_box-5_box-5'] md:grid-cols-[200px_200px_200px_200px] md:grid-rows-[200px_200px] gap-[1em] md:[grid-template-areas:'box-1_box-2_box-2_box-3'_'box-1_box-4_box-5_box-5']">
        <div className="bg-[#0071ff] [grid-area:box-1]"></div>
        <div className="bg-[#0071ff] [grid-area:box-2]"></div>
        <div className="bg-[#0071ff] [grid-area:box-3]"></div>
        <div className="bg-[#0071ff] [grid-area:box-4]"></div>
        <div className="bg-[#0071ff] [grid-area:box-5]"></div>
      </div>
    </div>
  );
};

export default ProblemOne;
