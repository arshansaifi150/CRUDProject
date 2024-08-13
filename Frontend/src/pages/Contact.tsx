import {
  Mail,
  Phone,
  Facebook,
  Instagram,
  LinkedIn,
  YouTube,
  WhatsApp,
  X,
  Home,
} from "@mui/icons-material";
import { useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";


const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    message: "",
    receiveUpdates: true,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, receiveUpdates: e.target.checked });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/contacts", formData);
      // Reset the form data
      setFormData({
        firstName: "",
        lastName: "",
        mobile: "",
        email: "",
        message: "",
        receiveUpdates: true,
      });
      alert("Contact form submitted successfully!");
    } catch (error) {
      console.error("Error submitting contact form:", error);
      alert("Error submitting contact form. Please try again later.");
    }
  };
  return (
    <div className="flex flex-col items-center lg:mt-[5%] relative bg-[#F5F5F7] mt-10 lg:space-y-0 space-y-6 ptop">
      <Helmet>
       <title>Contact</title>
       </Helmet>
      <div className="lg:w-9/12 w-11/12 px-2 workswidth md:w-full md:px-10 lg:px-0 lg:bg-[#f5f5f7] text-left xl:py-[3%] text-gray-600 md:bg-[#f5f5f7]">
        <h1 className="text-2xl lg:text-4xl pb-5 mt-16 md:mt-8 mmargin">
          Contact Us
        </h1>
        <p className="text-lg">
          Feel free to reach out to us for any inquiries or to get the latest
          updates on our projects.
        </p>
      </div>
      <div className="flex flex-wrap items-start justify-center lg:w-9/12 w-11/12 px-2 lg:-space-y-0 space-y-12 lg:gap-[3%]">
        <div className="flex flex-col md:flex-row justify-center lg:items-start items-center gap-[4%]">
          <div className="lg:w-6/12 w-11/12 ">
            <h2 className="text-2xl  mb-4 text-gray-600">Instant Call Back</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
                <input
                  type="tel"
                  placeholder="Mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
              </div>
              <textarea
                placeholder="Message"
                rows={6}
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded mt-4 focus:outline-none focus:ring-1 focus:ring-teal-500"
              ></textarea>
              <div className="flex">
                <input
                  type="checkbox"
                  id="receiveUpdates"
                  name="receiveUpdates"
                  className="h-4 w-4 text-teal-500 border-gray-300 rounded mt-1"
                  checked={formData.receiveUpdates}
                  onChange={handleCheckboxChange}
                  required
                />
                <label htmlFor="receiveUpdates" className="ml-2 text-gray-600">
                  I authorize company representatives to Call, SMS, Email or
                  WhatsApp me about its products and offers.This consent
                  overrides any registration for DNC/NDNC.
                </label>
              </div>
              <button
                type="submit"
                className="bg-teal-500 text-white px-4 py-2 rounded mt-4 hover:bg-teal-600 transition-colors duration-300"
              >
                Send
              </button>
            </form>
          </div>
          <div className="md:w-1/2 p-8 lg:pt-0">
            <h2 className="text-2xl  mb-4 text-gray-600">Get In Touch</h2>
            <p className="mb-4">
              Fell free to contact with us for get the latest update
            </p>
            <div className="flex flex-col space-y-5">
              <div className="flex items-center">
                <Home className="text-teal-500 mr-2" />
                <span>
                  402, 4th Floor, Tower 1, DLF Corporate Greens, Sector 74A,
                  Gurugram, Haryana 122004
                </span>
              </div>
              <div className="flex items-center">
                <Mail className="text-teal-500 mr-2" />
                <span>info@symbiosisinfra.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="text-teal-500 mr-2" />
                <span>+91 124 518 0983</span>
              </div>
            </div>
            <div className="flex mt-5 space-x-4">
              <a
                target="_blank"
                href="https://www.facebook.com/profile.php?id=100088563983528"
                className="text-teal-500 hover:text-teal-600"
              >
                <Facebook />
              </a>
              <a
                target="_blank"
                href="https://twitter.com/symbiosis_infra/"
                className="text-teal-500 hover:text-teal-600"
              >
                <X />
              </a>

              <a
                target="_blank"
                href="https://www.instagram.com/realestatewithsymbiosisinfra/"
                className="text-teal-500 hover:text-teal-600"
              >
                <Instagram />
              </a>
              <a
                target="_blank"
                href="https://www.linkedin.com/company/symbiosisinfra/"
                className="text-teal-500 hover:text-teal-600"
              >
                <LinkedIn />
              </a>
              <a
                target="_blank"
                href="https://www.youtube.com/@symbiosisinfrapvtltd3112/"
                className="text-teal-500 hover:text-teal-600"
              >
                <YouTube />
              </a>
              <a
                target="_blank"
                href="https://wa.me/919667596632"
                className="text-teal-500 hover:text-teal-600"
              >
                <WhatsApp />
              </a>
            </div>
          </div>
        </div>
        <div className="w-full mt-8 lg:pt-12">
          <div className="aspect-w-16 aspect-h-10">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14037.639996178677!2d76.997787!3d28.406883!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d3d5ac9bfffff%3A0x16a2acdf5ece3648!2sSymbiosis%20Infra%20Pvt%20Ltd.%20-%20Best%20Real%20Estate%20Company%20In%20Gurgaon!5e0!3m2!1sen!2sus!4v1714842336029!5m2!1sen!2sus"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
              height="400px"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
