"use client";
import  {  useState } from "react";
import Logo from "./ui/logo.tsx";
import { useLocation, Link } from "react-router-dom";
import clsx from "clsx";
import { List, X } from "lucide-react";
import { useDeviceType } from "../useDeviceType.ts";
import '../App.css';


const Navbar1 = () => {
  const location = useLocation();
  const [isMenuOpen, setisMenuOpen] = useState(false);
  const Device = useDeviceType();
  const handleMenu = () => {
    setisMenuOpen(!isMenuOpen);
  };
  
  
  return (
    <>
      <div className="flex items-center sticky top-0 z-10 bg-white justify-between  pl-1 md:pl-8 border-b-0 shadow-blue-150 md:p-3 shadow-md  ">
        <Logo />
        <div className="flex item-center absolute md:relative right-20 top-0  justify-between  md:mr-0">
          <button
            className={clsx(
              "md:hidden absolute top-3 z-10 left-7 md:relative ",
              {
                "left-12 bg-red-600 ": isMenuOpen,
              }
            )}
            onClick={handleMenu}
          >
            {isMenuOpen ? <X /> : <List />}
          </button>

          {isMenuOpen && Device == "mobile" && (
            <ul className="flex flex-col  bg-gray-50 px-2  z-5  pt-10 pb-2  left-[-96px] md:relative md:flex-row absolute  items-center justify-end  list-none font-bold cursor-pointer gap-3 md:gap-30 ">
              <Link
                to="/Dashboard"
                className={clsx(
                  "btn btn-ghost btn-info w-40 md:w-auto p-1  md:p-4 font-bold md:text-xl text-sm rounded-0 md:rounded-2xl ",
                  {
                    "hover:text-white bg-blue-800 text-white":
                      location.pathname === "/Home",
                  }
                )}
              >
                User
              </Link>

              <Link
                to="/Dashboard/events"
                className={clsx(
                  "btn btn-soft btn-info  w-40 md:w-auto  p-1 md:p-4 font-bold md:text-xl text-sm rounded-0 md:rounded-2xl",
                  {
                    "hover:text-white bg-blue-800 text-white":
                      location.pathname === "/Etudiant",
                  }
                )}
              >
                Events
              </Link>

              <Link
                to="/Dashboard/announcements"
                className={clsx(
                  "btn btn-soft btn-info w-40 md:w-auto p-1 md:p-4 font-bold md:text-xl text-sm rounded-0 md:rounded-2xl",
                  {
                    "hover:text-white bg-blue-800 text-white py-0":
                      location.pathname === "/A%propos",
                  }
                )}
              >
                Announcements
              </Link>
            </ul>
          )}
          {Device != "mobile" && (
            <ul className="flex   flex-row   items-center justify-end  list-none font-bold cursor-pointer  gap-10 ">
              <Link
                to="/Dashboard"
                className={clsx(
                  "btn btn-ghost btn-info w-40 md:w-auto p-1  md:p-4 font-bold md:text-xl text-sm rounded-0 md:rounded-2xl",
                  {
                    "hover:text-white  text-white":
                      location.pathname == "/Dashboard/events",
                  }
                )}
              >
                User
              </Link>

              <Link
                to="/Dashboard/events"
                className={clsx(
                  "btn btn-ghost btn-info w-40 md:w-auto  p-1 md:p-4 font-bold md:text-xl text-sm rounded-0 md:rounded-2xl",
                  {
                    "hover:text-white bg-blue-800 text-white":
                      location.pathname === "/Dashboard/events",
                  }
                )}
              >
                Events
              </Link>

              <Link
                to="/Dashboard/annoucements"
                className={clsx(
                  "btn btn-ghost btn-info w-40 md:w-auto p-1 md:p-4 font-bold md:text-xl text-sm rounded-0 md:rounded-2xl",
                  {
                    "hover:text-white bg-blue-800 text-white py-0":
                      location.pathname === "/Dashboard/announcements",
                  }
                )}
              >
                Announcements
              </Link>
            </ul>
          )}
        </div>
        
      </div>
    </>
  );
};

export default Navbar1;
