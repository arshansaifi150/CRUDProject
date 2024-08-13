import * as Dialog from "@radix-ui/react-dialog";
import { Close } from "@mui/icons-material";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import axios from "axios";
import { useEffect, useState } from "react";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  project: string;
  receiveUpdates: boolean;
  date: string;
  time: string;
};

interface Property {
  _id: string;
  title: string;
}

const Visit = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    project: "",
    receiveUpdates: true,
    date: new Date().toISOString().split("T")[0],
    time: "10:00",
  });

  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
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
    fetchProperties();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, type, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
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
      await axios.post("http://localhost:4000/visits", formData);
      console.log("Form submitted successfully!");
      resetFormData();
    } catch (error) {
      console.error("Failed to submit form:", error);
      alert("Error submitting the form. Please try again later.");
    }
  };

  const resetFormData = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      project: "",
      receiveUpdates: false,
      date: new Date().toISOString().split("T")[0], // Reset date
      time: "10:00", // Reset time
    });
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger className="hover:underline">
        Schedule A Site Visit
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
        <Dialog.Content className="fixed scrollb top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded shadow-lg p-6 lg:max-w-md h-[80%] lg:mt-0 mt-4 overflow-y-auto w-11/12 z-50">
          <Dialog.Title className="text-xl font-semibold mb-4 text-center">
            SCHEDULE A TOUR TODAY
          </Dialog.Title>
          <p className="text-gray-600 text-sm text-center mb-6">
            Fill in the following details and we will get back to you shortly.
          </p>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-4 md:grid-cols-2"
          >
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

            <div className="md:col-span-2">
              <label
                htmlFor="email"
                className="block text-gray-600 font-medium mb-2"
              >
                Email ID
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

            <div className="md:col-span-2">
              <label
                htmlFor="mobileNumber"
                className="block text-gray-600 font-medium mb-2"
              >
                Mobile number
              </label>
              <PhoneInput
                type="tel"
                id="mobileNumber"
                className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring-1 focus:ring-teal-500"
                value={formData.phoneNumber}
                onChange={handlePhoneNumberChange}
                required
              />
            </div>

            <div>
              <label
                htmlFor="date"
                className="block text-gray-600 font-medium mb-2"
              >
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring-1 focus:ring-teal-500"
                value={formData.date}
                onChange={(e) =>
                  setFormData((prevState) => ({
                    ...prevState,
                    date: e.target.value,
                  }))
                }
                required
              />
            </div>

            <div>
              <label
                htmlFor="time"
                className="block text-gray-600 font-medium mb-2"
              >
                Time
              </label>
              <input
                type="time"
                id="time"
                name="time"
                className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring-1 focus:ring-teal-500"
                value={formData.time}
                onChange={(e) =>
                  setFormData((prevState) => ({
                    ...prevState,
                    time: e.target.value,
                  }))
                }
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
                  {properties.map((property) => (
                    <option key={property._id} value={property.title}>
                      {property.title}
                    </option>
                  ))}
                </select>
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
                <label htmlFor="receiveUpdates" className="ml-2 text-gray-600">
                  I authorize company representatives to Call, SMS, Email or
                  WhatsApp me about its products and offers.This consent
                  overrides any registration for DNC/NDNC.
                </label>
              </div>
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 px-4 rounded"
              >
                SUBMIT
              </button>
            </div>
          </form>
          <Dialog.Close className="absolute top-4 right-4 text-gray-500 hover:text-gray-600">
            <Close />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Visit;
