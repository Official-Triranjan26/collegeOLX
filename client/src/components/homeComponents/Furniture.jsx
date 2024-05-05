import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductCard from './ProductCard'

const Furniture = () => {
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

      const { data } = await axios.get("http://localhost:4000/api/listed/furniture", config);
      // console.log(data)
      setProducts(data)
      
    } catch (error) {
      showToastMessage("error",`${error}`);
    }
  }

  useEffect(() => {
    fetchAllProducts()
    // console.log(products)
  }, [])
  return (
    <>
      <div className='flex flex-col'>
          <span className='text-2xl font-semibold text-left py-3 px-5 items-start justify-start'>
            Furniture for you
          </span>
          <div className="px-5 py-2 grid grid-cols-4 gap-4">
          {/* <ProductCard/> */}
          {console.log(products.furniture)}
          {
            products.furniture?
            products.furniture?.map((product)=>(
              <ProductCard {...product} key={product._id}/>
            )):""
          }

          </div>
      </div>
    </>
  )
}

export default Furniture