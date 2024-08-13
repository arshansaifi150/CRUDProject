//@ts-nocheck
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { AcUnit, Business, ChangeCircle, ChildCare, ContentCut, Deck, DirectionsBike, ElderlyWoman, Elevator, Help, House, Kitchen, Language, LocalCafe, LocalGasStation, LocalGroceryStore, LocalLibrary, LocalParking, LocalPharmacy, MeetingRoom, Pets, Pool, Restaurant, Security, Spa, SportsGymnastics, SportsHandball, Videocam, WaterDrop,Commit, FireHydrantAlt, YardRounded } from '@mui/icons-material'
import { FireExtinguisher, Wifi } from 'lucide-react'

function EditProperty() {
  const navigate = useNavigate()
  const { id } = useParams()

  const amenitiesList = [
    { name: "Air Conditioning", icon: <AcUnit />, iconName: "AcUnit" },
    { name: "Alarm System", icon: <Security />, iconName: "Security" },
    { name: "Banquet Room", icon: <Restaurant />, iconName: "Restaurant" },
    { name: "Car Parking", icon: <LocalParking />, iconName: "LocalParking" },
    { name: "Coffee Shop and Bakery", icon: <LocalCafe />, iconName: "LocalCafe" },
    { name: "Dedicated Private Staff Room", icon: <MeetingRoom />, iconName: "MeetingRoom" },
    { name: "Free WiFi", icon: <Wifi />, iconName: "Wifi" },
    { name: "Fully Fitted kitchen", icon: <Kitchen />, iconName: "Kitchen" },
    { name: "Gym", icon: <SportsGymnastics />, iconName: "SportsGymnastics" },
    { name: "Internet", icon: <Language />, iconName: "Language" },
    { name: "Library and Reading Room", icon: <LocalLibrary />, iconName: "LocalLibrary" },
    { name: "Pets Area", icon: <Pets />, iconName: "Pets" },
    { name: "Resident Helpdesk", icon: <Help />, iconName: "Help" },
    { name: "Restaurant and Bar", icon: <Restaurant />, iconName: "Restaurant" },
    { name: "Spa & Massage", icon: <Spa />, iconName: "Spa" },
    { name: "Swimming Pool", icon: <Pool />, iconName: "Pool" },
    { name: "Business Lounge", icon: <Business />, iconName: "Business" },
    { name: "Changing Area", icon: <ChangeCircle />, iconName: "ChangeCircle" },
    { name: "High Speed Elevators", icon: <Elevator />, iconName: "Elevator" },
    { name: "Piped Gas", icon: <Commit />, iconName: "Commit" },
    { name: "Creche/Day care", icon: <ChildCare />, iconName: "ChildCare" },
    { name: "Gazebo", icon: <Deck />, iconName: "Deck" },
    { name: "Grocery Shop", icon: <LocalGroceryStore />, iconName: "LocalGroceryStore" },
    { name: "Fire Sprinklers", icon: <FireHydrantAlt />, iconName: "FireHydrantAlt" },
    { name: "Badminton Court", icon: <SportsHandball />, iconName: "SportsHandball" },
    { name: "24x7 CCTV Surveillance", icon: <Videocam />, iconName: "Videocam" },
    { name: "Salon", icon: <ContentCut />, iconName: "ContentCut" },
    { name: "24X7 Water Supply", icon: <WaterDrop />, iconName: "WaterDrop" },
    { name: "Medical Store/Pharmacy", icon: <LocalPharmacy />, iconName: "LocalPharmacy" },
    { name: "Senior Citizen Siteout", icon: <ElderlyWoman />, iconName: "ElderlyWoman" },
    { name: "Cycling & Jogging Track", icon: <DirectionsBike />, iconName: "DirectionsBike" },
    { name: "Club House", icon: <House />, iconName: "House" },
    { name: "Terrace Garden", icon: <YardRounded />, iconName: "YardRounded" }
  ];

  const bedroomOptions = [
    "1 BHK",
    "2 BHK",
    "3 BHK",
    "4 BHK",
    "5 BHK",
    "Penthouse"
  ];

  const [propertyData, setPropertyData] = useState({
    title: "",
    price: "",
    bedrooms: [],
    bathrooms: "",
    area: "",
    amenities: [],
    gallery: [],
    location: "",
    propertyType: "",
    googleMapEmbeddedUrl: "",
    highlights: [],
    about_builder: "",
    address: "",
    overview: "",
    image: "",
    neighbourhood: [],
    downloads: "",
    types: "",
    youtubeVideoUrl: ""
  })
  const [newImage, setNewImage] = useState(null)
  const [newGalleryImages, setNewGalleryImages] = useState([])

  useEffect(() => {
    const getPreviousProperty = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/properties/${id}`)
        setPropertyData(response.data.data)
      } catch (error) {
        console.log("error", error)
      }
    }
    getPreviousProperty()
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData()

      Object.keys(propertyData).forEach(key => {
        if (key !== 'image' && key !== 'gallery' && key !== 'amenities') {
          if (Array.isArray(propertyData[key])) {
            propertyData[key].forEach(item => formData.append(`${key}[]`, item))
          } else {
            formData.append(key, propertyData[key])
          }
        }
      })

      propertyData.amenities.forEach((amenity, index) => {
        formData.append(`amenities[${index}][name]`, amenity.name)
        formData.append(`amenities[${index}][icon]`, amenity.icon)
      })

      if (newImage) {
        formData.append('image', newImage)
      }

      propertyData.gallery.forEach((img, index) => {
        formData.append(`existingGallery[]`, img)
      })

      newGalleryImages.forEach(file => {
        formData.append('gallery', file)
      })

      await axios.put(`http://localhost:4000/properties/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      navigate('/properties')
    } catch (error) {
      console.log("Error: ", error)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setPropertyData(prev => ({ ...prev, [name]: value }))
  }

  const handleArrayInputChange = (e) => {
    const { name, value } = e.target
    setPropertyData(prev => ({ ...prev, [name]: value.split(',') }))
  }

  const handleAmenityChange = (e) => {
    const { value, checked } = e.target
    const [name, iconName] = value.split(',')
    setPropertyData(prev => ({
      ...prev,
      amenities: checked
        ? [...prev.amenities, { name, icon: iconName }]
        : prev.amenities.filter(a => a.name !== name)
    }))
  }

  const MAX_FILE_SIZE = 500 * 1024; // 500KB in bytes

  const handleFeaturedImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        alert(`File size exceeds 500KB. Please choose a smaller file.`);
        e.target.value = ''; // Reset the input
      } else {
        setNewImage(file);
      }
    }
  };

  const handleGalleryImagesChange = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(file => {
      if (file.size > MAX_FILE_SIZE) {
        alert(`File "${file.name}" exceeds 500KB and will not be uploaded.`);
        return false;
      }
      return true;
    });
  
    setNewGalleryImages(prev => [...prev, ...validFiles]);
  };

  const removeGalleryImage = (index) => {
    setPropertyData(prev => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== index)
    }))
  }

  const removeNewGalleryImage = (index) => {
    setNewGalleryImages(prev => prev.filter((_, i) => i !== index))
  }

  const handleBedroomChange = (e) => {
    const { value, checked } = e.target;
    setPropertyData(prev => ({
      ...prev,
      bedrooms: checked
        ? [...prev.bedrooms, value]
        : prev.bedrooms?.filter(item => item !== value)
    }));
  };

  // console.log(propertyData)
  return (
    <div className='mt-20 w-full min-h-screen flex justify-center'>
      <div className='w-[80%] bg-gray-300 flex justify-center p-8'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-5 justify-center w-full'>
          <div className='flex flex-col gap-5'>
            <label className='text-lg font-bold' htmlFor='title'>
              Title:
              <input type="text" name="title" id='title' value={propertyData.title} onChange={handleInputChange} className='w-full p-2 mt-1' />
            </label>
            <label className='text-lg font-bold' htmlFor='price'>
              Price:
              <input type="number" name="price" id='price' value={propertyData.price} onChange={handleInputChange} className='w-full p-2 mt-1' />
            </label>
            <label className='text-lg font-bold' htmlFor='bedrooms'>
              Bedrooms:
              {/* <input type="text" name="bedrooms" id='bedrooms' value={propertyData.bedrooms} onChange={handleInputChange} className='w-full p-2 mt-1' /> */}
              {bedroomOptions.map((option) => (
                <div key={option} className='flex items-center'>
                  <input
                    type="checkbox"
                    id={`bedroom-${option}`}
                    name="bedrooms"
                    value={option}
                    checked={propertyData.bedrooms.includes(option)}
                    onChange={handleBedroomChange}
                    className='mr-2'
                  />
                  <label htmlFor={`bedroom-${option}`}>{option}</label>
                </div>
              ))}
            </label>
            {/* <label className='text-lg font-bold' htmlFor='bathrooms'>
              Bathrooms:
              <input type="text" name="bathrooms" id='bathrooms' value={propertyData.bathrooms} onChange={handleInputChange} className='w-full p-2 mt-1' />
            </label> */}
            <label className='text-lg font-bold' htmlFor='area'>
              Area:
              <input type="text" name="area" id='area' value={propertyData.area} onChange={handleInputChange} className='w-full p-2 mt-1' />
            </label>
            <label className='text-lg font-bold' htmlFor='location'>
              Location:
              <input type="text" name="location" id="location" value={propertyData.location} onChange={handleInputChange} className='w-full p-2 mt-1' />
            </label>
            {/* <label className='text-lg font-bold' htmlFor='propertyType'>
              Property Type:
              <input type="text" name="propertyType" id="propertyType" value={propertyData.propertyType} onChange={handleInputChange} className='w-full p-2 mt-1' />
            </label> */}
            <label className='text-lg font-bold' htmlFor='propertyType'>
              Types:
              <select
                name="propertyType"
                id='propertyType'
                value={propertyData.propertyType}
                onChange={handleInputChange}
                className='w-full p-2 mt-1'
              >
                <option value="">Select Type</option>
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
              </select>
            </label>
            <label className='text-lg font-bold' htmlFor='youtubeVideoUrl'>
              Youtube Video Embed Url:
              <input type="text" name="youtubeVideoUrl" id="youtubeVideoUrl" value={propertyData.youtubeVideoUrl} onChange={handleInputChange} className='w-full p-2 mt-1' />
            </label>
            <label className='text-lg font-bold' htmlFor='googleMapEmbeddedUrl'>
              Google Map Embedded Url:
              <input type="text" name="googleMapEmbeddedUrl" id="googleMapEmbeddedUrl" value={propertyData.googleMapEmbeddedUrl} onChange={handleInputChange} className='w-full p-2 mt-1' />
            </label>
            <label className='text-lg font-bold' htmlFor='about_builder'>
              About Builder:
              <textarea name="about_builder" id="about_builder" value={propertyData.about_builder} onChange={handleInputChange} className='w-full p-2 mt-1' />
            </label>
            <label className='text-lg font-bold' htmlFor='address'>
              Address:
              <input type="text" name="address" id="address" value={propertyData.address} onChange={handleInputChange} className='w-full p-2 mt-1' />
            </label>
            <label className='text-lg font-bold' htmlFor='overview'>
              Overview:
              <textarea name="overview" id="overview" value={propertyData.overview} onChange={handleInputChange} className='w-full p-2 mt-1' />
            </label>
            <label className='text-lg font-bold' htmlFor='downloads'>
              Brochure Pdf:
              <input type="text" name="downloads" id="downloads" value={propertyData.downloads} onChange={handleInputChange} className='w-full p-2 mt-1' />
            </label>
            <label className='text-lg font-bold' htmlFor='types'>
              Types:
              {/* <input type="text" name="types" id='types' value={propertyData.types} onChange={handleInputChange} className='w-full p-2 mt-1' /> */}
              <label className='text-lg font-bold' htmlFor='types'>
                Types:
                <select
                  name="types"
                  id='types'
                  value={propertyData.types}
                  onChange={handleInputChange}
                  className='w-full p-2 mt-1'
                >
                  <option value="">Select Type</option>
                  <option value="High-Rise">High-Rise</option>
                  <option value="Low-Rise">Low-Rise</option>
                </select>
              </label>
            </label>
          </div>

          <div className='flex flex-col gap-5'>
            <label className='text-lg font-bold'>
              Amenities:
              <div className='grid grid-cols-2 gap-2 mt-2'>
                {amenitiesList.map((amenity) => (
                  <div key={amenity.name} className='flex items-center'>
                    <input
                      type="checkbox"
                      id={amenity.name}
                      name="amenities"
                      value={`${amenity.name},${amenity.iconName}`}
                      checked={propertyData.amenities.some(a => a.name === amenity.name)}
                      onChange={handleAmenityChange}
                      className='mr-2'
                    />
                    <label htmlFor={amenity.name} className='flex items-center'>
                      {React.cloneElement(amenity.icon, { className: 'mr-1' })}
                      {amenity.name}
                    </label>
                  </div>
                ))}
              </div>
            </label>
            <label className='text-lg font-bold' htmlFor="highlights">
              Highlights:
              <textarea name="highlights" id="highlights" value={propertyData.highlights.join(',')} onChange={handleArrayInputChange} className='w-full p-2 mt-1' />
            </label>
            <label className='text-lg font-bold' htmlFor="neighbourhood">
              Neighbourhood:
              <textarea name="neighbourhood" id="neighbourhood" value={propertyData.neighbourhood.join(',')} onChange={handleArrayInputChange} className='w-full p-2 mt-1' />
            </label>
          </div>

          <div>
            <label className='text-lg font-bold' htmlFor="featuredImage">
            Featured Image: (Max 500KB)
            </label>
            {propertyData.image && <img src={propertyData.image} alt="Featured" className='w-32 h-32 object-cover mt-2' />}
            <input type="file" name="image" id="featuredImage" onChange={handleFeaturedImageChange} className='mt-2' accept="image/*" 
            
            />
            {newImage && <img src={URL.createObjectURL(newImage)} alt="New Featured" className='w-32 h-32 object-cover mt-2' />}
          </div>

          <div>
            <label className='text-lg font-bold' htmlFor="gallery">
              Existing Gallery:
            </label>
            <div className='flex flex-wrap gap-2 mt-2'>
              {propertyData.gallery.map((img, index) => (
                <div key={index} className='relative'>
                  <img src={img} alt={`Gallery ${index}`} className='w-32 h-32 object-cover' />
                  <button type="button" onClick={() => removeGalleryImage(index)} className='absolute top-0 right-0 bg-red-500 text-white p-1'>X</button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className='text-lg font-bold' htmlFor="newGallery">
            Add New Gallery Images: (Max 500KB each)
            </label>
            <input type="file" name="newGallery" id="newGallery" multiple onChange={handleGalleryImagesChange} className='mt-2' accept="image/*" />
            <div className='flex flex-wrap gap-2 mt-2'>
              {newGalleryImages.map((file, index) => (
                <div key={index} className='relative'>
                  <img src={URL.createObjectURL(file)} alt={`New Gallery ${index}`} className='w-32 h-32 object-cover' />
                  <button type="button" onClick={() => removeNewGalleryImage(index)} className='absolute top-0 right-0 bg-red-500 text-white p-1'>X</button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <button type="submit" className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>Update Property</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditProperty