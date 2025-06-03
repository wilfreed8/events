import clsx from "clsx";
import { Link, useLocation } from "react-router-dom";
import Logo from "./ui/logo";

import  {  useContext } from "react";
import { AppContext } from "../Context/AppProvider";
import { LogOut } from "lucide-react";

const phoneNavbar = () => {
  const location = useLocation();
  const { user, token } = useContext(AppContext);
  const handlelogout = async () => {
    await fetch(`/api/logout`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  };
  return (
    <div className="bg-white">
      <div className="drawer">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <div className="navbar bg-white w-full h-20 shadow-md">
            <div className="flex-none lg:hidden">
              <label
                htmlFor="my-drawer-3"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-6 w-6 stroke-current  "
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            <div className="flex md:flex-row justify-between w-full">
                <Logo />
              <div className="hidden flex-none lg:block">
                <div className="flex justify-between flex-col md:flex-row w-full">
                  <ul className="menu menu-horizontal flex just">
                    {/* Navbar menu content here */}        
                    <div className="menu menu-horizontal md:mr-70 gap-10">
                    <li>
                      <Link
                        to="/Home"
                        className={clsx(
                          "btn btn-ghost btn-info w-40 md:w-auto p-1  md:p-4 font-bold md:text-xl text-sm rounded-0 md:rounded-2xl transition-colors duration-200",
                          {
                            "hover:text-white bg-blue-800 text-white":
                              location.pathname === "/Home",
                          }
                        )}
                      >
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/Events"
                        className={clsx(
                          "btn btn-ghost btn-info w-40 md:w-auto  p-1 md:p-4 font-bold md:text-xl text-sm rounded-0 md:rounded-2xl transition-colors duration-200",
                          {
                            "hover:text-white bg-blue-800 text-white":
                              location.pathname === "/events",
                          }
                        )}
                      >
                        Events
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/Announcements"
                        className={clsx(
                          "btn btn-ghost btn-info w-40 md:w-auto p-1 md:p-4 font-bold md:text-xl text-sm rounded-0 md:rounded-2xl transition-colors duration-200",
                          {
                            "hover:text-white bg-blue-800 text-white py-0":
                              location.pathname === "/announcements",
                          }
                        )}
                      >
                        Announcements
                      </Link>
                    </li>
                    </div>
                    <div>
                      {user ? (
                        <div className="flex flex-col items-center md:flex-row gap-1 ">
                          <p className="font-semibold text-center text-sm md:text-xl ">
                            Welcome Back
                            <i className="text-blue-500 md:text-xl font-bold uppercase md:mx-2">
                              {user.name}
                            </i>
                          </p>
                          <button className="flex items-center  hover:text-white hover:btn-error btn transition-colors duration-200">
                            <LogOut
                              size={20}
                              className="mr-1"
                              onClick={handlelogout}
                            />
                            <span className="hidden md:inline">Logout</span>
                          </button>
                        </div>
                      ) : (
                        <div className="flex justify-between item-center gap-2">
                          <Link
                            to="/login"
                            className={clsx("btn  btn-soft btn-info transition-colors duration-200", {
                              "cursor-not-allowed animate-bounce ":
                                location.pathname === "/login",
                            })}
                          >
                            Login
                          </Link>
                          <Link
                            to="/register"
                            className={clsx("btn btn-soft  btn-info transition-colors duration-200", {
                              "cursor-not-allowed  ":
                                location.pathname === "/register",
                            })}
                          >
                            Register
                          </Link>
                        </div>
                      )}
                    </div>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-3"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-white min-h-full w-80 items-center gap-2 p-4">
            {/* Sidebar content here */}
            {user ? (
              <div className="mt-2">
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
                  className={clsx("btn  btn-soft btn-info transition-colors duration-200", {
                    "cursor-not-allowed btn-primary": location.pathname === "/login",
                  })}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className={clsx("btn btn-soft btn-info transition-colors duration-200", {
                    "cursor-not-allowed btn-primary": location.pathname === "/register",
                  })}
                >
                  Register
                </Link>
              </div>
            )}
            <li className="w-full mt-7">
              <Link
                to="/Home"
                className={clsx(
                  "btn btn-soft btn-info w-full hover:text-white transition-colors duration-200  p-1   font-semibold  text-sm ",
                  {
                    "hover:text-white bg-blue-800 btn-primary text-white":
                      location.pathname === "/Home",
                  }
                )}
              >
                Home
              </Link>
            </li>

            <li className="w-full">
              <Link
                to="/Events"
                className={clsx(
                  "btn btn-soft btn-info w-full hover:text-white transition-colors duration-200  p-1   font-semibold  text-sm",
                  {
                    "hover:text-white bg-blue-800  btn-primary text-white":
                      location.pathname === "/Events",
                  }
                )}
              >
                Events
              </Link>
            </li>

            <li className="w-full mb-10">
              <Link
                to="/Announcements"
                className={clsx(
                  "btn btn-soft btn-info w-full hover:text-white transition-colors duration-200  p-1   font-semibold  text-sm",
                  {
                    "hover:text-white bg-blue-800  btn-primary text-white py-0":
                      location.pathname === "/Announcements",
                  }
                )}
              >
                Announcements
              </Link>
            </li>
            {user &&  <button className="flex items-center btn-error btn-soft   hover:text-white hover:btn-error btn transition-colors duration-200">
                            <LogOut
                              size={20}
                              className="mr-1"
                              onClick={handlelogout}
                            />
                            <span className=" md:inline">Logout</span>
                          </button>}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default phoneNavbar;
