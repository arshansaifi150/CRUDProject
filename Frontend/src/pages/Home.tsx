import Background from "../components/Background";
import Works from "../components/Works";
import Locations from "../components/Locations";
import Reviews from "../components/Reviews";
import { Helmet } from "react-helmet";
// import Partners from "./Partners";
import FeaturedProperties from "../components/FeaturedProperties";
import HotSellingProperty from "../components/v2_components/HotSellingProperty";
import Partners_2 from "../components/v2_components/Partners_2";
import Founders_2 from "../components/v2_components/Founders_2";
import BackGround_2 from "../components/v2_components/BackGround_2";
import CounterCard from "../components/CounterCard";
const Home = () => {
  return (
    <div className="flex flex-col">
      <Helmet>
       <title>Home</title>
       </Helmet>
      <Background />
      {/* <BackGround_2/> */}
      
      <HotSellingProperty/>
      <CounterCard/>
      <FeaturedProperties />
      <Works />
      <Locations />
      <Reviews />
      {/* <Partners/> */}
      <Partners_2/>
      <Founders_2/>
    </div>
  );
};

export default Home;
