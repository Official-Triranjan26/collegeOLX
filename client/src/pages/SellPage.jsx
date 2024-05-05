import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { Link,useNavigate } from "react-router-dom";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { TbCameraPlus } from "react-icons/tb";
import { FaLocationDot } from "react-icons/fa6";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"
// import { Link } from "react-router-dom";

const SellPage = () => {
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

  const[catagory,setCatagory]=useState("")
  const[productName,setProductName]=useState("")
  const[brandName,setBrandName]=useState("")
  const[description,setDescription]=useState("")
  const[details,setDetails]=useState("")
  const[price,setPrice]=useState("")
  const[picupLocation,setPicupLocation]=useState("")
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const postProduct = async()=>{
    console.log(images)
    setLoading(true)
    if (!catagory ||
        !productName ||
        !brandName ||
        !description ||
        !details ||
        !price ||
        !picupLocation ||
        !images) {
      showToastMessage('warn',"credentials are needed !");
      setLoading(false)
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "http://localhost:4000/api/sell",
        {
          catagory,
          productName,
          brandName,
          description,
          details,
          price,
          picupLocation,
          images
        },
        config
      );
      console.log(data)
      setLoading(false)
      showToastMessage('success',"Product Posted Successfully !");
      navigate("/listed");
    }catch(error){
      showToastMessage("error",{error})
    }
  }

  const [pic1, setPic1] = useState();
  const [pic2, setPic2] = useState();
  const [pic3, setPic3] = useState();
  const [pic,setPic]=useState();
  const [images, setImages] =  useState([])
  const handleSubmit = async (pic,id) => {
    if(!pic) return
    // generate secure s3 url
    const { url } = await fetch("http://localhost:4000/s3Url").then((res) =>
      res.json()
    );
    console.log(url);

    // post the image direclty to the s3 bucket
    await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: pic,
    });

    const imageUrl = await url.split("?")[0];
    // images.push(imageUrl)
    console.log(imageUrl)
    setImages(images => [...images, imageUrl])
    console.log(images)

    const element = document.getElementById(id);
    // console.log(element)
    element.className='w-max h-10 py-1 px-2 rounded-md border-2 border-green-500 text-green-500 font-medium text-lg  hover:bg-gray-300'
    element.innerHTML="Uploaded"
    // element.removeAttribute("onClick")
    element.setAttribute('disabled', 'true');

    showToastMessage("success", "Uploaded Successfully !");
  };

  const handleImage = (pic,id)=>{
    console.log("from handleImage")
    console.log(pic)
    // setPic(pic);
    if(id==="label1") setPic1(pic);
    if(id==="label2") setPic2(pic);
    if(id==="label3") setPic3(pic);
    const element=document.getElementById(id);
    console.log(element)
    if(pic){
      element.classList.remove("border-gray-300","text-gray-500");
      element.classList.add("border-green-500" ,"text-green-500")
    }
  }
  return (
    <>
      <div className="flex justify-start p-3 h-16 bg-gray-300 w-full">
        <Link to={"/listed"} className="h-16">
          <FaArrowLeft className="text-3xl" />
        </Link>
      </div>

      <div className="w-full flex items-center justify-center">
        <div className="w-1/2 flex flex-col border-2  border-gray-200  mt-5">
          <span className="text-2xl text-gray-500 font-semibold border-b-2 border-gray-300 py-3 px-5 flex justify-center w-full h-max bg-gray-50">
            POST YOUR PRODUCT
          </span>

          <div className="flex flex-col justify-start px-5 py-3 border-b-2 border-gray-300">
            <span className="text-xl text-gray-500 font-semibold flex justify-start ">
              INCLUDE SOME DETAILS
            </span>

            {/* catagory */}
            <div className="flex flex-col justify-start py-3 gap-1">
              <label htmlFor="catagory" className="text-left">
                Choose Catagory *
              </label>
              <select
                name=""
                id="catagory"
                className="w-3/4 border-2 p-2 outline-none"
                value={catagory}
                onChange={(e)=>setCatagory(e.target.value)}
                >
                {/* {console.log(catagory)} */}
                <option disabled selected value="">
                  Select an option
                </option>
                <option value="electronics">Electronics</option>
                <option value="books">Books</option>
                <option value="appliances">Appliances</option>
                <option value="engineering">Engineering</option>
                <option value="furnature">Furnature</option>
              </select>
            </div>

            {/* productName */}
            <div className="flex flex-col justify-start py-3 gap-1">
              <label htmlFor="" className="text-left">
                Product name *
              </label>
              <input type="text"value={productName} onChange={(e)=>setProductName(e.target.value)}  className="w-3/4 border-2 p-2 outline-none" />
            </div>

            {/* brandName */}
            <div className="flex flex-col justify-start py-3 gap-1">
              <label htmlFor="" className="text-left">
                Brand name *
              </label>
              <input type="text" value={brandName} onChange={(e)=>setBrandName(e.target.value)} className="w-3/4 border-2 p-2 outline-none" />
            </div>

            {/* description */}
            <div className="flex flex-col justify-start py-3 gap-1">
              <label htmlFor="" className="text-left">
                Description *
              </label>
              <input type="text" value={description} onChange={(e)=>setDescription(e.target.value)} className="w-3/4 border-2 p-2 outline-none" />
            </div>

            {/* details*/}
            <div className="flex flex-col justify-start py-3 gap-1">
              <label htmlFor="" className="text-left">
                Details *
              </label>
              <textarea
                cols="30"
                rows="5"
                className="w-3/4 border-2 p-2 outline-none"
                value={details}
                onChange={(e)=>setDetails(e.target.value)}
              ></textarea>
            </div>
          </div>

          {/* price */}
          <div className="flex flex-col justify-start px-5 py-3 border-b-2 border-gray-300">
            <label
              htmlFor=""
              className="text-xl font-semibold text-left text-gray-500 py-3"
            >
              SET A PRICE{" "}
            </label>
            <div className="flex gap-3 border-gray-200 rounded-md border-2 w-3/4 h-full">
              <div className="h-8 w-1/12 px-2 border-r-2 border-gray-200 flex items-center justify-center">
                <FaIndianRupeeSign className=" text-gray-500 " />
              </div>
              <input type="text" className="p-2 outline-none w-full" value={price} onChange={(e)=>setPrice(e.target.value)} />
            </div>
          </div>

          {/* images */}
          <div className="flex flex-col border-b-2 border-gray-300">
            <span className="text-xl text-gray-500 font-semibold flex justify-start px-5 py-3">
              UPLOAD IMAGES
            </span>
            <div className="flex flex-col gap-3  justify-start px-5 py-3">
              <input type="file" id="upload1" name="img1" accept="image/*" onChange={(e)=>handleImage(e.target.files[0],"label1")} hidden />
              
              {/* {pic1 ? } */}
              <div className=" flex gap-10 items-center">
                <label for="upload1">
                  <div className="p-3 border-2 border-gray-300 text-gray-500 w-14" id="label1">
                    <TbCameraPlus className="text-3xl" />
                  </div>
                </label>
                
                <button className="w-max h-10 py-1 px-2 rounded-md border-2 border-black font-medium text-lg cursor-pointer hover:bg-gray-300" id="btn1" onClick={()=>handleSubmit(pic1,"btn1")}  >
                  Upload
                </button>
              </div>

              <input type="file" id="upload2" name="img2" accept="image/*" onChange={(e)=>handleImage(e.target.files[0],"label2")} hidden />
              <div className=" flex gap-10 items-center">
                <label for="upload2">
                  <div className="p-3 border-2 border-gray-300 w-14 text-gray-500" id="label2">
                    <TbCameraPlus className="text-3xl " />
                  </div>
                </label>
                <div className="w-max h-10 py-1 px-2 rounded-md border-2 border-black font-medium text-lg cursor-pointer hover:bg-gray-300" id="btn2" onClick={()=>handleSubmit(pic2,"btn2")}>
                  Upload
                </div>
              </div>

              <input type="file" id="upload3" name="img" accept="image/*" onChange={(e)=>handleImage(e.target.files[0],"label3")} hidden />
              <div className=" flex gap-10 items-center">
                <label for="upload3">
                  <div className="p-3 border-2 border-gray-300 w-14 text-gray-500" id="label3">
                    <TbCameraPlus className="text-3xl " />
                  </div>
                </label>
                <div className="w-max h-10 py-1 px-2 rounded-md border-2 border-black font-medium text-lg cursor-pointer hover:bg-gray-300" id="btn3" onClick={()=>handleSubmit(pic3,"btn3")}>
                  Upload
                </div>
              </div>
            </div>
          </div>

          {/* picupLocation */}
          <div className="flex flex-col justify-start px-5 py-3 border-b-2 border-gray-300">
            <span className="text-xl text-gray-500 font-semibold flex justify-start ">
              PICK UP LOCATION
            </span>
            <div className="flex gap-3 border-gray-200 rounded-md border-2 w-3/4 h-full mt-2">
              <div className="h-8 w-1/12 px-2 border-r-2 border-gray-200 flex items-center justify-center">
                <FaLocationDot className=" text-gray-500 " />
              </div>
              <input type="text" className="p-2 outline-none w-full" value={picupLocation}  onChange={(e)=>setPicupLocation(e.target.value)}/>
            </div>
          </div>

          {/* post now */}
          <button
            type="button"
            onClick={postProduct}
            className="px-3 py-2 bg-black text-white font-semibold w-1/4 mx-auto mt-6 rounded-md cursor-pointer hover:opacity-80 mb-10 "
            disabled={loading}
          >
            {loading? <svg
              className=" h-5 w-5 animate-spin text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            :" "}
            <span className="font-medium"> {loading? 'Processing... ':'POST NOW'}</span>
          </button>

        </div>
      </div>
      <ToastContainer/>
    </>
  );
};

export default SellPage
