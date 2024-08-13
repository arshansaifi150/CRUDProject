import {
  ArrowForward,
  Bathtub,
  Bed,
  CurrencyRupee,
  LocationOn,
  SquareFoot,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

interface Property {
  _id: string;
  title: string;
  price: number;
  bedrooms: String[];
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

const Properties = () => {
  const navigate = useNavigate()
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProperties = async () => {
    try {
      const result = await axios.get(
        "http://localhost:4000/properties"
      );
      if (result.data.status == true) {
        setProperties(result.data.data);
        setLoading(false);
      }
    } catch (error) {
      console.log("Unexpected Error, try again later", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [loading]);

  const filterProperties = (properties: Property[]) => {
    return properties.filter((property) => {
      const conditions = [
        !queryParams.has("location") ||
          property.location === queryParams.get("location")?.toString(),
        !queryParams.has("type") ||
          property.propertyType === queryParams.get("type")?.toString(),
        !queryParams.has("bedrooms") ||
          property.bedrooms.toString() ===
            queryParams.get("bedrooms")?.toString(),
        !queryParams.has("minPrice") ||
          parseInt(queryParams.get("minPrice") || "0") <= property.price,
        !queryParams.has("maxPrice") ||
          parseInt(queryParams.get("maxPrice") || "0") >= property.price,
        !queryParams.has("types") ||
          property.types === queryParams.get("types")?.toString(),
      ];

      return conditions.every((condition) => condition);
    });
  };


  const filteredProperties = filterProperties(properties);

  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `${(price / 10000000).toFixed(1)} Cr`;
    } else {
      return `${(price / 100000).toFixed(1)} L`;
    }
  };

  const isLoggedIn = !!localStorage.getItem('jwtToken')

  const handleLogout = ()=>{
    localStorage.removeItem('jwtToken')
    navigate('/login')
  }

  return (
    <>
      {isLoggedIn && (
        <>
          <div className="h-[7vh] bg-black bg-opacity-50 w-full mt-20">
            <div className="w-full h-full flex justify-between  items-center p-3 text-xl text-white">
              <div></div>
              <div className="flex gap-4 ">
                <a href={"/Form"}>
                  <h1 className="px-5 py-2 bg-orange-600 rounded-xl">
                    Add Property
                  </h1>
                </a>
                <h1
                  className="px-5 py-2 bg-orange-600 rounded-xl cursor-pointer"
                  onClick={handleLogout}
                >
                  LogOut{" "}
                </h1>
              </div>
            </div>
          </div>
        </>
      )}
    <div className="flex flex-col items-center lg:mt-[5%] tablemargin relative bg-[#F5F5F7] margin mt-10 lg:space-y-0 space-y-6 ">
      <Helmet>
       <title>Properties</title>
       </Helmet>
      <div className="lg:w-9/12 w-11/12 px-2 workswidth md:w-full md:px-10 lg:px-0 lg:bg-[#f5f5f7] text-left xl:py-[3%] text-gray-600 md:bg-[#f5f5f7]">
        <h1 className="text-2xl lg:text-4xl pb-5 mt-16 md:mt-8 mmargin">
          Properties{" "}
          {queryParams.get("location") && `in ${queryParams.get("location")}`}
        </h1>
        <p className="text-lg">
          Check our luxurious living spaces thoughtfully designed for modern
          lifestyles. Explore our premium residences and diverse real estate
          portfolio for the latest trends or timeless elegance to suit your
          discerning taste.
        </p>
      </div>
      <div className="flex flex-wrap items-start lg:justify-start justify-center lg:w-9/12 w-11/12 px-2 lg:-space-y-0 space-y-12 lg:gap-[3%]">
        {loading ? (
          <div className="flex w-full lg:gap-[3.5%]">
            <div className="lg:block hidden border bg-white shadow rounded p-4 pb-0  w-full">
              <div className="rounded bg-slate-200 h-48 w-full"></div>
              <div className="animate-pulse flex space-x-4">
                <div className="flex-1 space-y-6 py-10">
                  <div className="h-2 bg-slate-200 rounded"></div>
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                      <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                    </div>
                    <div className="h-2 bg-slate-200 rounded"></div>
                    <div className="h-2 bg-slate-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:block hidden border bg-white shadow rounded p-4 pb-0 w-full">
              <div className="rounded bg-slate-200 h-48 w-full"></div>
              <div className="animate-pulse flex space-x-4">
                <div className="flex-1 space-y-6 py-10">
                  <div className="h-2 bg-slate-200 rounded"></div>
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                      <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                    </div>
                    <div className="h-2 bg-slate-200 rounded"></div>
                    <div className="h-2 bg-slate-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="border bg-white shadow rounded p-4 pb-0 w-full">
              <div className="rounded bg-slate-200 h-48 w-full"></div>
              <div className="animate-pulse flex space-x-4">
                <div className="flex-1 space-y-6 py-10">
                  <div className="h-2 bg-slate-200 rounded"></div>
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                      <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                    </div>
                    <div className="h-2 bg-slate-200 rounded"></div>
                    <div className="h-2 bg-slate-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : filteredProperties?.length > 0 ? (
          filteredProperties.map((property) => (
            <div key={property._id} className="propertycard w-full paddingtopp">
              <Link to={`/Properties/${property._id}`}>
              <div className="bg-white shadow-md hover:shadow-lg rounded hover:scale-[105%] duration-200">
                <img
                  className="w-full h-52 object-cover rounded-t"
                  src={property?.image}
                  alt={property.title}
                />
                <div className="p-4">
                  <h4 className="text-gray-600 font-bold tracking-wide">
                    {property.title}
                  </h4>
                  <p className="mt-2 text-gray-500 tracking-wide leading-relaxed text-sm">
                    {property.overview?.split(" ").slice(0, 25).join(" ")}...
                  </p>
                  <div className="flex items-center mt-4">
                    <LocationOn className="text-gray-500 mr-2" />
                    <span className="text-gray-500 font-semibold">
                      {property.location}
                    </span>
                  </div>
                  <div className="flex items-center mt-2">
                    <Bed className="text-gray-500 mr-2" />
                    <span className="text-gray-500 font-semibold mr-4">
                      {property?.bedrooms?.map((bedroom,index)=>(
                         <span key={index}>{bedroom} </span>
                      ))}
                    </span>
                    <Bathtub className="text-gray-500 mr-2" />
                    <span className="text-gray-500 font-semibold">
                      {property.bathrooms} Bathrooms
                    </span>
                  </div>
                  <div className="flex items-center mt-2">
                    <SquareFoot className="text-gray-500 mr-2" />
                    <span className="text-gray-500 font-semibold">
                      {property.area}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex items-center mt-2">
                      <CurrencyRupee className="text-gray-500 mr-2" />
                      <span className="text-gray-500 font-semibold">
                        {formatPrice(property.price)}
                      </span>
                    </div>
                    <Link
                      to={`/Properties/${property._id}`}
                      className="bg-teal-500 text-white rounded p-[1.8%]"
                    >
                      <span className="pl-2 pr-1">View</span>
                      <span>
                        <ArrowForward sx={{ fontSize: 20 }} />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
              </Link>
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center">
            <h3 className="text-gray-500 text-lg">No properties found.</h3>
          </div>
        )}
      </div>
    </div>
    </>
  );

};

export default Properties;