
import React, { useState } from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "../ui/carousel"
  import { Link } from 'react-router-dom';
  import CorporateFareIcon from '@mui/icons-material/CorporateFare';
  import { Button } from '../ui/button';
  import Autoplay from "embla-carousel-autoplay"

import GetCallForm from './GetCallForm';



  


function HotSellingProperty() {

    const Images = {
        BannerImage:"https://krisumiwatersideresidences.co/img/main.jpg",
        Banner2Image:"https://waterfallresidences.krisumi.com/content/images/home-bg.jpg",
        Banner3Image:"https://www.dlfhomes.co.in/dlf-floors-phase-3-gurgaon/images/banner.webp",
    }

    const banners = [
        {
            banner :{
                backgroundImage:`url(${Images.BannerImage})`,
                backgroundSize:'cover',
                backgroundPosition: 'center',
                width:'100%',
                height:'50vh',
                
            },
            link:"Properties/6640bb0faac9dd76124aca2a",
            property:{
                name:"Krisumi Watersides Residences",
                location:"Sector 36 A Gurugram",
                price:"₹ 4.0 Cr",
                configuration:{
                    bedrooms:"2",
                    bathrooms:"2",
                    type:"Penthouse",
                    area:"1200 sqft",
                },
                
                
        
            },
        },
        {
            banner :{
                backgroundImage:`url(${Images.Banner2Image})`,
                backgroundSize:'cover',
                backgroundPosition: 'center',
                width:'100%',
                height:'100%',
            },
            link:"Properties/6640b111363a792eb8aa1a7a",
            property:{
                name:"Krisumi Waterfall Residences",
                location:"Sector 36 A Gurugram",
                price:"₹ 4.0 Cr",
                configuration:{
                    bedrooms:"2",
                    bathrooms:"2",
                    type:"Penthouse",
                    area:"1200 sqft",
                },
                
        
            },

        },
        {
            banner: {
                backgroundImage:`url(${Images.Banner3Image})`,
                backgroundSize:'cover',
                backgroundPosition: 'center',
                width:'100%',
                height:'100%',
            },
            link:"Properties/66409aad363a792eb8aa1a78",
            property:{
                name:"DLF Independent Floors",
                location:"Sector 24 Gurugram",
                price:"₹ 4.0 Cr",
                configuration:{
                    bedrooms:"3",
                    bathrooms:"3",
                    type:"Floors",
                    area:"2200 - 4200 sqft",
                },
                
        
            },
        }
    ]

    
  
const propertyDetail = [
    {
        property:{
            name:"Krisumi Watersides Residences",
            location:"Sector 36 A Gurugram",
            price:"₹ 4.0 Cr",
            configuration:{
                bedrooms:"2",
                bathrooms:"2",
                type:"Penthouse",
                area:"1200 sqft",
            },
            
            
    
        },
    },
    
    {
        property:{
        name:"Krisumi Waterfall Residences",
        location:"Sector 36 A Gurugram",
        price:"₹ 4.0 Cr",
        configuration:{
            bedrooms:"2",
            bathrooms:"2",
            type:"Penthouse",
            area:"1200 sqft",
        },
        

    },
    },  
    {
        property:{
        name:"DLF Independent Floors",
        location:"Sector 24 Gurugram",
        price:"₹ 4.0 Cr",
        configuration:{
            bedrooms:"3",
            bathrooms:"3",
            type:"Floors",
            area:"2200 - 4200 sqft",
        },
        

    },
}
]

// const [stopBigSlider,setStopBigSlider] = useState(false)
// console.log(stopBigSlider);




return(
    <>  
    <div className=' bg-gray-100 '>
<h1 className='text-gray-700 p-5  text-center text-2xl lg:text-4xl'>Trending Properties</h1>
            <div className=''>
        <div className='flex justify-center mb-10'>
        <div className='flex w-[75%] h-fit  items-center justify-center'>
    <div className={`w-[20%]  bg-white shadow-2xl {/*lg:flex lg:flex-col/*} lg:items-center lg:justify-evenly p-10 rounded-xl  hidden gap-0.5`}  >
            <CorporateFareIcon sx={{ fontSize: 100 }} className='text-teal-500 hover:text-teal-600 cursor-pointer hover:scale-95 hover:duration-500 hover:ease-in-out bg-gray-300 rounded-full p-2  shadow-md'/>
            <h1 className='text-2xl'>Best Seller in Gurugram</h1>
            <p className='text-center'>Our freshly brewed list of the best  projects from top rated builders in the country, backed by our award-winning start-to-finish services</p>  
                <Button className='w-[70%] bg-teal-500 hover:bg-teal-600 cursor-pointer hover:scale-95 hover:duration-500 hover:ease-in-out text-lg'><GetCallForm>Get Call</GetCallForm></Button>
             </div>

             


        <div className='w-[100%] md:w-[80%] h-[100%] p-1  border-gray-200 rounded-2xl flex flex-col justify-end'>
            {/* <div className='z-10 absolute ml-5 md:ml-10 mb-5 md:mb-10  md:h-fit '>
            <Carousel orientation="vertical"
            opts={{
            
                loop: true,
              }}
              plugins={[
                Autoplay({
                  delay: 5200,
                  stopOnInteraction:false,
                  stopOnFocusIn:false,
                  stopOnMouseEnter:false,
                  
                }),
                
              ]}
              className=''
            >
                <CarouselContent className='text-Black h-56 md:h-72 w-52 md:w-60 mt-1'>
                    {propertyDetail?.map((properties,index)=>(
                        <CarouselItem key={index}>
                            
                        <div className='bg-white h-56 md:h-72 md:w-60 p-3 md:p-5 rounded-xl flex flex-col justify-center gap-0.5 md:gap-1'>
                            <div className='border-2 border-teal-400 p-1 md:p-2 shadow-md rounded-xl'>
                            <p className='text-sm md:text-base font-semibold'>{properties.property.name}</p>                            
                            <p className='text-xs md:text-sm'>{properties.property.location}</p>
                            </div>
                            <div className='flex gap-2 text-sm md:text-base font-medium'>
                            <p>Bedrooms: {properties.property.configuration.bedrooms}</p>
                            <p>Bathrooms: {properties.property.configuration.bathrooms}</p>
                            </div>
                            <div className='text-sm md:text-base'>
                            <p>Area: {properties.property.configuration.area}</p>
                            <p className=''>{properties.property.configuration.type}</p>
                            <p className='text-base font-semibold'>{properties.property.price}</p>
                            </div>
                            <Button className='w-[70%] bg-teal-500 hover:bg-teal-600 cursor-pointer hover:scale-95 hover:duration-500 hover:ease-in-out text-sm md:text-lg' ><GetCallForm /></Button>
                            
                        </div>
                        
                        </CarouselItem>
                    ))}
                    
                    
                    </CarouselContent>
            </Carousel>
            </div> */}
        <Carousel className='p-3 rounded-2xl shadow-2xl' 
        opts={{
            
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 5000,
              stopOnInteraction:false,
              stopOnFocusIn:false
            }),
          ]}
        >
            
            <CarouselContent >
                {banners?.map((banner,index)=>(
                    <CarouselItem key={index} className=''>
                        
                        <div style={banner.banner} className='rounded-xl flex items-end '>
                        
                            <div className='md:h-[18rem] md:w-[15rem] bg-white ml-5 mb-5 md:flex flex-col justify-evenly p-4 rounded-2xl   hidden'>
                                <div className='py-2 px-1  rounded-2xl border-2 border-teal-400'>
                                <h1 className='md:text-lg font-semibold'>{banner?.property?.name}</h1>
                                <p>{banner?.property?.location}</p>

                                </div>
                                <div className='flex gap-1'>
                                    <p>Bedrooms: {banner?.property?.configuration?.bedrooms}</p>
                                    <p>Bathrooms: {banner?.property?.configuration?.bathrooms}</p>
                                    
                                </div>
                                <div className=''>
                                    <p>Area: {banner?.property?.configuration?.area}</p>
                                    <p>{banner?.property?.configuration?.type}</p>
                                    <h1 className='font-semibold'>Price: {banner?.property?.price}</h1>
                                </div>
                                <div>
                                <Button className='w-[70%] bg-teal-500 hover:bg-teal-600 cursor-pointer hover:scale-95 hover:duration-500 hover:ease-in-out text-sm md:text-lg' ><GetCallForm /></Button>
                                </div>
                            </div>
                        </div>
                        
                        </CarouselItem>
                ))}
                
               
                </CarouselContent>
                <CarouselPrevious className='ml-14 bg-teal-300 hover:bg-teal-500 duratioan-300 border-none'/>
            <CarouselNext className='mr-14 bg-teal-300 hover:bg-teal-500 duratioan-300 border-none' />
            
        </Carousel>
        </div>
        </div>
        </div>
        </div>
        </div>
    </>
)
  
}

export default HotSellingProperty



