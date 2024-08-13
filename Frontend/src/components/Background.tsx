import { Search, Close } from "@mui/icons-material";
import { useState, useEffect, useRef } from "react";
import { AxiosResponse } from "axios";
import axios from "axios";
import SearchBar from "./Searchbar";
import { Link, useNavigate } from "react-router-dom";

interface Property {
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

const Home2 = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const fetchProperties = async () => {
    try {
      const result: AxiosResponse<{ data: Property[] }> = await axios.get(
        "http://localhost:4000/properties"
      );
      setProperties(result.data.data);
    } catch (error) {
      console.log("Unexpected Error, try again later", error);
    }
  };

  useEffect(() => {
    fetchProperties();
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  const handleSearchTermChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    setSelectedIndex(-1);

    if (searchTerm.trim() === "") {
      setFilteredProperties([]);
      setShowDropdown(false);
    } else {
      const filtered = properties.filter((property) =>
        [
          property.title?.toLowerCase(),
          property.address?.toLowerCase(),
          property.location?.toLowerCase(),
          property.price?.toString(),
          property.bedrooms?.toString(),
          property.bathrooms?.toString(),
          property.area?.toLowerCase(),
          ...(property.amenities?.map((amenity) => amenity.toLowerCase()) ||
            []),
          property.propertyType?.toLowerCase(),
          property.types?.toLowerCase(),
          ...(property.highlights?.map((highlight) =>
            highlight.toLowerCase()
          ) || []),
          ...(property.neighbourhood?.map((neighborhood) =>
            neighborhood.toLowerCase()
          ) || []),
        ].some((field) => field?.includes(searchTerm))
      );
      setFilteredProperties(filtered);
      setShowDropdown(true);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (showDropdown && filteredProperties.length > 0) {
      switch (event.key) {
        case "ArrowUp":
          setSelectedIndex((prevIndex) =>
            prevIndex > 0 ? prevIndex - 1 : filteredProperties.length - 1
          );
          break;
        case "ArrowDown":
          setSelectedIndex((prevIndex) =>
            prevIndex < filteredProperties.length - 1 ? prevIndex + 1 : 0
          );
          break;
        case "Enter":
          if (selectedIndex !== -1) {
            const selectedProperty = filteredProperties[selectedIndex];
            navigate(`/Properties/${selectedProperty._id}`);
          }
          break;
      }
    }
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setFilteredProperties([]);
    setShowDropdown(false);
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const navigate = useNavigate();

  return (
    <div className="w-full flex justify-center text-white mb-5">
      <img
        data-aos="fade"
        className="h-screen md:h-[60vh] w-screen absolute overflow-hidden object-cover"
        src="/img/main.webp"
        alt="Background-Image"
      />
      <div className="lg:mt-[11%] md:mt-[18%] mt-[40%] text-center flex flex-col items-center w-11/12 lg:w-full">
        <p
          data-aos="fade"
          data-aos-delay="200"
          className="text-3xl lg:text-6xl md:mt-4 lg:mt-10"
        >
          Welcome to <span className="font-medium">Symbiosis Infra</span>
        </p>
        <p
          data-aos="fade"
          data-aos-delay="300"
          className="text-3xl lg:text-6xl mt-3"
        >
          Redefining Luxury Living in Gurugram
        </p>
        <div data-aos="fade" data-aos-delay="400" className="mt-7 lg:text-xl">
          <div className="flex justify-center">
            <p className="w-11/12 px-2 md:px-0 mt-5">
              Dive into alternative markets with us and set your capital on the
              path of unparalleled growth.
            </p>
          </div>
          <br />
          <div className="flex justify-center">
            <div className="relative mt-4 w-full">
              <span className="absolute px-2 py-2 pb-[5.5px] border-r text-gray-500 ">
                <Search />
              </span>
              <input
                ref={searchInputRef}
                className="p-2 pl-12 lg:w-9/12 w-full outline-none rounded-lg text-gray-600 lg:text-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Search properties by name, location, builder, or features...."
                type="text"
                value={searchTerm}
                onChange={handleSearchTermChange}
                onKeyDown={handleKeyDown}
              />
              {searchTerm.trim() !== "" && (
                <span className="absolute px-2 py-2 pb-[5.5px] textfoun-gray-300 top-0 lg:right-[11rem] right-0 ">
                  <Close onClick={handleClearSearch} />
                </span>
              )}
              {showDropdown && (
                <div className="flex justify-center">
                  <div className="absolute p-2 lg:pl-5 z-10 lg:w-9/12 rounded-md lg:text-[17px] text-[15px] mt-2 w-full bg-white text-left border shadow-lg">
                    {filteredProperties.length > 0 ? (
                      filteredProperties.map((property, index) => (
                        <div
                          className={`py-2 px-4 rounded space-x-2 hover:bg-gray-100 cursor-pointer text-gray-600 flex items-center ${
                            selectedIndex === index
                              ? "bg-gray-100 font-medium"
                              : ""
                          }`}
                          key={property._id}
                        >
                          <img
                            src={property.image}
                            alt={property.title}
                            className="w-10 h-10 object-cover bg-center mr-2 rounded"
                          />
                          <Link to={`/Properties/${property._id}`}>
                            <p>{property.title}</p>
                          </Link>
                        </div>
                      ))
                    ) : (
                      <div className="py-2 px-4 rounded text-gray-600">
                        No results found
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          <SearchBar />
        </div>
      </div>
    </div>
  );
};

export default Home2;