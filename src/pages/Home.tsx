import { Link } from "react-router-dom";
import { useContext, } from "react";

import { AppContext } from "../Context/AppProvider";

export default function Home() {
  const { user } = useContext(AppContext);
  return (
    <>
      <main className="grid min-h-full place-items-center    px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center ">
          <p className="text-base font-semibold text-indigo-600">
            Events House
          </p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
            Find an Buy your Self a place to attempt the best events happening
            in the country
          </h1>
          <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
            Welcome to Eventhouse your next favourite events plateforms
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/login"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Get started
            </Link>
            <a href="#" className="text-sm font-semibold text-gray-900">
              Contact support <span aria-hidden="true">&rarr;</span>
            </a>
            {user?.role == "admin" && (
              <Link
                to="/Dashboard"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Admin Page
              </Link>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
