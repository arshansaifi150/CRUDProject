import { Close, Menu, Phone } from '@mui/icons-material';
import React, { useState,useRef } from 'react'
import { Link,NavLink } from 'react-router-dom'

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';


function Header_2() {

  const [menu, setMenu] = useState(false);
  const menuRef = useRef<HTMLInputElement>(null);
  
  return (
    <>
    <div className='w-full fixed  z-20 bg-opacity-35 backdrop-filter backdrop-blur-lg bg-black p-2' id='Header'>
      <nav className='flex justify-between items-center'>
      <div>
      <Link to="/">
          <img className="w-40 ml-10" src="/img/logo-white.png" alt="Logo" />
        </Link>
      </div>
      <div className=' cursor-pointer hidden lg:block'>
        
        <ul className="flex space-x-10 text-lg">
        <NavLink to={'/'} className={({isActive})=> isActive? 'text-teal-300 ':'text-white '}>
        <li className="text-white hover:text-teal-500 duration-300 ease-in-out">Home</li>
        </NavLink>
        <NavLink to={'/Properties'}>
        
        <li className="relative group text-white hover:text-teal-500 duration-300 ease-in-out">
          Cities <ArrowDropDownIcon className='text-white -ml-1 hover:text-teal-500 duration-300 ease-in-out '/>
          <ul className="absolute left-0 hidden  space-y-2  bg-opacity-35 backdrop-filter backdrop-blur-lg bg-black
          group-hover:block rounded-b-lg p-3">
            <Link to={'/properties?location=Gurugram'}>
            <li className="p-2 text-white hover:bg-teal-500 rounded-lg ">Gurugram</li>
            </Link>
            <Link to={'/properties?location=Delhi'} >
            <li className="p-2 text-white hover:bg-teal-500 rounded-lg">Delhi</li>
            </Link>
            <Link to={'/properties?location=Dubai'} >
            <li className="p-2 text-white hover:bg-teal-500 rounded-lg">Dubai</li>
            </Link>
            <Link to={'/properties?location=Mumbai'} >
            <li className="p-2 text-white hover:bg-teal-500 rounded-lg">Mumbai</li>
            </Link>
            <Link to={'/properties?location=Goa'} >
            <li className="p-2 text-white hover:bg-teal-500 rounded-lg">Goa</li>
            </Link>
          </ul>
        </li>
        </NavLink>
        <NavLink to={'/Properties'}>
        
        <li className="relative group text-white hover:text-teal-500 duration-300 ease-in-out">
          Projects <ArrowDropDownIcon className='text-white -ml-1 hover:text-teal-500 duration-300 ease-in-out '/>
          <ul className="absolute left-0 hidden  space-y-2  bg-opacity-35 backdrop-filter backdrop-blur-lg bg-black
          group-hover:block rounded-b-lg w-[20rem] p-3">
            <div className='flex'>
              <div>
              <Link to={'/Properties/6640bb0faac9dd76124aca2a'}>
            <li className="p-2 text-white hover:bg-teal-500 text-md rounded-lg">Krisumi Watersides Residences</li>
            </Link>
            <Link to={'/Properties/6640b111363a792eb8aa1a7a'}>
            <li className="p-2 text-white hover:bg-teal-500 text-md rounded-lg">Krisumi Waterfall Residences</li>
            </Link>
            <Link to={'/Properties/66409aad363a792eb8aa1a78'}>
            <li className="p-2 text-white hover:bg-teal-500 text-md rounded-lg">DLF Independent Floors</li>
            </Link>
            </div>
            <div>
              <Link to={'/Properties/66408f49363a792eb8aa1a76'}>
            <li className="p-2 text-white hover:bg-teal-500 text-md rounded-lg">DLF Privana</li>
            </Link>
            <Link to={'/Properties/66408629363a792eb8aa1a72'}>
            <li className="p-2 text-white hover:bg-teal-500 text-md rounded-lg">Godrej Aristocrat</li>
            </Link>
            <Link to={'/Properties/6638b6d5cf0c700c2c1622ad'}>
            <li className="p-2 text-white hover:bg-teal-500 text-md rounded-lg">Paras Quartier</li>
            </Link>
            </div>
            </div>
          </ul>
        </li>
        </NavLink>
        <NavLink to={'/properties'}>
        <li className="text-white hover:text-teal-500 duration-300 ease-in-out">Properties</li>
        </NavLink>
        <NavLink to={'/blogs'}>
        <li className="text-white hover:text-teal-500 duration-300 ease-in-out">Blog</li>
        </NavLink>
        <NavLink to={'/Career'} className={({isActive})=> isActive? 'text-teal-500 ':'text-white '}>
        <li className="text-white hover:text-teal-500 duration-300 ease-in-out">Career</li>
        </NavLink>
        <NavLink to={'/About'}>
        <li className="text-white hover:text-teal-500 duration-300 ease-in-out">About us</li>
        </NavLink>
      </ul>
      </div>
      <div className='hidden lg:block'>
      <Link
            
            onClick={() => setMenu(false)}
            to="/Contact"
          >
            <div className='bg-teal-400 w-fit py-2 mr-5 rounded-lg hover:bg-teal-500 duration-300 ease-in-out'>
            <span className="pl-4 pr-2 text-white">
              <Phone className=''/>
            </span>
            <span className="pr-7 text-white">GET IN TOUCH</span>
            </div>
          </Link>
      </div>
      <span className="text-white lg:hidden" onClick={() => setMenu((prev)=>!prev)}>
          {menu ? (
            <Close sx={{ fontSize: 30 }} />
          ) : (
            <Menu sx={{ fontSize: 30 }} />
          )}
        </span>
      </nav>
    </div>
    <div
        ref={menuRef}
        className={` lg:hidden bg-opacity-30 backdrop-filter backdrop-blur-lg fixed text-white text-lg left-0 top-0 w-[70vw] lg:w-[22vw] z-10 h-full bg-[#121212] duration-200 transform shadow-lg ${
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
            
            onClick={() => setMenu(false)}
            to="/"
            className='hover:text-teal-400'
          >
            Home
          </Link>

          <Link
            
            onClick={() => setMenu(false)}
            to="/Properties"
          >
            Properties
          </Link>
          <Link
            
            onClick={() => setMenu(false)}
            to="/Blogs"
          >
            Blogs
          </Link>
          <Link
            
            onClick={() => setMenu(false)}
            to="/Career"
          >
            Career
          </Link>
          <Link
            
            onClick={() => setMenu(false)}
            to="/About"
          >
            About us
          </Link>

          <Link
            
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

    </>
  )
}

export default Header_2