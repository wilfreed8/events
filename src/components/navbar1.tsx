"use client";
import  { useContext, useState } from "react";
import Logo from "./ui/logo.tsx";
import { useLocation, Link } from "react-router-dom";
import clsx from "clsx";
import { List, X } from "lucide-react";
import { useDeviceType } from "../useDeviceType.ts";
import "../App.css";
import { AppContext } from "../Context/AppProvider.tsx";


const Navbar1 = () => {
  const location = useLocation();
  const [isMenuOpen, setisMenuOpen] = useState(false);
  const Device = useDeviceType();
  const handleMenu = () => {
    setisMenuOpen(!isMenuOpen);
  };
  const { user } = useContext(AppContext);

  return (
    <>
      <div className="flex items-center sticky top-0 z-10 bg-accent justify-between  pl-1 md:pl-8 border-b-0 shadow-blue-150 p-2 shadow-md  ">
        <Logo />
        <div className="flex item-center absolute md:relative right-20 top-0 justify-items-start  md:mr-0">
          {Device == "mobile" && (
            <div className="relative bg-accent flex w-screen ">
              <button
                className={clsx("md:hidden absolute  z-10  md:relative ", {
                  "left-12 bg-red-600 ": isMenuOpen,
                })}
                onClick={handleMenu}
              >
                {isMenuOpen ? <X /> : <List />}
              </button>
              <ul className="flex flex-col  bg-gray-50 px-2  z-5  pt-10 pb-2  left-[-96px] md:relative md:flex-row absolute  items-center justify-end  list-none font-bold cursor-pointer gap-3 md:gap-30 ">
                <Link
                  to="/Home"
                  className={clsx(
                    "btn btn-ghost btn-info w-40 md:w-auto p-1  md:p-4 font-bold md:text-xl text-sm rounded-0 md:rounded-2xl ",
                    {
                      "hover:text-white bg-blue-800 text-white":
                        location.pathname === "/Home",
                    }
                  )}
                >
                  Home
                </Link>

                <Link
                  to="/Events"
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
                  to="/Announcements"
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
            </div>
          )}
          {Device != "mobile" && (
            <ul className="flex   flex-row   items-center justify-end  list-none font-bold cursor-pointer  gap-10 ">
              <Link
                to="/Home"
                className={clsx(
                  "btn btn-ghost btn-info w-40 md:w-auto p-1  md:p-4 font-bold md:text-xl text-sm rounded-0 md:rounded-2xl",
                  {
                    "hover:text-white bg-blue-800 text-white":
                      location.pathname === "/Home",
                  }
                )}
              >
                Home
              </Link>

              <Link
                to="/Events"
                className={clsx(
                  "btn btn-ghost btn-info w-40 md:w-auto  p-1 md:p-4 font-bold md:text-xl text-sm rounded-0 md:rounded-2xl",
                  {
                    "hover:text-white bg-blue-800 text-white":
                      location.pathname === "/events",
                  }
                )}
              >
                Events
              </Link>

              <Link
                to="/Announcements"
                className={clsx(
                  "btn btn-ghost btn-info w-40 md:w-auto p-1 md:p-4 font-bold md:text-xl text-sm rounded-0 md:rounded-2xl",
                  {
                    "hover:text-white bg-blue-800 text-white py-0":
                      location.pathname === "/announcements",
                  }
                )}
              >
                Announcements
              </Link>
            </ul>
          )}
        </div>
        {user ? (
          <div>
            <p className="font-semibold text-sm ">
              Welcome Back{" "}
              <i className="text-blue-500 md:text-xl font-bold uppercase md:mx-2">
                {user.name}
              </i>
            </p>
          </div>
        ) : (
          <div className="flex justify-between item-center gap-2">
            <Link
              to="/login"
              className={clsx("btn  btn-soft btn-info", {
                "cursor-not-allowed ": location.pathname === "/login",
              })}
            >
              Login
            </Link>
            <Link
              to="/register"
              className={clsx("btn btn-soft  btn-info", {
                "cursor-not-allowed": location.pathname === "/register",
              })}
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar1;
