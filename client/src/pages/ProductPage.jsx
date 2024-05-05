import React, { useEffect, useState } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Pagination, Navigation } from "swiper/modules";
import { electronics } from "../images/exportAllImages";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { IoShareSocialSharp } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FiUserCheck } from "react-icons/fi";
import { SlCalender } from "react-icons/sl";
import { AiFillThunderbolt } from "react-icons/ai";
import Navbar from "../components/homeComponents/Navbar";
import ProductCard from "../components/homeComponents/ProductCard";
import Footer from "../components/homeComponents/Footer";

import { useNavigate, useParams } from 'react-router-dom';
// import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {UserState} from "../context/context"
import axios from 'axios'

import dayjs from "dayjs"
import success from "../images/success.png"

const ProductPage = () => {
  const { user} = UserState();
  const {id}=useParams();

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

  const [allDetails,setAllDetails]=useState([]);
  const [orderId,setOrderId]=useState('');
  const [paymentId,setPaymentId]=useState('');
  const [showPaymentPage,setShowPaymentPage]=useState(false)

  const paymentHandler = async (event) => {

    const amount = allDetails.price*100;
    console.log(amount)
    const currency = 'INR';
    const receiptId = '1234567890';

    const response = await fetch('http://localhost:4000/api/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        amount,
        currency,
        receipt: receiptId
      })
    })
      const order = await response.json();
      console.log('order', order);
      var option = {
        key:"",
        amount,
        currency,
        name:"CollegeOLX",
        description: "Test Transaction",
        // image:"https://drive.google.com/file/d/1f0rwm-ExvPE-dEe8kBtImjppB_Jd1u2r/view?usp=sharing",
        order_id:order.id,
        handler: async function(response) {
          // console.log('Payment ID:', response.razorpay_payment_id);
          // setOrderId(response.razorpay_order_id)
          // setPaymentId(response.razorpay_payment_id)
          alert("transaction successful")
          const body = {...response,}
          console.log(body)
          const validateResponse = await fetch('http://localhost:4000/api/validate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
          })
          const jsonResponse = await validateResponse.json();
          console.log('jsonResponse', jsonResponse);
          setOrderId(jsonResponse.orderId)
          setPaymentId(jsonResponse.paymentId)
          console.log(orderId)
          console.log(paymentId)
          
        },
        prefill: {
          name: user.name, 
          email: user.email,
          // contact: "", 
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#002f34",
        },
      }

      var rzp1 = new window.Razorpay(option)
      rzp1.on("payment.failed", function(response) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
      })

      rzp1.open("success",function(response){
        alert(response)
      });
      event.preventDefault();
  }
  useEffect(() => {
    if(paymentId){
      updateInDB()
    }
 }, [paymentId])
   
  const updateInDB = async(req,res) =>{
    try {
      {console.log("subha hi",orderId,paymentId)}
      const updatedProductDetails = await fetch(`http://localhost:4000/api/product/updateProductDetails/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          "order_id":orderId,
          "payment_id":paymentId,
          "coustomer_id":user._id,
          "coustomer_name":user.name,
          "coustomer_contact":user.email
        })
      })
      invert();
      
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    const getProductDetails = async () => {
      try {
        const config = {
          headers: {
            // Authorization: Bearer ${user.token},
            "Content-type": "application/json",
          },
        };
        const url = `http://localhost:4000/api/product/${id}`;
        const res = await axios.get(url, config);
        // console.log(res.data);
        setAllDetails(res.data);
      } catch (error) {
        console.log( error);
      }
    };
    getProductDetails();
  },[allDetails]);
  let navigate = useNavigate();

  const invert = ()=>{
    setShowPaymentPage(!showPaymentPage)
  }

  const launch = ()=>{
    invert()
    navigate('/listed')
  }

  const day=dayjs(allDetails.createdAt)
  const formattedDate = day.date() + 'th ' + day.format('MMMM') + ', ' + day.year(); 

  return (
    <>
      <Navbar />
      {/* {console.log(allDetails.images)} */}
      
      <Swiper
        pagination={{
          type: "fraction",
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper h-96 bg-black mt-2 px-5"
      >
        
        {allDetails.images?allDetails.images.map((image)=>(
          <SwiperSlide className="flex items-center justify-center">
            <img
              src={`${image}`}
              alt="image"
              className="w-full h-full object-contain"
            />
          </SwiperSlide>
        )):""}
      </Swiper>

      <div className="h-full block"> 
        <aside className="w-1/3 flex flex-col h-96 bg-gray-100 float-right sticky top-16 gap-3 p-4">
          <div className="h-1/2 bg-white rounded-md py-5 px-5 flex flex-col gap-5">
            <span className="text-5xl font-bold text-start">
              ₹ {allDetails?allDetails.price:""}
            </span>
            <div className="bg-black w-full rounded-lg text-white text-lg font-semibold h-12 flex justify-center items-center cursor-pointer" onClick={paymentHandler}>
              Purchase
            </div>
          </div>
          <div className="h-1/2 bg-white rounded-md py-5 px-5 flex flex-col gap-5">
            <div className="flex gap-2 items-center justify-center h-1/2">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVlszH7tmKiwhO2EhbnXeR5iQg8ct-k5_MYw&usqp=CAU" alt="" className="h-full object-cover rounded-full"/>
              <span className="text-2xl font-semibold">{allDetails?allDetails.owner:""}</span>
            </div>
            <div className=" w-full rounded-lg text-black border-2 border-black text-lg font-semibold h-12 flex justify-center items-center gap-4 cursor-pointer">
              Contact Seller
              <IoChatboxEllipsesOutline className="text-2xl text-green-500"/>
            </div>
          </div>
        </aside>

        <div className="w-2/3 h-screen bg-gray-100 flex flex-col gap-4  p-5 rounded-md">
          <div className="bg-white p-5 flex flex-col gap-4">
            <div className="w-2/12 rounded-md bg-yellow-400 px-2 py-1 flex gap-2 items-center">
              <AiFillThunderbolt/>
              <span className="text-center text-sm font-thin">Featured</span>
            </div>
            <div className="flex justify-between">
              <span className="text-4xl flex font-semibold items-start">
                {/* {console.log(allDetails)} */}
                {allDetails?allDetails.productName:""}
              </span>
              <div className="flex gap-4 h-full pr-5"> 
                  <IoShareSocialSharp className="h-full text-4xl hover:text-blue-500"/>
                  <FaRegHeart className="h-full text-4xl hover:text-red-400"/>
              </div>
            </div>
            <span className="text-xl flex font-thin items-start">
            {allDetails?allDetails.details:""}
            </span>
          </div>

          <div className="flex flex-col bg-white">
            <span className="text-2xl text-gray-500 font-semibold border-b-2 border-gray-300 py-3 px-5 flex items-start">Overview</span>
            <div className="px-4 py-3 flex justify-between items-center">
              <div className="flex gap-3 h-full items-center">
                <FiUserCheck className="text-4xl h-full"/>
                <div className="flex flex-col text-left">
                  <span className="text-lg font-thin">Owner</span>
                  <span className="text-xl font-semibold">1st</span>
                </div>
              </div>
              <div className="flex gap-3 h-full items-center">
                <FaLocationDot className="text-3xl h-full"/>
                <div className="flex flex-col text-left">
                  <span className="text-lg font-thin">
                    Picup Location
                    </span>
                  <span className="text-xl font-semibold">
                    {allDetails?allDetails.picupLocation:""}
                    </span>
                </div>
              </div>
              <div className="flex gap-3 h-full items-center">
                <SlCalender className="text-4xl h-full"/>
                <div className="flex flex-col text-left">
                  <span className="text-lg font-thin">Posted on</span>
                  <span className="text-xl font-semibold">{formattedDate}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col bg-white">
            <span className="text-2xl text-gray-500 font-semibold border-b-2 border-gray-300 py-3 px-5 flex items-start">Description</span>
            <div className="flex flex-col gap-1 px-5 py-4">
              <span className="text-base font-thin text-left">
                {allDetails?allDetails.description:""}
              </span>
            </div>
          </div>

          <div className="flex flex-col bg-white">
            <span className="text-2xl text-gray-500 font-semibold border-b-2 border-gray-300 py-3 px-5 flex items-start">Recommanded For You</span>
            <div className=" h-60 w-full py-3">
              <Swiper
                slidesPerView={3}
                spaceBetween={10}
                pagination={{
                  clickable: true,
                }}
                navigation={true}
                modules={[Navigation]}
                className="mySwiper h-full w-full py-3"
              >
                
                <SwiperSlide><ProductCard/></SwiperSlide>
                <SwiperSlide><ProductCard/></SwiperSlide>
                <SwiperSlide><ProductCard/></SwiperSlide>
                <SwiperSlide><ProductCard/></SwiperSlide>
                
              </Swiper>
            </div>
          </div>

        </div>
      </div>
      <Footer/>
      {showPaymentPage?
        <div className="fixed flex top-0 w-full h-screen bg-[#002f34] z-50">
          <div className=" flex flex-col w-96 h-max mx-auto my-auto bg-white px-8 py-5 rounded-md">
            <img src={success} alt="" className="flex h-10 w-10 mx-auto" />
            <span className=" text-center text-green-500 text 2xl font-semibold my-2">Payment Successful</span>
            <div className="flex flex-row w-full justify-between mt-1">
              <p>Product</p><p >{allDetails?allDetails.productName:""}</p>
              <p></p>
            </div>
            <div className="flex justify-between mt-1">
              <p>Pickup Location</p><p>{allDetails?allDetails.picupLocation:""}</p>
              <p></p>
            </div>
            <div className="flex justify-between mt-1">
              <p>Owner</p><p>{allDetails?allDetails.owner:""}</p>
              <p></p>
            </div>
            <div className="flex justify-between mt-1">
              <p>Amount paid</p><p>{allDetails?allDetails.price:""}</p>
              <p></p>
            </div>
            <div className="flex justify-between mt-1">
              <p>paymentId</p><p>{paymentId?paymentId:""}</p>
              <p></p>
            </div>
            <button className="flex px-3 py-2 bg-green-500 text-white rounded-sm w-max mx-auto my-2" onClick={launch}>OK</button>
          </div>
        </div>
        :""
      }
    </>
  );
};

export default ProductPage;
