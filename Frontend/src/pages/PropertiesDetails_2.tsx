//@ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../components/ui/carousel';

import { IconRenderer } from '../components/IconRendererHelperFunction/IconRenderer';

import pdf from '../.././public/downloads/brochure/krisumi_watersides_residences-brochure.pdf'

import Autoplay from "embla-carousel-autoplay";
import GetCallForm from "../components/v2_components/GetCallForm";
import { Button } from "../components/ui/button";
import { useNavigate, useParams,Link } from "react-router-dom";
import axios, { AxiosResponse } from "axios";

// mui Icons
import {
  AcUnit, Business, ChangeCircle, ChildCare, ContentCut, Deck, DirectionsBike,
  ElderlyWoman, Elevator, FitnessCenter, Help, House, Kitchen, Language,
  LocalCafe, LocalGasStation, LocalGroceryStore, LocalLibrary, LocalParking,
  LocalPharmacy, MeetingRoom, Pets, Pool, Restaurant, Security, Spa,
  SportsGymnastics, SportsHandball, Videocam, WaterDrop, Wifi,
  WhatsApp, CurrencyRupee, Domain, Balcony, SportsTennis,
  DirectionsRun, Park, ElectricalServices, FamilyRestroom,
  CameraIndoor, Nightlife, Close, Map,
  Collections, MenuBook, Description, FileDownload, ConstructionOutlined,FireHydrantAlt,YardRounded
} from "@mui/icons-material"
import EditProperty from "./EditProperty";


interface Property {
  data: SetStateAction<Property | null>;
  _id: string;
  title: string;
  price: number;
  bedrooms: Array[];
  bathrooms: number;
  area: string;
  amenities: Array[];
  gallery: string[];
  location: string;
  propertyType: string;
  googleMapEmbeddedUrl: string;
  highlights: string[];
  about_builder: string;
  address: string;
  overview: string;
  downloads: string;
  neighbourhood: string[];
  image: string;
  types: string;
}

 //form data of main forms
 interface FormData {
  name: string;
  mobile: string;

  email: string;
  propertyId: string;
  receiveUpdates: boolean;
}

//form data for brochure
interface FormData_2 {
  name: string;
  mobile: string;

  email: string;
  propertyId: string;
  receiveUpdates: boolean;
}

