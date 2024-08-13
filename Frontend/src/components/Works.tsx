import { Meteors } from "../components/ui/meteors";

const Works = () => {
  return (
    <div className="bg-[#F5F5F7] flex flex-col items-center">
      <div className="lg:w-9/12 w-11/12 px-2 relative lg:bg-[#f5f5f7] text-left mt-4 lg:pt-20 xl:py-[2%] text-gray-600">
        <h1 className="text-2xl lg:text-4xl pb-5  ">How It Works?</h1>
        <p className="text-lg">
        Evaluate properties, meet with agents, negotiate the best deal - our seamless process guides you through every step.
        </p>
      </div>
      <div className="flex flex-wrap justify-center items-center">
        <div className="flex flex-col xl:px-[3.6%] w-11/12 px-2 lg:flex-row justify-center workswidth lg:w-8/12 gap-[6%] mt-10 lg:mt-[6%] xl:mt-6 lg:space-y-0 space-y-12">
          <div className="relative border min-w-[33%] px-4 py-8  overflow-hidden flex flex-col justify-en items-start bg-teal-500 shadow-xl rounded">
            <h1 className="font-bold text-xl text-white mb-4 relative">
              Evaluate Properties
            </h1>

            <p className="font-normal text-base text-white mb-4 relative">
              Evaluate the best properties that align with your requirements,
              desired location, and budget.
            </p>

            <button className="border px-4 py-1 rounded-lg   text-white">
              Explore
            </button>

            <Meteors number={20} />
          </div>
          <div className="relative border min-w-[33%]  px-4 py-8  overflow-hidden flex flex-col  items-start bg-teal-500 shadow-xl rounded">
            <h1 className="font-bold text-xl text-white mb-4 relative ">
              Meet Your Agent
            </h1>

            <p className="font-normal text-base text-white mb-4 relative ">
              Schedule a meeting with our team of highly trained and experienced
              Real Estate advisors to shortlist the most suitable properties for
              you.
            </p>

            <button className="border px-4 py-1 rounded-lg   text-white">
              Explore
            </button>

            <Meteors number={20} />
          </div>

          <div className="relative border  min-w-[33%] px-4 py-8  overflow-hidden flex flex-col  items-start bg-teal-500 shadow-xl rounded">
            <h1 className="font-bold text-xl text-white mb-4 relative ">
              Finalize the Deal
            </h1>

            <p className="font-normal text-base text-white mb-4 relative ">
              Our team will assist you in negotiating the best price in the
              market and guide you through the entire documentation process
              until the possession is handed over.
            </p>

            <button className="border px-4 py-1 rounded-lg   text-white">
              Explore
            </button>

            <Meteors number={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Works;
