import React from "react";

const ProblemFour = () => {
  return (
    <div className="min-h-screen flex justify-center items-center p-[2%] bg-slate-900">
      <div className="grid grid-cols-7 grid-rows-[200px_200px_200px]  h-full gap-4 w-full [grid-template-areas:'box-1_box-1_box-1_box-1_box-2_box-2_box-2'_'box-3_box-3_box-4_box-4_box-5_box-5_box-5'_'box-3_box-3_box-6_box-6_box-6_box-7_box-7']">
        <div className="bg-[#0071ff] flex items-center justify-center rounded-md [grid-area:box-1]">
          BOX ONE
        </div>
        <div className="bg-[#0071ff] flex items-center justify-center rounded-md [grid-area:box-2]">
          BOX TWO
        </div>
        <div className="bg-[#0071ff] flex items-center justify-center rounded-md [grid-area:box-3]">
          BOX THREE
        </div>
        <div className="bg-[#0071ff] flex items-center justify-center rounded-md [grid-area:box-4]">
          BOX FOUR
        </div>
        <div className="bg-[#0071ff] flex items-center justify-center rounded-md [grid-area:box-5]">
          BOX FIVE
        </div>
        <div className="bg-[#0071ff] flex items-center justify-center rounded-md [grid-area:box-6]">
          BOX SIX
        </div>
        <div className="bg-[#0071ff] flex items-center justify-center rounded-md [grid-area:box-7]">
          BOX SEVEN
        </div>
        {/* <div className="bg-[#0071ff] flex items-center justify-center rounded-md ">
          BOX EIGHT
        </div>
        <div className="bg-[#0071ff] flex items-center justify-center rounded-md ">
          BOX NINE
        </div> */}
      </div>
    </div>
  );
};

export default ProblemFour;
