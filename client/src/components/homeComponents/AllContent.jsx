import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {UserState} from "../../context/context"

const AllContent = () => {
  const { user } = UserState();
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
  };
  const [products,setProducts]=useState([]);
  const fetchAllProducts = async()=>{

    try {
      // console.log("hello")
      const config = {
        headers: {
          // Authorization: `Bearer ${user.token}`,
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.get("http://localhost:4000/api/listed", config);
      // console.log(data)
      setProducts(data)
      
    } catch (error) {
      showToastMessage("error",`${error}`);
    }
  }

  useEffect(() => {
    fetchAllProducts()
    // console.log(products)
  }, [user])
  
  return (
    <>
    <div className='flex flex-col'>
        <span className='text-2xl font-semibold text-left py-3 px-5 items-start justify-start'>Fresh recommendations</span>
        <div className="px-5 py-2 grid grid-cols-4 gap-4">
        {/* <ProductCard/> */}
        {console.log(products)}
        {
          products?
          products.listed?.map((product)=>(
            <ProductCard {...product} key={product._id}/>
          )):""
        }

        </div>
    </div>
    </>
  )
}

export default AllContent