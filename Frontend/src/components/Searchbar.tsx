import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Slider } from "@mui/material";

interface Option {
  value: string;
  label: string;
}

const SearchBar: React.FC = () => {
  const [propertyType, setPropertyType] = useState<string | undefined>(
    undefined
  );
  const [locationType, setLocationType] = useState<string | undefined>(
    undefined
  );
  const [bedrooms, setBedrooms] = useState<string | undefined>(undefined);
  const [priceRange, setPriceRange] = useState<number[]>([0, 400000000]);
  const [types, setTypes] = useState<string | undefined>(undefined);

  const locationTypeOptions: Option[] = [
    { value: "Any", label: "Any" },
    { value: "Delhi", label: "Delhi" },
    { value: "Gurugram", label: "Gurugram" },
    { value: "Mumbai", label: "Mumbai" },
    { value: "Goa", label: "Goa" },
    { value: "Dubai", label: "Dubai" },
  ];

  const propertyTypeOptions: Option[] = [
    { value: "Any", label: "Any" },
    { value: "Residential", label: "Residential" },
    { value: "Commercial", label: "Commercial" },
  ];

  const bedroomOptions: Option[] = [
    { value: "any", label: "Any" },
    { value: "1", label: "1 Bedroom" },
    { value: "2", label: "2 Bedroom" },
    { value: "3", label: "3 Bedroom" },
    { value: "4", label: "4 Bedroom" },
    { value: "Penthouse", label: "Penthouse" },
  ];

  const typeOptions: Option[] = [
    { value: "Any", label: "Any" },
    { value: "low-rise", label: "Low Rise" },
    { value: "high-rise", label: "High Rise" },
  ];

  const navigate = useNavigate();

  const handleSearch = () => {
    const isFilterApplied =
      locationType !== undefined ||
      propertyType !== undefined ||
      bedrooms !== undefined ||
      priceRange[0] !== 0 ||
      priceRange[1] !== 400000000 ||
      types !== undefined;

    if (!isFilterApplied) {
      toast.error("Please apply at least one filter!", {
        position: "bottom-right",
        autoClose: 5000,
        theme: "light",
        hideProgressBar: true,
        closeOnClick: true,
      });
      return;
    }

    // Construct the URL with query parameters
    const queryParams = new URLSearchParams();

    if (locationType !== undefined) {
      queryParams.set("location", locationType);
    }

    if (propertyType !== undefined) {
      queryParams.set("type", propertyType);
    }

    if (bedrooms !== undefined) {
      queryParams.set("bedrooms", bedrooms);
    }

    if (priceRange[0] !== 0) {
      queryParams.set("minPrice", priceRange[0].toString());
    }

    if (priceRange[1] !== 400000000) {
      queryParams.set("maxPrice", priceRange[1].toString());
    }

    if (types !== undefined) {
      queryParams.set("types", types);
    }

    const url = `/properties?${queryParams.toString()}`;
    navigate(url);
  };

  return (
    <div className="flex flex-wrap bg-white text-gray-600 rounded pt-6 p-4  shadow-2xl lg:shadow-lg mt-14 items-center">
      {/* Location Dropdown */}
      <div className="mr-4 mb-4 sm:mb-0 space-y-3 text-left w-full sm:w-auto pr-2">
        <div className="text-gray-600 text-sm">LOCATION</div>
        <Select
          value={locationType}
          onValueChange={(value: string | undefined) =>
            setLocationType(value as string | undefined)
          }
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Any" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {locationTypeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Property Type Dropdown */}
      <div className="mr-4 mb-4 sm:mb-0 space-y-3 text-left w-full sm:w-auto pr-2">
        <div className="text-gray-600 text-sm">PROPERTY TYPE</div>
        <Select
          value={propertyType}
          onValueChange={(value: string | undefined) =>
            setPropertyType(value as string | undefined)
          }
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Any" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {propertyTypeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Bedroom Dropdown */}
      <div className="mr-4 mb-4 sm:mb-0 space-y-3 text-left w-full sm:w-auto matp pr-2">
        <div className="text-gray-600 text-sm">BEDROOMS</div>
        <Select
          value={bedrooms}
          onValueChange={(value: string | undefined) =>
            setBedrooms(value as string | undefined)
          }
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Any" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {bedroomOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="mr-4 sm:mb-0 space-y-3 text-left lg:w-60 w-full matp pr-2">
        <div className="text-gray-600 text-sm">PRICE RANGE</div>
        <Slider
          value={priceRange}
          min={0}
          onChange={(_, value: number | number[]) =>
            setPriceRange(value as number[])
          }
          max={400000000}
          step={1}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) =>
            value >= 10000000
              ? `${(value / 10000000).toFixed(1)} Cr`
              : `${(value / 100000).toFixed(1)} L`
          }
          className="w-full !text-teal-500"
        />
      </div>

      <div className="mb-4 sm:mb-0 space-y-3 text-left lg:w-60 w-full matpty">
        <div className="text-gray-600 text-sm">TYPES</div>
        <Select
          value={types}
          onValueChange={(value: string | undefined) =>
            setTypes(value as string | undefined)
          }
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Any" />
          </SelectTrigger>
          <SelectContent className="w-full sm:w-[180px]">
            <SelectGroup>
              {typeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Search Button */}
      <div className="mt-4 py-2 sm:mt-0 w-full sm:w-auto">
        <button
          className="bg-teal-500 margint py-2 text-white font-medium px-7 rounded-lg hover:bg-teal-600 text-[16px] active:scale-95 duration-100 ease-in-out w-full sm:w-auto"
          onClick={handleSearch}
        >
          Search Properties
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
