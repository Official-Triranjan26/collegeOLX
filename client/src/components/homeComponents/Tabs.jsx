import React from 'react'
import classnames from "classnames";
import { useParams, Link, useLocation } from "react-router-dom";
import { FaComputer } from "react-icons/fa6";
import { IoBookSharp } from "react-icons/io5";
import { FaTools } from "react-icons/fa";
import { PiOfficeChairFill } from "react-icons/pi";
import { MdKitchen } from "react-icons/md";


const Tab = ({title,route,icon,isActive}) =>{
    return (
        <>
        <Link to={`/listed/${route}`} className='h-20'>
            <div className={classnames('flex flex-col gap-2 h-full min-w-20 hover:bg-gray-100 px-3',
            {"bg-gray-200" : isActive ,})}>
                {icon}
                <span className='text-base font-light  text-center'>{title}</span>
            </div>
        </Link>
        </>
    )
}

const Tabs = () => {
    const location = useLocation();
    const currentPath = location.pathname;
    const allCatagories = [
        {
            title: "Electronics",
            route: "electronics",
            icon :<FaComputer className='h-2/3 w-full rounded-full object-contain'/>,
            isActive: currentPath.includes("electronics"),
        },
        {
            title: "Books",
            route: "books",
            icon :<IoBookSharp className='h-full w-full rounded-full object-fill'/>,
            isActive: currentPath.includes("books"),
        },
        {
            title: "Appliences",
            route: "appliences",
            icon :<MdKitchen className='h-full w-full rounded-full object-fill'/>,
            isActive: currentPath.includes("appliences"),
        },
        {
            title: "Engineering",
            route: "engineering",
            icon :<FaTools className='h-full w-full rounded-full object-fill'/>,
            isActive: currentPath.includes("engineering"),
        },
        {
            title: "Furnature",
            route: "furniture",
            icon :<PiOfficeChairFill className='h-full w-full rounded-full object-fill'/>,
            isActive: currentPath.includes("furniture"),
        },
    ]
  return (
    <>
        <div className='flex w-full mt-20 items-center justify-center border-b-2 border-gray-200'>
            <span className='text-black font-semibold text-xl bg-gray-200 h-20'>Find Products by catagories</span>
            <div className='flex justify-evenly items-center h-20 w-full'>
                {allCatagories.map((tab,index)=>(
                    <Tab {...tab} key={index}/>
                ))}
            </div>
        </div>
    </>
  )
}

export default Tabs