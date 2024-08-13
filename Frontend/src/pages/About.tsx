import { Star } from "@mui/icons-material";
import { Meteors } from "../components/ui/meteors";
import { Helmet } from "react-helmet";

const About = () => {
  const founders = [
    {
      desc: "Shivam Jaiswal, Founder and Managing Director, leads Symbiosis Infra with integrity and transparency, delivering exceptional service to clients.",
      name: "Mr. Shivam Jaiswal",
      role: "Founder & Managing Director",
      img: "/img/founders/mrshivam.png",
    },
    {
      desc: "Narinder Bisht, Director, leverages his Gurgaon real estate expertise to guide clients towards their perfect properties.",
      name: "Mr. Narinder Bisht",
      role: "Director",
      img: "/img/founders/mrnarinder.png",
    },
    {
      desc: "Karan Sabharwal, Director, ensures smooth operations and exceptional customer support, committed to client satisfaction.",
      name: "Mr. Karan Sabharwal",
      role: "Director",
      img: "/img/founders/mrkaran.png",
    },
  ];

  return (
    <div className="flex flex-col items-center lg:mt-[5%] relative bg-[#F5F5F7] mt-10 lg:space-y-6 space-y-6 ptop">
      <Helmet>
       <title>About</title>
       </Helmet>
      <div className="lg:w-9/12 w-11/12 px-2 workswidth md:w-full md:px-10 lg:px-0 lg:bg-[#f5f5f7] text-left xl:py-[3%] text-gray-600 md:bg-[#f5f5f7]">
        <h1 className="text-2xl lg:text-4xl pb-5 mt-16 md:mt-8 mmargin">
          About Us
        </h1>
        <p className="text-lg">
          At Symbiosis Infra, we are dedicated to providing exceptional real
          estate solutions that cater to the unique needs of our clients. With a
          team of experienced professionals and a deep understanding of the
          market, we strive to deliver unparalleled service and support
          throughout the entire real estate journey.
        </p>
      </div>
      <div className="flex flex-wrap justify-center items-center">
        <div className="flex flex-col xl:px-[3.6%] w-11/12 px-2 lg:flex-row justify-center workswidth lg:w-8/12 gap-[6%] mt-7 lg:mt-[6%] xl:-mt-3 lg:space-y-0 space-y-12">
          <div className="relative border min-w-[33%] px-4 py-8 overflow-hidden flex flex-col  items-start bg-teal-500 shadow-xl rounded">
            <h1 className="font-bold text-xl text-white mb-4 relative">
              Our Vision
            </h1>
            <p className="font-normal text-base text-white mb-4 relative">
              To be the most reliable, trusted and preferred resource partner
              for the entire real estate industry by providing best-fitted
              solutions to our customers, ultimately enhancing value for all our
              stakeholders and associates. We as a company will give our best
              for a transparent and fair deal to all our home buyers.
            </p>
            <Meteors number={20} />
          </div>
          <div className="relative border min-w-[33%] px-4 py-8 overflow-hidden flex flex-col  items-start bg-teal-500 shadow-xl rounded">
            <h1 className="font-bold text-xl text-white mb-4 relative">
              Our Mission
            </h1>
            <p className="font-normal text-base text-white mb-4 relative">
              To emerge as a Universal Platform for all those involved in the
              real estate industry across all the important global territories
              so as to collaborate and co-operate for synergy and bringing
              impetus.
            </p>
            <Meteors number={20} />
          </div>
          <div className="relative border min-w-[33%] px-4 py-8 overflow-hidden flex flex-col  items-start bg-teal-500 shadow-xl rounded">
            <h1 className="font-bold text-xl text-white mb-4 relative">
              Our Goals
            </h1>
            <ul className="text-white items-center">
              <li>
                <Star className="-mt-1 mr-1" sx={{ fontSize: 21 }} /> Integrity
              </li>
              <li>
                <Star className="-mt-1 mr-1" sx={{ fontSize: 21 }} />{" "}
                Transparency
              </li>

              <li>
                <Star className="-mt-1 mr-1" sx={{ fontSize: 21 }} /> Dedicated
                Customer Relationship Team
              </li>

              <li>
                <Star className="-mt-1 mr-2" sx={{ fontSize: 21 }} />
                After-sale service
              </li>
            </ul>
            <Meteors number={20} />
          </div>
        </div>
      </div>

      <div className="lg:w-9/12 w-11/12 px-2 mt-8 space-y-10 text-gray-600">
        <h2 className="text-xl lg:text-2xl font-semibold mb-4 lg:mt-12 mt-2 ">
          Our Founders
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-[6%] gap-12">
          {founders.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="relative">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-64 object-contain"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-opacity-35 backdrop-filter backdrop-blur-sm bg-black text-white px-4 py-3 flex justify-between items-center">
                  <div>
                    <h3 className="font-bold">{item.name}</h3>
                    <p className="text-sm">{item.role}</p>
                  </div>
                  <img className="w-10" src="/img/icon.png" alt="Logo" />
                </div>
              </div>
              <div className="px-4 py-4">
                <p className="text-gray-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
