import * as Dialog from "@radix-ui/react-dialog";
import { KeyboardArrowDown, Close } from "@mui/icons-material";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import countryList from "react-select-country-list";
import axios from "axios";

import { useEffect, useState } from "react";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  city: string;
  phoneNumber: string;
  project: string;
  receiveUpdates: boolean;
};

interface Property {
  _id: string;
  title: string;
}

const GetCallForm = (props) => {
    
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    city: "",
    phoneNumber: "",
    project: "",
    receiveUpdates: true,
  });

  const [properties, setProperties] = useState<Property[]>([]);

  const fetchProperties = async () => {
    try {
      const result = await axios.get("http://localhost:4000/properties");
      if (result.data.status === true) {
        setProperties(result.data.data);
      }
    } catch (error) {
      console.log("Unexpected Error, try again later", error);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const options = countryList().getData();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (e.target instanceof HTMLInputElement) {
      const { name, type, checked } = e.target;
      setFormData((prevState) => ({
        ...prevState,
        [name]: type === "checkbox" ? checked : e.target.value,
      }));
    } else {
      const { name, value } = e.target;
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handlePhoneNumberChange = (value: string) => {
    setFormData((prevState) => ({
      ...prevState,
      phoneNumber: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/enquiries", formData);
      resetFormData();
      alert("Enquiry form submitted successfully!");
    } catch (error) {
      console.error("Error submitting enquiry form:", error);
      alert("Error submitting enquiry form. Please try again later.");
    }
  };

  const resetFormData = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      country: "",
      city: "",
      phoneNumber: "",
      project: "",
      receiveUpdates: false,
    });
  };



  return (
    <Dialog.Root>
      <Dialog.Trigger className="hover:underline ">Get a Call</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
        <Dialog.Content className="fixed scrollb top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded shadow-lg p-6 lg:max-w-md  lh-[80%]g:mt-0 mt-4 overflow-y-auto w-11/12 z-50">
          <Dialog.Title className="text-xl font-semibold mb-4">
            Enquiry Form
          </Dialog.Title>
          <form onSubmit={handleSubmit} >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-gray-600 font-medium mb-2"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring-1 focus:ring-teal-500"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-gray-600 font-medium mb-2"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring-1 focus:ring-teal-500"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-600 font-medium mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring-1 focus:ring-teal-500"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="country"
                  className="block text-gray-600 font-medium mb-2"
                >
                  Country
                </label>
                <select
                  id="country"
                  name="country"
                  className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring-1 focus:ring-teal-500"
                  value={formData.country}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a country</option>
                  {options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="city"
                  className="block text-gray-600 font-medium mb-2"
                >
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring-1 focus:ring-teal-500"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="mobileNumber"
                  className="block text-gray-600 font-medium mb-2"
                >
                  Mobile Number
                </label>
                <PhoneInput
                  type="tel"
                  id="mobileNumber"
                  className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring-1 focus:ring-teal-500"
                  value={formData.phoneNumber}
                  onChange={handlePhoneNumberChange}
                  isValid={(value: string) => isValidPhoneNumber(value)}
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label
                  htmlFor="project"
                  className="block text-gray-600 font-medium mb-2"
                >
                  Select Project
                </label>
                <div className="relative">
                  <select
                    id="project"
                    name="project"
                    className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring-1 focus:ring-teal-500 appearance-none"
                    value={formData.project}
                    onChange={handleChange}
                  >
                    <option value="">Select a project</option>
                    {properties?.map((property) => (
                      <option key={property._id} value={property.title}>
                        {property.title}
                      </option>
                    ))}
                  </select>
                  <KeyboardArrowDown className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-600" />
                </div>
              </div>
              <div className="md:col-span-2">
                <div className="flex">
                  <input
                    type="checkbox"
                    id="receiveUpdates"
                    name="receiveUpdates"
                    className="h-4 w-4 text-teal-500 border-gray-300 rounded mt-1"
                    checked={formData.receiveUpdates}
                    onChange={handleChange}
                    required
                  />
                  <label
                    htmlFor="receiveUpdates"
                    className="ml-2 text-gray-600"
                  >
                    I authorize company representatives to Call, SMS, Email or
                    WhatsApp me about its products and offers.This consent
                    overrides any registration for DNC/NDNC.
                  </label>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="w-full bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 px-4 rounded"
              >
                Submit
              </button>
            </div>
          </form>
          <Dialog.Close className="absolute top-4 right-4 text-gray-500 hover:text-gray-600" >
            <Close />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
export default GetCallForm;
