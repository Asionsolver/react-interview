const ProblemTwo = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-[2%]">
      <div className="grid auto-cols-[200px] auto-rows-[200px]  [grid-template-areas:'box-1_box-1'_'box-2_box-3'_'box-2_box-4'_'box-5_box-6'] gap-[1.5em] md:[grid-template-areas:'box-1_box-2_box-2'_'box-1_box-3_box-4'_'box-5_box-5_box-6']">
        <div className="bg-[#c1b1e4] [grid-area:box-1] rounded-2xl "></div>
        <div className="bg-[#f282a3] [grid-area:box-2] rounded-2xl "></div>
        <div className="bg-[#c4d68d] [grid-area:box-3] rounded-2xl "></div>
        <div className="bg-[#fbdc6f] [grid-area:box-4] rounded-2xl "></div>
        <div className="bg-[#de9469] [grid-area:box-5] rounded-2xl "></div>
        <div className="bg-[#abbfcb] [grid-area:box-6] rounded-2xl "></div>
      </div>
    </div>
  );
};

export default ProblemTwo;
