const ProblemThree = () => {
  return (
    <div className="font-sans  flex items-center justify-center bg-gray-50">
      <div className="bento-grid w-full m-4 gap-8 grid auto-cols-fr auto-rows-[4.6875rem] max-w-[87.5rem]  [grid-template-areas:'box1_box2_box2_box3'_'box1_box2_box2_box3'_'box1_box2_box2_box3'_'box1_box2_box2_box3'_'box1_box5_box6_box3'_'box4_box5_box6_box3'_'box4_box5_box6_box3'_'box4_box7_box8_box8'_'box4_box7_box8_box8'_'box4_box7_box8_box8']">
        <div className="item [grid-area:box1] bg-yellow-100 pt-24 pr-8 pl-[2.5rem]">
          <div className="lg-text leading-[1] flex flex-col">
            Create and schedule content
            <em className="text-purple-500">quicker.</em>
          </div>
          <img
            className="mt-4"
            src="/images/illustration-create-post.webp"
            alt="button"
          />
        </div>

        <div className="item [grid-area:box2] bg-purple-500 flex flex-col items-center justify-center px-7 gap-3">
          <p className="xlg-text text-white text-center leading-16">
            Social Media <span>10x</span> <em>Faster</em> with AI
          </p>
          <img
            src="/images/illustration-five-stars.webp"
            className="h-12"
            alt="star"
          />
          <p className="sm-text text-white">Over 4,000 5-start reviews</p>
        </div>

        <div className="item [grid-area:box3] relative bg-purple-100 flex flex-col items-center justify-center pl-[2.5rem]">
          <p className="absolute top-[70px] left-10 lg-text leading-10">
            Schedule to social media.
          </p>
          <img
            src="/images/illustration-schedule-posts.webp"
            alt="graphic"
            className="my-8 absolute top-[150px] left-10 h-[350px]"
          />
          <p className="sm-text absolute top-[570px] left-10 leading-6">
            Optimize post timing to publish content at the perfect time for your
            audience.
          </p>
        </div>

        <div className="item [grid-area:box4] bg-yellow-500 p-[2.5rem]">
          <p className="lg-text leading-[1] ">Write your content using AI</p>
          <img
            className="mt-14"
            src="/images/illustration-ai-content.webp"
            alt="graphic"
          />
        </div>

        <div className="item [grid-area:box5] bg-white  p-[1.5rem]">
          <img
            src="/images/illustration-multiple-platforms.webp"
            alt="multi-platforms"
          />
          <p className="med-text leading-[1] mt-6">
            Manages multiple accounts and platforms
          </p>
        </div>

        <div className="item [grid-area:box6] bg-yellow-500  p-[1.5rem]">
          <p className="med-text leading-[1] mb-4">
            Maintain a consistent posting schedule.
          </p>
          <img
            src="/images/illustration-consistent-schedule.webp"
            alt="graphic"
          />
        </div>

        <div className="item [grid-area:box7] flex items-center justify-center flex-col bg-white p-[1.5rem]">
          <p className="sm-text">
            <span className="flex items-center ">
              <span className="xlg-text mb-3">{" > "}</span>
              <span className="xlg-text">56%</span>
            </span>
            <div className="mb-10">faster audience growth</div>
          </p>
          <img
            src="/images/illustration-audience-growth.webp"
            className="h-20 "
            alt="graphic"
          />
        </div>

        <div className="item [grid-area:box8] bg-purple-500 flex p-[1.5rem]">
          <img src="/images/illustration-grow-followers.webp" alt="graphic" />
          <p className="lg-text leading-[1] self-center text-white">
            Grow followers with non-stop content.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProblemThree;
