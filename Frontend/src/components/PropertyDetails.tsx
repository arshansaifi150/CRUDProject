import {
  ArrowForward,
  Bathtub,
  Bed,
  CurrencyRupee,
  Download,
  LocationOn,
  SquareFoot,
} from "@mui/icons-material";
import { SetStateAction, useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { Helmet } from "react-helmet";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

interface Property {
  data: SetStateAction<Property | null>;
  _id: string;
  title: string;
  price: number;
  bedrooms: string;
  bathrooms: number;
  area: string;
  amenities: string[];
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

interface FormData {
  name: string;
  mobile: string;

  email: string;
  propertyId: string;
  receiveUpdates: boolean;
}
const PropertyDetails: React.FC = () => {
  
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [property, setProperty] = useState<Property | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    mobile: "",
    email: "",
    propertyId: new URLSearchParams(location.search).get("property_id") || "",
    receiveUpdates: true,
  });

  const fetchProperty = async () => {
    try {
      const result: AxiosResponse<Property> = await axios.get(
        `http://localhost:4000/properties/${id}`
      );
      setProperty(result.data.data);
    } catch (error) {
      console.log("Unexpected Error, try again later", error);
    }
  };

  useEffect(() => {
    fetchProperty();
  }, [id]);

  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `${(price / 10000000).toFixed(1)} Cr`;
    } else {
      return `${(price / 100000).toFixed(1)} L`;
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission, e.g., send data to the server
    // Redirect to a success page or display a success message
    navigate("/success");
  };

  if (!property) {
    return (
      <>
        <div className="w-full lg:h-5/6 h-[88%] -mt-2 object-cover object-center rounded absolute brightness-75 ">
          <div className="border bg-white shadow rounded w-full">
            <div className="rounded bg-slate-200 lg:h-[755px] w-full"></div>
          </div>
        </div>
        <div className="container flex  mx-auto lg:pt-[15%] pt-[50%] relative">
          <div className="w-full grid shadow-lg grid-cols-1 md:grid-cols-2 lg:gap-20 gap-10 bg-black lg:p-10 p-5 rounded-lg bg-opacity-35 backdrop-filter backdrop-blur-sm">
            <div className="relative">
              <Carousel>
                <CarouselContent>
                  <CarouselItem>
                    <div className="flex w-full lg:gap-[3.5%]">
                      <div className="border bg-white shadow rounded p-4 w-full">
                        <div className="rounded bg-slate-200 h-[350px] w-full"></div>
                      </div>
                    </div>
                  </CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
            <div className="border bg-white shadow rounded p-4 pb-0 w-full">
              <div className="animate-pulse flex space-x-4">
                <div className="flex-1 space-y-6 py-4">
                  <div className="h-2 bg-slate-200 rounded"></div>
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                      <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                    </div>
                    <div className="h-2 bg-slate-200 rounded"></div>
                    <div className="h-2 bg-slate-200 rounded"></div>
                    <div className="h-2 bg-slate-200 rounded"></div>
                    <div className="space-y-4 pt-5">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                        <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                      </div>
                      <div className="h-2 bg-slate-200 rounded"></div>
                      <div className="h-2 bg-slate-200 rounded"></div>
                    </div>

                    <div className="space-y-4 pt-5">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                        <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                      </div>
                      <div className="h-2 bg-slate-200 rounded"></div>
                      <div className="h-2 bg-slate-200 rounded"></div>
                      <div className="h-2 bg-slate-200 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div>
      <Helmet>
       <title>{property?.title}</title>
       </Helmet>
      <img
        src={property.image}
        alt={property.title}
        className="w-full lg:h-5/6 h-[88%] -mt-2 object-cover object-center rounded absolute brightness-75 "
      />
      <div className="container mx-auto lg:pt-[15%] pt-[50%] relative">
        {/* Overview */}
        <div className="grid shadow-lg grid-cols-1 md:grid-cols-2 lg:gap-20 gap-10 bg-black lg:p-10 p-4 rounded-lg bg-opacity-35 backdrop-filter backdrop-blur-sm">
          <div className="relative">
            <Carousel>
              <CarouselContent>
                {(property.gallery || [])
                  .filter((img) => img.trim() !== "")
                  .map((img, index) => (
                    <CarouselItem key={index}>
                      <img
                        src={img}
                        alt={`Gallery Image ${index + 1}`}
                        className="w-full lg:h-96 h-full object-cover rounded shadow-lg"
                      />
                    </CarouselItem>
                  ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
            <div className="absolute bottom-4 left-4">
              <Link
                to="/contact"
                className="bg-teal-500 text-white drop-shadow-lg py-2 px-4 rounded hover:bg-teal-600"
              >
                <span className="mr-2">Enquire Now</span>
                <ArrowForward />
              </Link>
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-4 text-white drop-shadow-lg">
              {property.title}
            </h1>
            <div className="flex items-center mb-2">
              <LocationOn className="text-teal-500 mr-2" />
              <span className="text-white drop-shadow-lg">
                {property.address}
              </span>
            </div>
            <div className="flex items-center mb-2">
              <CurrencyRupee className="text-teal-500 mr-2" />
              <span className="text-white drop-shadow-lg">
                {formatPrice(property.price)}
              </span>
            </div>
            <div className="flex items-center mb-2">
              <Bed className="text-teal-500 mr-2" />
              <span className="text-white drop-shadow-lg">
                {property.bedrooms} Beds
              </span>
            </div>
            <div className="flex items-center mb-2">
              <Bathtub className="text-teal-500 mr-2" />
              <span className="text-white drop-shadow-lg">
                {property.bathrooms} Baths
              </span>
            </div>
            <div className="flex items-center mb-2">
              <SquareFoot className="text-teal-500 mr-2" />
              <span className="text-white drop-shadow-lg">{property.area}</span>
            </div>
          </div>
        </div>

        <div className="lg:mt-20 mt-16">
          <h2 className="text-2xl font-bold mb-4 text-gray-600 ">Overview</h2>
          <span className="text-gray-600"> {property.overview}</span>
        </div>

        {/* Amenities */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4 text-gray-600">Amenities</h2>
          <ul className="grid lg:grid-cols-2 gap-4">
            {(property.amenities || [])
              .filter((amenitie) => amenitie.trim() !== "")
              .map((amenitie, index) => (
                <li key={index} className="text-gray-600 flex items-center">
                  <span className="text-teal-600 mr-2 bg-teal-500 rounded-full w-7 h-7 bg-opacity-30 backdrop-filter backdrop-blur-lg items-center flex justify-center">
                    &#10003;
                  </span>
                  <span>{amenitie}</span>
                </li>
              ))}
          </ul>
        </div>

        {/* Gallery */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4 text-gray-600">Gallery</h2>
          <div className="flex flex-wrap gap-10">
            {(property.gallery || [])
              .filter((img) => img.trim() !== "")
              .map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Gallery Image ${index + 1}`}
                  className="lg:w-3/12 shadow-md rounded object-cover"
                />
              ))}
          </div>
        </div>

        {/* Property Highlights */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4 text-gray-600">
            Property Highlights
          </h2>
          <ul>
            {(property.highlights || [])
              .filter((highlight) => highlight.trim() !== "")
              .map((highlight, index) => (
                <li
                  key={index}
                  className="text-gray-600 flex items-center mt-3"
                >
                  <span>
                    <span className="mr-2">●</span>
                    {highlight}
                  </span>
                </li>
              ))}
          </ul>
        </div>

        {/* Neighbourhood */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4 text-gray-600">
            Neighbourhood
          </h2>
          <ul>
            {(property.neighbourhood || [])
              .filter((item) => item.trim() !== "")
              .map((item, index) => (
                <li
                  key={index}
                  className="text-gray-600 flex items-center mt-3"
                >
                  <span>
                    <span className="mr-2">●</span>
                    {item}
                  </span>
                </li>
              ))}
          </ul>
        </div>

        {/* Location */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4 text-gray-600">Location</h2>
          <p className="text-gray-600"></p>

          <iframe
            src={property.googleMapEmbeddedUrl}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full"
            height="400px"
          ></iframe>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4 text-gray-600">Downloads</h2>
          <a
            className="text-gray-600 flex items-center mt-6 "
            href={`/downloads/brochure/${property.downloads}`}
            download
          >
            <Download className="mr-2" />
            Product Kit
          </a>
        </div>

        {/* About the Builder */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4 text-gray-600">
            About the Builder
          </h2>
          <p className="text-gray-600">{property.about_builder}</p>
        </div>

        {/* You May Also Like */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4 text-gray-600">
            You May Also Like
          </h2>
          <p className="text-gray-600"></p>
        </div>

        {/* Get in Touch Form */}
        <div className="max-w-md bg-white p-6 rounded-lg shadow-md lg:mx-0 mx-auto mt-10">
          <h2 className="text-2xl font-bold mb-4 text-gray-600">
            Get in Touch
          </h2>
          <form onSubmit={handleSubmit}>
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
                WhatsApp me about its products and offers.This consent overrides
                any registration for DNC/NDNC.
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
  );
};

export default PropertyDetails;
