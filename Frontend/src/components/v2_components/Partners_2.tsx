import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

import AutoScroll from "embla-carousel-auto-scroll";

function Partners_2() {
  return (
    <>
      <div
        className="p-5 w-full h-[40rem] flex flex-col items-center justify-center  gap-3 mt-10
      "
      >
        <div>
          <h1 className="text-xl md:text-3xl lg:text-5xl text-gray-600 ">Our Partners</h1>
        </div>
        <div>
          <p className="text-lg lg:text-2xl text-gray-500">
            We've built a network of trusted partners to deliver exceptional
            properties and unrivaled service in the real estate market
          </p>
        </div>
        {/* <div className="border-2 border-gray-300 rounded-xl shadow-2xl"> */}
        <div className=" mt-10 w-full">
          <Carousel
            opts={{
              loop: true,
              
            }}
            plugins={[
              AutoScroll({
                direction: "backward",
                stopOnInteraction: false,
                stopOnFocusIn: false
              }),
            ]}
          >
            <CarouselContent >
              <CarouselItem className="md:basis-1/3 lg:basis-1/4">
                <img className="h-[8rem] w-[14rem]" src="/img/partners/tata.png" alt="Tata" />
              </CarouselItem>
              <CarouselItem className="md:basis-1/3 lg:basis-1/4">
                <img className="h-[8rem] w-[14rem]" src="/img/partners/birla.png" alt="Birla" />
              </CarouselItem>
              <CarouselItem className="md:basis-1/3 lg:basis-1/4">
                <img className="h-[8rem] w-[14rem]" src="/img/partners/dlf.png" alt="DLF" />
              </CarouselItem>
              <CarouselItem className="md:basis-1/3 lg:basis-1/4">
                <img className="h-[8rem] w-[14rem]" src="/img/partners/emaar.png" alt="Emaar" />
              </CarouselItem>
              <CarouselItem className="md:basis-1/3 lg:basis-1/4">
                <img className="" src="/img/partners/godrej.png" alt="Godrej" />
              </CarouselItem>

            </CarouselContent>
            {/* <CarouselPrevious />
            <CarouselNext /> */}
          </Carousel>
        </div>
        <div className="mb-5 -mt-10 w-full">
          <Carousel
            opts={{
              loop: true,
            }}
            plugins={[
              AutoScroll({
                direction: "forward",
                stopOnInteraction: false,
                stopOnFocusIn: false
              }),
            ]}
          >
            <CarouselContent>
              <CarouselItem className="md:basis-1/3 lg:basis-1/4">
                <img className="h-[8rem] w-[14rem]" src="/img/partners/krisumi.png" alt="Krisumi" />
              </CarouselItem>
              <CarouselItem className="md:basis-1/3 lg:basis-1/4">
                <img className="h-[8rem] w-[14rem]" src="/img/partners/mahindra.png" alt="Mahindra" />
              </CarouselItem>
              <CarouselItem className="md:basis-1/3 lg:basis-1/4">
                <img className="h-[8rem] w-[14rem]" src="/img/partners/microtek.png" alt="Microtek" />
              </CarouselItem>
              <CarouselItem className="md:basis-1/3 lg:basis-1/4">
                <img className="h-[8rem] w-[14rem]" src="/img/partners/peaceful.png" alt="Peaceful" />
              </CarouselItem>
              <CarouselItem className="md:basis-1/3 lg:basis-1/4">
                <img className="h-[8rem] w-[14rem]" src="/img/partners/signature.png" alt="Signature" />
              </CarouselItem>

            </CarouselContent>
            {/* <CarouselPrevious />
            <CarouselNext /> */}
          </Carousel>
          </div>
        {/* </div> */}
      </div>
    </>
  );
}

export default Partners_2;
