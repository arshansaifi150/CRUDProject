import { useState, useRef, useEffect } from "react";
import { Close, Menu, Phone } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [menu, setMenu] = useState(false);
  const menuRef = useRef<HTMLInputElement>(null);
  const location = useLocation();

  const getmLinkClass = (path: string) => {
    const isActive =
      location.pathname === path || location.pathname.startsWith(path + "/");
    return `${isActive ? "text-white" : "text-gray-200"}`;
  };

  const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as Node;
    if (menuRef.current && !menuRef.current.contains(target)) {
      setMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menu]);

  return (
    <div className="w-full items-center flex flex-col">
      <nav
        data-aos="fade"
        className="fixed  z-20 bg-opacity-35 backdrop-filter backdrop-blur-lg bg-black flex justify-between items-center w-screen lg:px-16 px-5 py-4 "
      >
        <Link to="/">
          <img className="w-40 -ml-2" src="/img/logo-white.png" alt="Logo" />
        </Link>

        <div className="space-x-10 hidden lg:flex items-center">
          <Link
            className={`${getmLinkClass("/")}`}
            onClick={() => setMenu(false)}
            to="/"
          >
            Home
          </Link>

          <Link
            className={`${getmLinkClass("/Properties")}`}
            onClick={() => setMenu(false)}
            to="/Properties"
          >
            Properties
          </Link>
          <Link
            className={`${getmLinkClass("/Blogs")}`}
            onClick={() => setMenu(false)}
            to="/Blogs"
          >
            Blogs
          </Link>
          <Link
            className={`${getmLinkClass("/Career")}`}
            onClick={() => setMenu(false)}
            to="/Career"
          >
            Career
          </Link>
          <Link
            className={`${getmLinkClass("/About")}`}
            onClick={() => setMenu(false)}
            to="/About"
          >
            About us
          </Link>
          <Link
            className={`${getmLinkClass(
              "/Contact"
            )} bg-teal-500 text-white rounded py-2 ml-12 text-[16px]`}
            onClick={() => setMenu(false)}
            to="/Contact"
          >
            <span className="pl-4 pr-2">
              <Phone />
            </span>
            <span className="pr-7">GET IN TOUCH</span>
          </Link>
        </div>
        <span className="text-white lg:hidden" onClick={() => setMenu(true)}>
          {menu ? (
            <Close sx={{ fontSize: 30 }} />
          ) : (
            <Menu sx={{ fontSize: 30 }} />
          )}
        </span>
      </nav>

      <div
        ref={menuRef}
        className={`lg:hidden bg-opacity-30 backdrop-filter backdrop-blur-lg fixed text-white text-lg left-0 top-0 w-[70vw] lg:w-[22vw] z-10 h-full bg-[#121212] duration-200 transform shadow-lg ${
          menu ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Link
          to="/"
          className=" flex items-center cursor-pointer p-4 space-x-4  pb-5"
        >
          <img className="w-40" src="/img/logo-white.png" alt="Logo" />
        </Link>
        <div className="flex flex-col p-4 pt-2 space-y-4">
          <Link
            className={`${getmLinkClass("/")}`}
            onClick={() => setMenu(false)}
            to="/"
          >
            Home
          </Link>

          <Link
            className={`${getmLinkClass("/Properties")}`}
            onClick={() => setMenu(false)}
            to="/Properties"
          >
            Properties
          </Link>
          <Link
            className={`${getmLinkClass("/Blogs")}`}
            onClick={() => setMenu(false)}
            to="/Blogs"
          >
            Blogs
          </Link>
          <Link
            className={`${getmLinkClass("/Career")}`}
            onClick={() => setMenu(false)}
            to="/Career"
          >
            Career
          </Link>
          <Link
            className={`${getmLinkClass("/About")}`}
            onClick={() => setMenu(false)}
            to="/About"
          >
            About us
          </Link>

          <Link
            className={`${getmLinkClass(
              "/Contact"
            )} bg-teal-500 text-white rounded py-2 text-[16px]`}
            onClick={() => setMenu(false)}
            to="/Contact"
          >
            <span className="pl-4 pr-2">
              <Phone />
            </span>
            <span>GET IN TOUCH</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
