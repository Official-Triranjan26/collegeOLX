import React, { useState } from "react";
import { IoSearchSharp, IoNotificationsSharp } from "react-icons/io5";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { CiUser } from "react-icons/ci";
import { GrLogout } from "react-icons/gr";
import { IoMdAdd } from "react-icons/io";
import logo from "../../images/college_olx_logo-removebg.png";
import { Link, useNavigate } from "react-router-dom";
import {UserState} from "../../context/context"
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios'

const Navbar = ({ sideBar, setSideBar, sideBarFun }) => {
  const showToastMessage = (state, s) => {
    if (state === "warn") {
      return toast.warn(s, {
        position: "bottom-center",
      });
    } else if (state === "error") {
      return toast.error(s, {
        position: "bottom-center",
      });
    } else if (state === "success") {
      return toast.success(s, {
        position: "bottom-center",
      });
    }
  }
  const [searchString, setSearchString] = useState('');
  // const [items, setItems] = useState([]);
  const { user,items,setItems } = UserState();
  // const {items,setItems} = UserState();
  const dropDown = () => setActive(!active);
  const [active, setActive] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const modelOpenClose = () => {
    setIsOpen(!isOpen);
  };

  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };
  const handleSearch =async()=>{
    if(!searchString) return;
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.get("http://localhost:4000/api/listed/search", {
        params: { searchString }}, config);
      setItems(data)
      navigate('/listed/search')
    } catch (error) {
      showToastMessage("error",`${error}`);
    }
  }

  return (
    <>
    {/* {console.log(items)} */}
      <div className="flex flex-row sticky top-0 w-full justify-between items-center bg-gray-200 h-16 z-20">
        <div className="flex h-full px-5">
          <Link to={"/listed"} className='h-16'>
            <img src={logo} alt="" className='h-16' />
          </Link>
        </div>
        <div className="flex w-1/3 h-10 rounded-md">
          <div className="w-full h-full">
            <input
              type="text "
              value={searchString} 
              onChange={(e)=>setSearchString(e.target.value)}
              className="w-full h-full border-2 border-black p-1"
              placeholder="Find used products and more..."
            />
          </div>
          {/* <Link to={"/listed/search"}> */}
            <div className="bg-black text-white text-2xl p-2" onClick={handleSearch}>
              <IoSearchSharp />
            </div>
          {/* </Link> */}
        </div>

        <div className="flex gap-6">
          <div className="flex text-white text-base px-5 w-36 justify-between">
            <div className="cursor-pointer flex text-black" onClick={dropDown}>
              <div className="h-10 w-10 cursor-pointer">
                  <CiUser className="h-full w-full object-cover" />
              </div>
              <div className="cursor-pointer h-10 w-10 ">
                {active ? (
                  <RiArrowDropUpLine className="h-full w-full object-cover" />
                ) : (
                  <RiArrowDropDownLine className="h-full w-full object-cover" />
                )}
                {active ? (
                  <div className="absolute top-10 right-36 flex flex-col text-black bg-white h-52 w-72 z-10 p-2 items-center gap-2 rounded-md drop-shadow-2xl divide-y-4 divide-slate-400/25 cursor-default">
                    <div className="flex h-1/3 justify-center gap-3">
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLoFCRRgnRkBVeHVU7OoKLZ8ADENqhl9J6Dg&usqp=CAU"
                        className="rounded-full object-cover"
                        alt=""
                      />
                      <span className="font-semibold text-xl text-black text-center my-auto">
                        {user.name}
                      </span>
                    </div>
                    <div className="w-full flex flex-col items-center py-4 gap-4">
                      <div
                        onClick={modelOpenClose}
                        className="h-10 w-10/12 bg-black rounded-md text-white justify-center py-1  cursor-pointer"
                      >
                        View and Edit Profile
                      </div>
                      <div
                        onClick={logoutHandler}
                        className=" flex gap-3 h-10 w-10/12 bg-white rounded-md text-black justify-center py-1  cursor-pointer border-2 border-black font-semibold"
                      >
                        Logout
                        <GrLogout className="h-full text-2xl" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </div>
          <Link to={"/sell"} className='h-10'>
            <div className="h-10 px-5 mr-6 bg-black rounded-md text-white justify-center items-center py-1  cursor-pointer flex gap-2 font-semibold">
              Sell
              <IoMdAdd className="text-2xl" />
          </div>
          </Link>
        </div>
      </div>
      {/* {isOpen ? (
        <Profile
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          modelOpenClose={modelOpenClose}
        />
      ) : (
        ""
      )} */}
    </>
  );
};

export default Navbar;
