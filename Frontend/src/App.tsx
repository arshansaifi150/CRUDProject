import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import Properties from "./pages/Properties";
import Career from "./pages/Career";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AOS from "aos";
import "aos/dist/aos.css";
import Disclaimer from "./components/Diclaimer";
import Privacy from "./components/Privacy";
import PropertiesDetails_2 from './pages/PropertiesDetails_2'
import Header_2 from "./components/v2_components/Header_2";
import AddPost from "./pages/AddPost";
import AllPost from "./pages/AllPost";
import EditPost from "./pages/EditPost";

import Login from "./pages/Login";

import CategoryOrPost from "./components/CategoryOrPost";
import { PostProvider } from './Context/PostContext';
import Tags from "./pages/Tags";
// import BlogPostDetails from './components/BlogPostDetail'
import ProtectedRoute from "./components/HigherOrderComponent/ProtectedRoute";
import PostDetails from "./pages/PostDetails";
import PropertiesLIstingForm from "./pages/PropertiesLIstingForm";
import EditProperty from "./pages/EditProperty";
import Sitemap from "./components/Sitemap";

AOS.init({ duration: 300, easing: "ease-in-quad" });

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        
        <Header_2/>
        <ScrollToTop />
          <PostProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Properties" element={<Properties />} />
          
          <Route path="/Properties/:id" element={<PropertiesDetails_2/>} />
          <Route path="/blogs" element={<AllPost />} />
          
          <Route path="/:slug" element={<PostDetails />} />
          <Route path="/add-post" element={
            <ProtectedRoute>
            <AddPost />
            </ProtectedRoute>} />
          
          <Route path="/Edit/:slug" element={
            <ProtectedRoute>
            <EditPost/>
            </ProtectedRoute>} />
          
          <Route path="/:param" element={<CategoryOrPost />} />
          <Route path="/tag/:tag" element={<Tags/>} />
          
          <Route path="/login" element={<Login/>} />
          <Route path="/Career" element={<Career />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Disclaimer" element={<Disclaimer />} />
          <Route path="/Privacy" element={<Privacy />} />
          <Route path="/*" element={<Home />} />
          <Route path="/Form" element={
            <ProtectedRoute>
            <PropertiesLIstingForm/>
            </ProtectedRoute>
            }/>
          <Route path="/EditProperty/:id" element={
            <ProtectedRoute>
            <EditProperty/>
            </ProtectedRoute>
            }/>
            <Route path="/sitemap.xml" element={<Sitemap/>}/> 

        </Routes>
          </PostProvider>
        
        <Footer />
        
      </div>
      <ToastContainer />
    </Router>
  );
}

export default App;
