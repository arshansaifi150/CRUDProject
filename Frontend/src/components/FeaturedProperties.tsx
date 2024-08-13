import {
  ArrowForward,
  Bathtub,
  Bed,
  CurrencyRupee,
  LocationOn,
  SquareFoot,
  TrendingFlat,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

interface Property {
  _id: string;
  title: string;
  price: number;
  bedrooms: string[];
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

const FeaturedProperties = () => {
  const [properties, setProperties] = useState<Property[]>([]);

  const fetchProperties = async () => {
    try {
      const result = await axios.get(
        "http://localhost:4000/properties"
      );
      if (result.data.status == true) {
        setProperties(result.data.data.slice(0, 4));
      }
    } catch (error) {
      console.log("Unexpected Error, try again later", error);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `${(price / 10000000).toFixed(1)} Cr`;
    } else {
      return `${(price / 100000).toFixed(1)} L`;
    }
  };

  return (
    <div className="flex flex-col items-center lg:mt-[5%] tablemargin relative bg-[#F5F5F7] margin mt-10 lg:space-y-0 space-y-6 ptop">
      <div className="lg:w-9/12 w-11/12 px-2 workswidth md:w-full md:px-10 lg:px-0 lg:bg-[#f5f5f7] text-left text-gray-600 md:bg-[#f5f5f7]">
        <h1 className="text-2xl lg:text-4xl pb-5 ">Featured Properties</h1>
        <p className="text-lg">
          Discover the latest and greatest in luxury living with our collection
          of trending residential properties. Elevate your lifestyle with
          exceptional design and unmatched amenities.
        </p>
      </div>
      <div className="flex flex-wrap items-start lg:justify-start justify-center lg:w-9/12 w-11/12 px-2 lg:space-y-0 space-y-12 lg:gap-[3%] pmargin paddingtopp">
        {properties.length <= 0 && (
          <div className="flex w-full lg:gap-[3.5%] tmargin lg:pt-14 pt-6">
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
        )}

        {properties.map((property) => (
          
          
          <div key={property._id} className="propertycard w-full tmargin lg:pt-14 pt-6">
            <Link to={`/Properties/${property._id}`}>
            <div className="bg-white shadow-md hover:shadow-lg rounded hover:scale-[105%] duration-200">
              <img
                className="w-full h-52 object-cover rounded-t"
                src={`http://localhost:4000/uploads/${property?.image}`}
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
        ))}
      </div>
      <div className="py-7 lg:pb-0 lg:w-9/12 md:w-full w-10/12 lg:px-2 lg:mr-0 mr-2 emargin">
        <Link to="Properties">
          <button className="py-2 px-3 rounded bg-teal-500 hover:bg-teal-600 text-white active:scale-95 duration-100 ease-in-out ">
            <span className="pl-2 pr-1 font-semibold">Explore more</span>
            <span>
              <TrendingFlat sx={{ fontSize: 32 }} />
            </span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FeaturedProperties;
