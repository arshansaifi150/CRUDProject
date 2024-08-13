import {
  Facebook,
  Instagram,
  LinkedIn,
  WhatsApp,
  YouTube,
  LocationOn,
  X,
} from "@mui/icons-material";

import EnquiryForm from "./EnquiryForm";
import Visit from "./Visit";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="w-full flex justify-center mt-[10%] pt-[4%] relative bg-black">
      <img
        src="/img/Footer.png"
        alt="Footer Background"
        className="absolute inset-0 object-cover pt-3 lg:pt-5 bg-opacity-35 bg-white w-full"
      />
      <div className="w-11/12 md:w-9/12 lg:z-10 mt-[27%] lg:mt-0">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-white font-bold text-xl mb-4">
              ABOUT SYMBIOSIS INFRA
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              Established in 2020, Symbiosis Infra is a leading real estate
              company in India. The company focuses on simplifying the property
              buying experience for clients and has a proven track record of
              excellence in the industry.
            </p>
          </div>
          <div>
            <h3 className="text-white font-bold text-lg mb-2">WORK WITH US</h3>
            <ul className="text-gray-300 text-sm">
              <li className="mb-1">
                <EnquiryForm />
              </li>
              <li className="mb-1 -z-10">
                <Visit />
              </li>
              <Link to="/Career">
                {" "}
                <li className="mb-1 hover:underline">Career</li>
              </Link>
              <Link to="/Contact">
                {" "}
                <li className="mb-1 hover:underline">Contact us</li>
              </Link>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold text-lg mb-2">QUICK LINKS</h3>
            <ul className="text-gray-300 text-sm">
              <Link to="/">
                {" "}
                <li className="mb-1 hover:underline">Home</li>
              </Link>
              <Link to="/Properties">
                {" "}
                <li className="mb-1 hover:underline">Properties</li>
              </Link>

              <Link to="/Blogs">
                {" "}
                <li className="mb-1 hover:underline">Blogs</li>
              </Link>

              <Link to="/About">
                {" "}
                <li className="mb-1 hover:underline">About us</li>
              </Link>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-2">PROPERTIES</h3>
            <ul className="text-gray-300 text-sm">
              <Link to="/properties?type=Residential">
                {" "}
                <li className="mb-1 hover:underline">Residential</li>
              </Link>
              <Link to="/properties?type=Commercial">
                {" "}
                <li className="mb-1 hover:underline">Commercial</li>
              </Link>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold text-lg mb-2">LOCATIONS</h3>
            <ul className="text-gray-300 text-sm">
              <Link to="/properties?location=Delhi">
                {" "}
                <li className="mb-1 hover:underline">Delhi</li>
              </Link>
              <Link to="/properties?location=Gurugram">
                {" "}
                <li className="mb-1 hover:underline">Gurugram</li>
              </Link>
              <Link to="/properties?location=Mumbai">
                {" "}
                <li className="mb-1 hover:underline">Mumbai</li>
              </Link>
              <Link to="/properties?location=Goa">
                {" "}
                <li className="mb-1 hover:underline">Goa</li>
              </Link>
              <Link to="/properties?location=Dubai">
                {" "}
                <li className="mb-1 hover:underline">Dubai</li>
              </Link>
            </ul>
          </div>
        </div>
        <div className="flex w-11/12 justify-between first-letter:mt-8 py-7 pb-5 lg:py-7 ">
          <div className="flex mb-4 md:mb-0 space-x-4">
            <a
              target="_blank"
              href="https://www.facebook.com/profile.php?id=100088563983528"
              className="text-gray-300  hover:text-white transition-colors duration-300"
            >
              <Facebook />
            </a>
            <a
              target="_blank"
              href="https://twitter.com/symbiosis_infra/"
              className="text-gray-300  hover:text-white transition-colors duration-300"
            >
              <X />
            </a>
            <a
              target="_blank"
              href="https://www.instagram.com/realestatewithsymbiosisinfra/"
              className="text-gray-300  hover:text-white transition-colors duration-300"
            >
              <Instagram />
            </a>
            <a
              target="_blank"
              href="https://www.linkedin.com/company/symbiosisinfra/"
              className="text-gray-300 hover:text-white transition-colors duration-300"
            >
              <LinkedIn />
            </a>
          </div>
          <div className="flex space-x-4">
            <a target="_blank" href="https://wa.me/919667596632">
              <WhatsApp className="h-8 text-gray-300 hover:text-white transition-colors duration-300" />
            </a>

            <a
              target="_blank"
              href="https://www.youtube.com/@symbiosisinfrapvtltd3112/"
            >
              <YouTube className="h-8 text-gray-300 hover:text-white transition-colors duration-300" />
            </a>
            <a
              target="_blank"
              href="https://maps.app.goo.gl/p4kc3L9H174NaJuN8"
              className=""
            >
              <LocationOn className="h-8 text-gray-300 hover:text-white transition-colors duration-300" />
            </a>
          </div>
        </div>
        <div className="flex lg:flex-row flex-col justify-center lg:space-x-10 items-center lg:space-y-0 space-y-2 text-center lg:pt-16 lg:pb-8 pb-10 text-gray-300">
          <span>Copyright ©2024 Symbiosis Infra Pvt Ltd. </span>
          <span className="space-x-4">
            <Link to="/Disclaimer" className="hover:underline">
              Disclaimer
            </Link>{" "}
            <Link to="/Privacy" className="hover:underline">
              Privacy Policy
            </Link>{" "}
          </span>
          <span>Haryana RERA Regd No. – RC/HRERA/GGM/1355/950/2020/54</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