function PropertiesDetails_2() {
  const isLoggedIn = !!localStorage.getItem('jwtToken')

  const {id} = useParams()
  const [property, setProperty] = useState<Property | null>(null);  
  const fetchProperty = async () => {
    try {
      
      const result: AxiosResponse<Property> = await axios.get(
        `http://localhost:4000/properties/${id}`
      );
      // console.log(result.data)
      setProperty(result.data.data);
    } catch (error) {
      console.log("Unexpected Error, try again later", error);
    }
  };


  useEffect(() => {
    fetchProperty();
  }, [id]);
  // console.log(property)
  //useref to all the cards on the page
  const sectionRefs = useRef({});
  const scrollToSection = (key) => {
    sectionRefs.current[key].scrollIntoView({ behavior: "smooth" });
  };

  const addToRefs = (key, element) => {
    if (element && !sectionRefs.current[key]) {
      sectionRefs.current[key] = element;
    }
  };

 

  //useState for FormData
  const [formData, setFormData] = useState<FormData>({
    name: "",
    mobile: "",
    email: "",
    propertyId: window.location.href || "",
    receiveUpdates: true,
  });

  //useState for formData_2
  const [formData_2, setFormData_2] = useState<FormData_2>({
    name: "",
    mobile: "",
    email: "",
    propertyId: window.location.href || "",
    receiveUpdates: true,
  });

  const navigate = useNavigate();

  //handle input change for form
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  //handle input change for form_2
  const handleInputChange_2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    setFormData_2((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  //useState for brochure
  const [downloadBrochure, setDownloadBrochure] = useState(false);

  //handle submit for form
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (formData.email === "" ||
       formData.name === "" ||
       formData.mobile === "") {
        alert("Fill form Details")
    } else {
      axios.post("http://localhost:4000/formData",formData)
      
      window.scrollTo(0,0)
      
      // navigate("/success");
    }
  };

  //handle Submit for form_2
  const handleSubmit_2 = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    //conditional handling for opening Brochure Dialog
    if (
      formData_2.email === "" ||
      formData_2.name === "" ||
      formData_2.mobile === ""
    ) {
      alert("fill form details");
      
    } else {
      axios.post("http://localhost:4000/formData",formData_2)
      setDownloadBrochure(true);
    }
    setBrochure(false);
  };

  //Use State for Dialog boxes of (map,images,brochure)
  const [map, setMap] = useState(false);
  const [images, setImages] = useState(false);
  const [brochure, setBrochure] = useState(false);

  //handle download of brochure
  const handleDownload = () => {
    // URL of the file to be downloaded

    const fileUrl = pdf;
    // Create a temporary anchor element
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = "krisumi_watersides_residences-brochure.pdf"; // The file name that will be used on download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const deleteProperty = async (id) => {
    await axios.delete(`http://localhost:4000/properties/${id}`);
    navigate("/properties");
  };
  
  
  return (
    <>
      {isLoggedIn && (
            <>
              <div className="flex justify-end mt-20">
                <Link to={`/EditProperty/${property?._id}`} element={<EditProperty/>}>
                  <button
                    className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-6 m-2 rounded-xl"
                  >Update</button>
                </Link>
                <button onClick={() => deleteProperty(property?._id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 m-2 rounded-xl"
                >Delete</button>
              </div>
            </>
          )}
      {/* Carousel and title,pricing section starts here */}
      <div
        className="h-full w-full mt-[6rem] lg:mt-[8rem] 2xl:mt-[10rem] flex justify-center
      "
      >
        <div className=" flex flex-col p-2 justify-center items-center   2xl:w-[80%] xl:w-[80%]  lg:flex lg:flex-row lg:justify-center gap-2">
          <div className="   md:w-[80%]  p-2 bg-gray-200 rounded-xl shadow-xl">
            <Carousel
              opts={{
                loop: true,
              }}
              plugins={[
                Autoplay({
                  delay: 4000,
                  stopOnMouseEnter: false,
                  stopOnFocusIn: false,
                  stopOnInteraction: false,
                }),
              ]}
            >
              <CarouselContent>
                {property?.gallery?.map((image, index) => (
                  <CarouselItem key={index}>
                    <img
                      src={image}
                      alt={`Gallery Image ${index + 1}`}
                      className="w-full lg:h-96 h-full object-cover rounded-xl shadow-lg"
                      onClick={() => (
                        window.scrollTo(0,0),
                        setImages(true))}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              {/* Buttons to open dialog boxes of map,images,brochure */}
              <div className="w-full bg-black/[0.4] h-14 absolute rounded-b-lg -mt-14 flex justify-between items-center ">
                <div>
                  <button
                    className="ml-2 text-lg py-1 px-1 lg:px-2 lg:py-1 xl:px-3 xl:py-2 bg-white rounded-md"
                    onClick={() => (
                      window.scrollTo(0,0),
                      setImages(true))}
                  >
                    <Collections
                      className="text-teal-500"
                      sx={{ fontSize: 15 }}
                    />{" "}
                    Images
                  </button>
                  <button
                    className="ml-2 text-lg py-1 px-1 lg:px-2 lg:py-1 xl:px-3 xl:py-2 bg-white rounded-md"
                    onClick={() => (
                      window.scrollTo(0,0),
                      setMap(true))}
                  >
                    <Map className="text-teal-500" sx={{ fontSize: 15 }} />{" "}
                    Map
                  </button>
                </div>
                <div>
                  <button
                    className="ml-2  md:text-lg py-1 px-1 lg:px-2 lg:py-1 xl:px-3 xl:py-2 bg-white rounded-md mr-2"
                    onClick={() => (
                      window.scrollTo(0,0),
                      setBrochure(true))}
                  >
                    <MenuBook
                      className="text-teal-500 "
                      sx={{ fontSize: 20 }}
                    />{" "}
                    Download Brochure
                  </button>
                </div>
              </div>
            </Carousel>
          </div>

          <div className="md:w-[80%] lg:h-full shadow-2xl border-2  border-gray-300 rounded-2xl w-full h-fit flex flex-col p-5">
            <div className="p-2 ">
              <h1 className="text-3xl lg:text-4xl xl:text-4xl 2xl:text-4xl ">
                {property?.title}
              </h1>
              <h1 className="text-xl 2xl:text-2xl lg:text-2xl font-serif">
                {property?.location}
              </h1>
              <p className="text-lg lg:text-xl">{property?.address}</p>
            </div>
            <div className="mt-3 border-2 border-gray-200 rounded-xl  shadow-xl w-fit p-3 ">
              <Domain sx={{ fontSize: 40 }} />
              <p className="text-lg xl:text-xl lg:text-lg">
                Area: {property?.area}
              </p>
              <h1 className="text-2xl xl:text-2xl lg:text-2xl font-semibold ">
                Price: <CurrencyRupee className="text-xl  font-semibold" />
                {parseFloat(property?.price)/10000000} Cr
              </h1>
            </div>
            <div>
              <div className="flex  w-full gap-5 mt-3 lg:mt-10">
                <a
                  href="https://wa.me/+919311377754"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="border-2  border-teal-400 bg-white hover:bg-teal-600 hover:text-white cursor-pointer hover:scale-95 hover:duration-500 px-10 py-6 ">
                    <div>
                    <WhatsApp
                      sx={{ fontSize: 30 }}
                      className="text-green-500 hover:text-white"
                    />
                    </div>
                  </Button>
                </a>
                <Button className="border-2 border-teal-400 bg-teal-500 hover:bg-teal-600 cursor-pointer hover:scale-95 hover:duration-500 hover:ease-in-out text-lg font-semibold px-10 py-6 ">
                  <GetCallForm />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* carousel and title,price box ends here */}

      {/* unordered list starts */}
      <div className="w-full md:flex md:justify-center mt-10 border-2 border-gray-300 border-x-1 p-2">
        <div className="md:w-[100%]">
          <ul className="list-disc md:list-none text-base  ml-5 md:flex md:justify-start lg:justify-start md:gap-1.5  lg:gap-8  md:text-lg cursor-pointer xl:justify-center">
            <li
              className="underline decoration-teal-500 decoration-2 text-teal-600"
              onClick={() => scrollToSection("section1")}
            >
              Overview
            </li>
            <li onClick={() => scrollToSection("section2")}>Amenities</li>
            <li onClick={() => scrollToSection("section3")}>Highlights</li>
            <li onClick={() => scrollToSection("section4")}>Neighbourhood</li>
            <li onClick={() => scrollToSection("section5")}>Gallery</li>
            <li onClick={() => scrollToSection("section6")}>Videos</li>
            <li onClick={() => scrollToSection("section7")}>Map</li>
            <li onClick={() => scrollToSection("section8")}>About Builder</li>
            <li onClick={() => scrollToSection("section9")}>More</li>
          </ul>
        </div>
      </div>
      <div>
        {/* unordered list ends here*/}

        {/*Overview and side form starts here*/}
        <div className="flex flex-col w-full lg:w-[100%] ">
        <div className="w-full">
          <div className=" lg:w-[100%]  xl:mx-auto ">
            <div
              className="w-full p-2 lg:p-4 flex justify-center mt-10"
              ref={(element) => addToRefs("section1", element)}
            >
              <div className="w-full lg:w-[80%] xl:w-[60%] 2xl:w-[56%] h-fit p-3 border-2 border-gray-300 rounded-xl shadow-lg bg-white 2xl:-ml-[5rem]">
                <div className="">
                  <h1 className="text-2xl p-1  font-semibold   border-b-2  border-gray-300 ">
                    Overview
                  </h1>

                  <div className="mt-2">
                    <p className="text-base md:text-lg leading-9 md:leading-10">
                      {property?.overview}
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-[30%] xl:w-[20%] ml-10  bg-white p-3 rounded-xl border-2 border-gray-200 hidden lg:block sticky mt-0">
                <form onSubmit={handleSubmit} className="">
                  <div className="mb-4">
                    <label htmlFor="name" className="block font-medium mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring-1 focus:ring-teal-500 appearance-none"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="mobile" className="block font-medium mb-1">
                      Mobile number
                    </label>
                    <input
                      type="tel"
                      id="mobile"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring-1 focus:ring-teal-500 appearance-none"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="email" className="block font-medium mb-1">
                      Email ID
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring-1 focus:ring-teal-500 appearance-none"
                    />
                  </div>
                  <input
                    type="hidden"
                    name="propertyId"
                    value={formData.propertyId}
                  />
                  <div className="mb-4">
                    <input
                      type="checkbox"
                      name="receiveUpdates"
                      checked={formData.receiveUpdates}
                      onChange={handleInputChange}
                      className="h-4 w-4 mr-2 text-teal-500 border-gray-300 rounded"
                    />

                    <label>
                      I authorize company representatives to Call, SMS, Email or
                      WhatsApp me about its products and offers.This consent
                      overrides any registration for DNC/NDNC.
                    </label>
                  </div>
                  <div className="mt-6">
                    <button
                      type="submit"
                      className="w-full bg-teal-500 hover:bg-teal-600 text-white drop-shadow-lg font-medium py-2 px-4 rounded"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          {/* Amenities section starts here */}
          <div className="w-full lg:w-[70%] 2xl:ml-14 z-10   ">
            <div
              className="w-full p-2 lg:p-4 flex justify-center "
              ref={(element) => addToRefs("section2", element)}
            >
              <div className="w-full 2xl:w-[80%] xl:w-[87%]    h-fit p-3 border-2 border-gray-300 rounded-xl shadow-lg bg-white">
                <div>
                  <h1 className="text-2xl font-semibold  border-b-2  border-gray-300 ">
                    Amenities
                  </h1>

                  <div className="mt-2 flex text-base gap-10 lg:text-xl md:gap-[10rem] 2xl:gap-[10rem] p-2">
                    <div className=" leading-[3rem] ">
                      <ul className="">
                        
                        {property?.amenities?.filter((item,index)=>index<(property?.amenities.length)/2).map((amenitie)=>(
                            <li className="">
                              <IconRenderer iconName={amenitie.icon} className="text-teal-600" />
                              {amenitie.name}
                              
                              </li>
                        ))}
                      </ul>
                    </div>
                    <div className=" leading-[3rem] ">
                      <ul className="">
                        
                        {property?.amenities?.filter((item,index)=>index>=(property?.amenities.length)/2).map((amenitie)=>(
                            <li>
                              <IconRenderer iconName={amenitie.icon} className="text-teal-600" />
                              {amenitie.name}
                              
                              </li>
                        ))}
                      </ul>
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
            {/* Amenities section ends here */}
            {/* Highlights section starts here */}
            <div
              className="w-full p-2 lg:p-4 flex justify-center mt-10"
              ref={(element) => addToRefs("section3", element)}
            >
              <div className="2xl:w-[80%] xl:w-[87%]  p-3 h-fit border-2 border-gray-300 rounded-xl shadow-lg bg-white">
                <div>
                  <div>
                    <h1 className="text-2xl font-semibold   border-b-2  border-gray-300 ">
                      Highlights
                    </h1>
                  </div>
                  <div className="ml-6  mt-2 flex gap-10 ">
                    <div className="">
                      <ul className="list-disc">
                        {property?.highlights
                          ?.filter((item, index) => index < (property?.highlights?.length)/2)
                          .map((highlight, index) => (
                            <li className="text-base md:text-lg leading-9 md:leading-10" key={index}>
                              {highlight}
                            </li>
                          ))}
                      </ul>
                    </div>
                    <div className="ml-10">
                      <ul className="list-disc">
                        {property?.highlights
                          ?.filter((item, index) => index >(property?.highlights?.length)/2)
                          .map((highlight, index) => (
                            <li className="text-base md:text-lg leading-9 md:leading-10" key={index}>
                              {highlight}
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Highlights section ends here */}
            {/* Neighbourhood section starts here */}
            <div
              className="w-full p-2 lg:p-4 flex justify-center mt-10"
              ref={(element) => addToRefs("section4", element)}
            >
              <div className="w-full 2xl:w-[80%] xl:w-[87%]  h-fit p-3 border-2 border-gray-300 rounded-xl shadow-lg bg-white">
                <div>
                  <div>
                    <h1 className="text-2xl font-semibold  border-b-2  border-gray-300 ">
                      Neighbourhood
                    </h1>
                  </div>
                  <div className="ml-6 mt-2 flex gap-5 ">
                    <div>
                      <ul className="list-disc">
                        {property?.neighbourhood?.map(
                          (neighbour, index) => (
                            <li className="text-base md:text-lg leading-9 md:leading-10" key={index}>
                              {neighbour}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Neighbourhood section ends here */}
            {/* Gellery section starts here */}
            <div
              className="w-full  p-2 lg:p-4 flex justify-center mt-10"
              ref={(element) => addToRefs("section5", element)}
            >
              <div className="2xl:w-[80%] xl:w-[87%]  h-fit p-6 border-2 border-gray-300 rounded-xl shadow-lg bg-white">
                <div>
                  <div>
                    <h1 className="text-2xl font-semibold  border-b-2 border-gray-300 ">
                      Gallery
                    </h1>
                  </div>
                  <div className="mt-3 p-2">
                    <Carousel
                      opts={{
                        loop: true,
                      }}
                      plugins={[
                        Autoplay({
                          delay: 4000,
                        }),
                      ]}
                    >
                      <CarouselContent>
                        {property?.gallery?.map(
                          (image, index) => (
                            <CarouselItem
                              key={index}
                              className="md:basis-1/2 lg:basis-1/3"
                            >
                              <img
                                src={image}
                                alt={`Gallery Image ${index + 1}`}
                                className="w-full lg:h-96 h-full object-cover border-2 border-gray-300 rounded-xl shadow-xl"
                              />
                            </CarouselItem>
                          )
                        )}
                      </CarouselContent>
                      <CarouselNext />
                      <CarouselPrevious />
                    </Carousel>
                  </div>
                </div>
              </div>
            </div>
            {/* Gellery section ends here */}
            {/* Video section starts here */}
            <div
              className="w-full p-2 lg:p-4 flex justify-center mt-10"
              ref={(element) => addToRefs("section6", element)}
            >
              <div className="w-full 2xl:w-[80%] xl:w-[87%]  h-fit p-3 border-2 border-gray-300 rounded-xl shadow-lg bg-white">
                <div>
                  <div>
                    <h1 className="text-2xl font-semibold  border-b-2  border-gray-300 ">
                      Videos
                    </h1>
                  </div>
                  <div className="p-2 ">
                    <iframe
                      className="w-full h-[30rem] rounded-lg"
                      src={property?.youtubeVideoUrl}
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerpolicy="strict-origin-when-cross-origin"
                      allowfullscreen
                    ></iframe>
                    
                  </div>
                </div>
              </div>
            </div>
            {/* Video section ends here */}
            {/* Map section starts here */}
            <div
              className="w-full p-2  lg:p-4 flex justify-center mt-10"
              ref={(element) => addToRefs("section7", element)}
            >
              <div className="w-full 2xl:w-[80%] xl:w-[87%]  h-fit p-3 border-2 border-gray-300 rounded-xl shadow-lg bg-white">
                <div className="">
                  <h1 className="text-2xl font-semibold  border-b-2  border-gray-300 ">
                    Map
                  </h1>

                  <div className="mt-2">
                    <iframe
                      src={property?.googleMapEmbeddedUrl}
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
            {/* Map section ends here */}
            {/* About builder section starts here */}
            <div
              className="w-full p-2 lg:p-4 flex justify-center mt-10"
              ref={(element) => addToRefs("section8", element)}
            >
              <div className="2xl:w-[80%] xl:w-[87%]  h-fit p-3 border-2 border-gray-300 rounded-xl shadow-lg bg-white">
                <div className="">
                  <h1 className="text-2xl font-semibold border-b-2 border-gray-300 ">
                    About Builder
                  </h1>

                  <div className="mt-2 ">
                    <p className="text-base md:text-lg leading-9 md:leading-10">
                      {property?.about_builder}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* About builder section ends here */}
            {/* know more form section starts here */}
            <div
              className="w-full p-2  lg:p-4   flex justify-center mt-10"
              ref={(element) => addToRefs("section9", element)}
            >
              <div className=" 2xl:w-[80%] xl:w-[87%]   h-fit p-3 border-2 border-gray-300 rounded-xl shadow-lg bg-white">
                <div className="">
                  <h1 className="text-2xl font-semibold border-b-2 border-gray-300 ">
                    Know More
                  </h1>

                  <div className="mt-2 p-5">
                    <form onSubmit={handleSubmit}>
                      <div className="mb-4">
                        <label
                          htmlFor="name"
                          className="block font-medium mb-1"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring-1 focus:ring-teal-500 appearance-none"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="mobile"
                          className="block font-medium mb-1"
                        >
                          Mobile number
                        </label>
                        <input
                          type="tel"
                          id="mobile"
                          name="mobile"
                          value={formData.mobile}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring-1 focus:ring-teal-500 appearance-none"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="email"
                          className="block font-medium mb-1"
                        >
                          Email ID
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring-1 focus:ring-teal-500 appearance-none"
                        />
                      </div>
                      <input
                        type="hidden"
                        name="propertyId"
                        value={formData.propertyId}
                      />
                      <div className="mb-4">
                        <input
                          type="checkbox"
                          name="receiveUpdates"
                          checked={formData.receiveUpdates}
                          onChange={handleInputChange}
                          className="h-4 w-4 mr-2 text-teal-500 border-gray-300 rounded"
                        />

                        <label>
                          I authorize company representatives to Call, SMS,
                          Email or WhatsApp me about its products and
                          offers.This consent overrides any registration for
                          DNC/NDNC.
                        </label>
                      </div>
                      <div className="mt-6">
                        <button
                          type="submit"
                          className="w-full bg-teal-500 hover:bg-teal-600 text-white drop-shadow-lg font-medium py-2 px-4 rounded"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            </div>
            {/* Know form section ends here */}
          </div>
        </div>
      </div>
      {/* Map dialog box starts here */}
      {map && (
        <div className="h-screen w-full  bg-black/[0.5] z-50 absolute top-0 "onClick={() => setMap(false)}>
          <div className="h-full w-full flex justify-center mt-20">
            <div className="w-[80%] h-[80%] flex justify-center items-start m-10">
              <div className="mt-2 h-full w-full ">
                <iframe
                  src={property?.googleMapEmbeddedUrl}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-[100%] h-full border-2 border-gray-300 rounded-xl"
                ></iframe>
              </div>
              <button
                onClick={() => setMap(false)}
                className="p-2 bg-teal-300/[0.8] rounded-full -mt-5 font-semibold"
              >
                <Close className="text-white " />
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Map dialog box ends here */}
      {/* Images dialog box starts here */}
      {images && (
        <div className="h-screen w-full  bg-black/[0.5] z-50 absolute top-0 " >
          <div className="h-full w-full flex justify-center mt-20">
            <div className="w-[80%] h-[80%] flex justify-center items-start m-10">
              <div className="mt-2 h-full w-full ">
                <div className="h-full w-full flex flex-col justify-center items-center mt-[8rem]">
                  <Carousel
                    opts={{
                      loop: true,
                    }}
                    plugins={[
                      Autoplay({
                        delay: 5000,
                      }),
                    ]}
                  >
                    <CarouselContent>
                      {property?.gallery?.map(
                        (image, index) => (
                          <CarouselItem key={index} className="">
                            <img
                              src={image}
                              alt={`Gallery Image ${index + 1}`}
                              className="w-full lg:h-[55rem] h-full object-cover rounded-xl shadow-lg"
                            />
                          </CarouselItem>
                        )
                      )}
                    </CarouselContent>
                    <CarouselNext />
                    <CarouselPrevious />
                  </Carousel>
                </div>
              </div>
              <button
                onClick={() => setImages(false)}
                className="p-2 bg-teal-300/[0.8] rounded-full -mt-5 font-semibold"
              >
                <Close className="text-white " />
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Images dialog box ends here */}
      {/* BrochureForm dialog box starts here */}
      {brochure && (
        <div className="h-screen w-full  bg-black/[0.5] z-50 absolute top-0">
          <div className="h-full w-full flex justify-center mt-20">
            <div className="w-[80%] h-[80%] flex justify-center items-start m-10">
              <div className="mt-2 h-full w-full ">
                <div className="h-full w-full flex flex-col justify-center items-center">
                  <div className="w-[100%] md:w-[80%] lg:w-[60%] xl:w-[50] 2xl:w-[40%]  flex p-2 border-gray-200 bg-gray-100 rounded-2xl">
                    <div className="h-full w-[60%] bg-white border-2 rounded-l-xl">
                      <div className="h-full w-full flex flex-col justify-start  items-center mt-10 ">
                        <div className="flex items-center lg:text-3xl gap-3 mt-16">
                          <div className="bg-gray-200 p-3 rounded-full shadow-xl">
                            <Description
                              className="text-teal-500 hover:text-teal-600 hover:ease-in-out duration-300 hover:scale-105"
                              sx={{ fontSize: 40 }}
                            />
                          </div>
                          <h1>Brochure</h1>
                        </div>
                        <div className="mt-10 ml-10">
                          <ul className="list-disc lg:text-xl">
                            <li>Project Overview</li>
                            <li>Floor Plans</li>
                            <li>Master Plan Layout</li>
                            <li>Location Details</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="w-[65%] ">
                      <form
                        onSubmit={handleSubmit_2}
                        className="bg-white p-5 border-2 border-gray-200 rounded-r-xl  shadow-xl"
                      >
                        <div className="mb-4">
                          <label
                            htmlFor="name"
                            className="block font-medium mb-1"
                          >
                            Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData_2.name}
                            onChange={handleInputChange_2}
                            className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring-1 focus:ring-teal-500 appearance-none"
                          />
                        </div>
                        <div className="mb-4">
                          <label
                            htmlFor="mobile"
                            className="block font-medium mb-1"
                          >
                            Mobile number
                          </label>
                          <input
                            type="tel"
                            id="mobile"
                            name="mobile"
                            value={formData_2.mobile}
                            onChange={handleInputChange_2}
                            className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring-1 focus:ring-teal-500 appearance-none"
                          />
                        </div>
                        <div className="mb-4">
                          <label
                            htmlFor="email"
                            className="block font-medium mb-1"
                          >
                            Email ID
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData_2.email}
                            onChange={handleInputChange_2}
                            className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring-1 focus:ring-teal-500 appearance-none"
                          />
                        </div>
                        <input
                          type="hidden"
                          name="propertyId"
                          value={formData_2.propertyId}
                        />
                        <div className="mb-4">
                          <input
                            type="checkbox"
                            name="receiveUpdates"
                            checked={formData_2.receiveUpdates}
                            onChange={handleInputChange_2}
                            className="h-4 w-4 mr-2 text-teal-500 border-gray-300 rounded"
                          />

                          <label className="text-clip text-xs">
                            I authorize company representatives to Call, SMS,
                            Email or WhatsApp me about its products and
                            offers.This consent overrides any registration for
                            DNC/NDNC.
                          </label>
                        </div>
                        <div className="mt-6">
                          <button
                            type="submit"
                            className="w-full bg-teal-500 hover:bg-teal-600 text-white drop-shadow-lg font-medium py-2 px-4 rounded"
                          >
                            Download Brouchure
                          </button>
                        </div>
                      </form>
                    </div>
                    <div>
                      <button
                        onClick={() => setBrochure(false)}
                        className="p-2 rounded-full -ml-10 font-semibold"
                      >
                        <Close className="text-black " />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/*BrochureForm dialog box ends here  */}
      {/* Download brochure dialog box starts here */}
      {downloadBrochure && (
        <div className="h-screen w-full  bg-black/[0.5] z-50 absolute top-0 ">
          <div className="h-full w-full flex justify-center mt-20">
            <div className="w-[80%] h-[80%] flex justify-center items-start m-10">
              <div className="mt-2 h-full w-full ">
                <div className="h-full w-full flex flex-col justify-center items-center">
                  <div className="w-[100%] md:w-[80%] lg:w-[60%] xl:w-[50] 2xl:w-[40%] flex p-2 border-gray-200 bg-gray-100 rounded-2xl">
                    <div className="h-full w-[60%] bg-white border-2 rounded-l-xl">
                      <div className="h-full w-full flex flex-col justify-start  items-center mb-10 ">
                        <div className="flex items-center lg:text-3xl gap-3 mt-10">
                          <div className="bg-gray-200 p-3 rounded-full shadow-xl">
                            <Description
                              className="text-teal-500 hover:text-teal-600 hover:ease-in-out duration-300 hover:scale-105"
                              sx={{ fontSize: 40 }}
                            />
                          </div>
                          <h1>Brochure</h1>
                        </div>
                        <div className="mt-10 ml-10">
                          <ul className="list-disc lg:text-xl">
                            <li>Project Overview</li>
                            <li>Floor Plans</li>
                            <li>Master Plan Layout</li>
                            <li>Location Details</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="w-[65%] flex flex-col justify-center items-center">
                      <div className="bg-gray-200 p-3 rounded-full shadow-xl mb-5">
                        <FileDownload
                          className="text-teal-500 hover:text-teal-600 hover:ease-in-out duration-300 hover:scale-105"
                          sx={{ fontSize: 40 }}
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-[80%] bg-teal-500 hover:bg-teal-600 text-white drop-shadow-lg font-medium py-2 px-4 rounded"
                        onClick={handleDownload}
                      >
                        Download Brouchure
                      </button>
                    </div>
                    <div>
                      <button
                        onClick={() => setDownloadBrochure(false)}
                        className="p-2 rounded-full -ml-10 font-semibold"
                      >
                        <Close className="text-black " />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* download brochure dialog box ends here */}
    </>
  );
}

export default PropertiesDetails_2;
