import { url } from 'inspector'
import { Link, useNavigate } from 'react-router-dom'
import ApartmentIcon from '@mui/icons-material/Apartment';
import HouseIcon from '@mui/icons-material/House';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Close, Search } from '@mui/icons-material';
import '@fortawesome/fontawesome-free/css/all.css';
import React, { useEffect, useRef, useState } from 'react'
import mainPic from '/img/main.webp'
import SearchBar from '../Searchbar'
import SeachBox from './SeachBox';
import axios, { AxiosResponse } from 'axios';

interface Property {
  _id: string;
  title: string;
  price: number;
  bedrooms: [];
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


function BackGround() {

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

  // const [placeholder,setPlaceholder] = useState('')


  const places = [
    {
      name: "Gurugram"
    },
    {
      name: "Dubai"
    },
    {
      name: "Delhi"
    },
    {
      name: "Mumbai"
    },
    {
      name: "Goa"
    },
  ]

  return (
    <div className='w-full h-[70vh]'>
      <div className='w-full h-full flex flex-shrink-0 flex-col justify-center items-center ' style={{ backgroundImage: `url(${mainPic})`, backgroundPositionY: '-200px' }}>
        <div className='flex flex-col w-[60%]  items-center gap-5 mt-20'>
          <div className='text-white text-center'>
            <h1 className='text-6xl'>Welcome to Symbiosis Infra</h1>
            <h1 className='text-6xl'>Redefining Luxury Living in Gurugram</h1>
            <p className='text-lg mt-5'>Dive into alternative markets with us and set your capital on the path of unparalleled growth.</p>
          </div>
          <div className='w-[55%] z-10'>
            <div className="bg-white w-[100%] justify-center gap-1
             py-5 -mb-10 mt-5 flex md:flex md:justify-evenly  md:items-center md:flex-wrap md:flex-row md:gap-5 rounded-xl md:px-10 lg:py-5 lg:pb-1 ">
              {/* //bigIcon */}
              <Link to={'#'}>
                <div className="md:flex md:flex-col md:items-center text-black  cursor-pointer hover:scale-110 hover:duration-300 hover:ease-in-out hidden" ><ApartmentIcon className="text-teal-500 hover:text-teal-600  "
                  sx={{ fontSize: 40 }} /><div className="text-lg text-wrap">New Projects</div></div>
              </Link>
              {/* //small screen icon */}
              <Link to={'#'}>
                <div className="flex flex-col items-center text-black  cursor-pointer hover:scale-110 hover:duration-300 hover:ease-in-out md:hidden " ><ApartmentIcon className="text-teal-500 hover:text-teal-600  "
                  sx={{ fontSize: 25 }} /><div className="text-sm ">New Projects</div></div>
              </Link>
              {/* //bigIcon */}
              <Link to={'/Properties'}>
                <div className="md:flex md:flex-col md:items-center text-black  cursor-pointer hover:scale-110 hover:duration-300 hover:ease-in-out hidden"><ShoppingCartIcon className="text-teal-500 hover:text-teal-600 "
                  sx={{ fontSize: 40 }} /><div className="text-lg ">Buy Properties</div></div>
              </Link>
              {/* //small screen icon */}
              <Link to={'/Properties'}>
                <div className="flex flex-col items-center text-black  cursor-pointer hover:scale-110 hover:duration-300 hover:ease-in-out md:hidden"><ShoppingCartIcon className="text-teal-500 hover:text-teal-600 "
                  sx={{ fontSize: 25 }} /><div className="text-sm ">Buy Properties</div></div>
              </Link>
              {/* Big Icon */}
              <Link to={'/properties?type=Residential'}>
                <div className="md:flex md:flex-col md:items-center text-black  cursor-pointer hover:scale-110 hover:duration-300 hover:ease-in-out hidden"><HouseIcon className="text-teal-500 hover:text-teal-600 "
                  sx={{ fontSize: 40 }} /><div className="text-lg">Residential Properties</div></div>
              </Link>
              {/* small screen Icon */}
              <Link to={'/properties?type=Residential'}>
                <div className="flex flex-col items-center text-black  cursor-pointer hover:scale-110 hover:duration-300 hover:ease-in-out md:hidden"><HouseIcon className="text-teal-500 hover:text-teal-600 "
                  sx={{ fontSize: 25 }} /><div className="text-sm">Residential Properties</div></div>
              </Link>

              {/* BigIcon */}
              <Link to={"/properties?type=Commercial"}>
                <div className="md:flex md:flex-col md:items-center text-black  cursor-pointer hover:scale-110 hover:duration-300 hover:ease-in-out hidden"><CorporateFareIcon className="text-teal-500 hover:text-teal-600 "
                  sx={{ fontSize: 40 }} /><div className="text-lg">Commercial Properties</div></div>
              </Link>
              {/* small screen Icon */}
              <Link to={"/properties?type=Commercial"}>
                <div className="flex flex-col items-center text-black  cursor-pointer hover:scale-110 hover:duration-300 hover:ease-in-out md:hidden"><CorporateFareIcon className="text-teal-500 hover:text-teal-600 "
                  sx={{ fontSize: 25 }} /><div className="text-sm">Commercial Properties</div></div>
              </Link>


            </div>
          </div>
          <div className='w-[80%]'>
            <div>

              <div className="bg-black bg-opacity-50 py-8 rounded-3xl text-center ">
                <div className="">
                  <div className="" >


                    <select name="" id="" className=" md:p-2  bg-white rounded-l-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-teal-500 mr-1 pr-1">
                      {places?.map((place, index) => (
                        <option value={place.name} key={index} className="rounded-lg focus:bg-teal-500" >
                          {place.name}
                        </option>

                      ))}
                    </select>



                    <input
                      ref={searchInputRef}
                      className="p-2  md:w-[70%] lg:w-9/12 w-full outline-none rounded-r-lg text-gray-600 lg:text-lg focus:outline-none focus:ring-2 focus:ring-teal-500 "
                      placeholder={`Search properties by name, location, builder, or features....`}
                      type="text"
                      value={searchTerm}
                      onChange={handleSearchTermChange}
                      onKeyDown={handleKeyDown}
                    />

                    <Search className="-ml-10 text-gray-600 m-3 " />

                    {searchTerm.trim() !== "" && (
                      <span className="absolute px-2 py-2 pb-[5.5px] textfoun-gray-300 top-0 lg:right-[12rem] right-0 ">
                        <Close onClick={handleClearSearch} />
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col justify-center items-center w-full">
                    {showDropdown && (
                      <div className="flex justify-center">
                        <div className="absolute p-2 lg:pl-5  lg:w-9/12 rounded-md lg:text-[17px] text-[15px] mt-2 w-full bg-white text-left border shadow-lg md:ml-20">
                          {filteredProperties.length > 0 ? (
                            filteredProperties.map((property, index) => (
                              <div
                                className={`py-2 px-4 rounded space-x-2 hover:bg-gray-100 cursor-pointer text-gray-600 flex items-center ${selectedIndex === index
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
              </div>

            </div>

          </div>

          <div>
            <SearchBar />

          </div>
        </div>
      </div>
    </div>
  );
}
export default BackGround;