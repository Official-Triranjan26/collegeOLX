import React ,{useState,useEffect} from 'react'
import axios from 'axios'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductCard from './ProductCard'

const Electronics = () => {
  const [electronic,setElectronic]=useState([]);
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
  const fetchAllElectronics = async()=>{

    try {
      // console.log("hello")
      const config = {
        headers: {
          // Authorization: `Bearer ${user.token}`,
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.get("http://localhost:4000/api/listed/electronics", config);
      // console.log(data)
      setElectronic(data)
      
    } catch (error) {
      showToastMessage("error",`${error}`);
    }
  }

  useEffect(() => {
    fetchAllElectronics()
    // console.log(products)
  }, [])
  return (
    <>
      <div className='flex flex-col'>
          <span className='text-2xl font-semibold text-left py-3 px-5 items-start justify-start'>Electronics Products</span>
          <div className="px-5 py-2 grid grid-cols-4 gap-4">
          {/* <ProductCard/> */}
          {console.log(electronic.electronics)}
          {
            electronic?
            electronic.electronics?.map((product)=>(
              <ProductCard {...product} key={product._id}/>
            ))
            :"hi"
          }

          </div>
      </div>
    </>
  )
}

export default Electronics