import { Link } from "react-router-dom";
import { PinContainer } from "./ui/3d-pin";

const locations = [
  {
    name: "Delhi",
    image:
      "https://www.trawell.in/admin/images/upload/078212929Delhi_India_Gate_Main.jpg",
  },
  {
    name: "Gurugram",
    image:
      "https://media.istockphoto.com/id/1416839998/photo/dlf-cyber-city-in-gurgaon.jpg?s=2048x2048&w=is&k=20&c=_rDZmsN77JRhIhP-WzGzzaMNXVcgmwRMKI2vt3Y6CeI=",
  },
  {
    name: "Mumbai",
    image:
      "https://media.istockphoto.com/id/1226021105/photo/taj-mahal-palace-hotel-in-mumbai.jpg?s=2048x2048&w=is&k=20&c=xFZnomNWMlWNxY3HqughrKX73aLA-CA0hCrG74uL9yA=",
  },
  {
    name: "Goa",
    image:
      "https://media.istockphoto.com/id/1171584518/photo/dona-paula-cape-viewpoint-goa.jpg?s=2048x2048&w=is&k=20&c=_nxfFBswy9Tm0FeGCavbSIdjFkK1LD244Wzo0KgbhQ4=",
  },
  {
    name: "Dubai",
    image: "https://4kwallpapers.com/images/walls/thumbs_3t/6548.jpg",
  },
];

const Locations = () => {
  return (
    <div className="flex flex-col items-center mt-[12%] lg:mt-[16%] md:mt-[12%] xl:mt-10 tabmargin">
      <div className="lg:w-9/12 w-11/12 px-2  lg:bg-[#f5f5f7] text-left xl:py-[2%] text-gray-600 lg:mb-0 mb-3">
        <h1 className="text-2xl lg:text-4xl pb-5 ">
          Find Properties by Location
        </h1>
        <p className="text-lg">
          Explore properties in your desired locations - our platform connects
          you to the perfect real estate opportunities.
        </p>
      </div>
      <div className="flex flex-wrap xl:px-[3.1%] items-center justify-center w-full lg:gap-[1%] lg:space-y-0 space-y-5">
        {locations.map((location, index) => (
          <PinContainer
            key={index}
            title={location.name}
            href={`/properties/${location.name.toLowerCase()}`}
          >
            <Link to={`/properties?location=${location.name}`}>
              <div
                className="flex flex-col p-4 tracking-tight text-white sm:basis-1/2 lg:w-[20rem] lg:h-[19rem] w-[19.4rem] h-[18.5rem] bg-cover bg-center rounded"
                style={{ backgroundImage: `url(${location.image})` }}
              >
                <h3 className="max-w-xs !pb-2 !m-0 font-bold text-base rounded">
                  {location.name}
                </h3>
              </div>
            </Link>
          </PinContainer>
        ))}
      </div>
    </div>
  );
};

export default Locations;
