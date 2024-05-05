import React , { useEffect } from "react";
import logo from "../images/college_olx_logo.png"
import { Tab } from "@headlessui/react";
import Login from "../components/authComponents/Login";
import Signup from "../components/authComponents/SignUp";
import { useNavigate } from "react-router-dom";
import classnames from "classnames"

const AuthPage = () => {
    function classNames(...classes) {
        return classes.filter(Boolean).join(" ");
      }
  return (
    <>
      <div className="flex flex-row w-full h-screen bg-white text-black bottom-0">
        <div className="w-1/2 hidden lg:flex">
          <div className="w-3/4 h-3/4 mx-auto my-auto">
            <img src={logo} className="w-full h-full object-contain" alt="" />
          </div>
        </div>
        <div className="w-full md:w-1/2 flex mx-auto">
          <div className="flex flex-col top-4 mx-auto my-auto w-4/5 bg-white">
            <div className="w-3/4 mx-auto my-auto flex md:hidden">
              <img src={logo} alt="" className="w-full h-full object-cover" />
            </div>
            {/* n--------------------------------------------*/}
            <div className="w-full max-w-md px-1 my-auto sm:px-0 text-sm md:text-base">
              <Tab.Group>
                <Tab.List className="flex space-x-1 px-2 lg:px-8 rounded-xl bg-white p-1">
                  <Tab
                    className={({ selected }) =>
                      classNames(
                        "w-3/4 rounded-lg py-2.5 text-sm font-medium leading-5",
                        selected ? " bg-[#002f34] text-white" : "bg-gray-400 text-white"
                      )
                    }
                  >
                    Signin
                  </Tab>
                  <Tab
                    className={({ selected }) =>
                      classNames(
                        "w-3/4 rounded-lg py-2.5 text-sm font-medium leading-5",
                        selected ? " bg-[#002f34] text-white" : "bg-gray-400 text-white"
                      )
                    }
                  >
                    Signup
                  </Tab>
                </Tab.List>
                <Tab.Panels className="mt-2">
                  <Tab.Panel>
                    <Login />
                  </Tab.Panel>
                  <Tab.Panel>
                    <Signup />
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthPage;
