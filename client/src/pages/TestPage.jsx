import React, { useState } from 'react'
import { useLocation} from "react-router-dom";

const TestPage = () => {
  let location = useLocation();
  console.log(location.pathname)
  const myurl=location.pathname.split("//")[1]
  // const [pic,setPic]=useState();
  // const [imgurl,setImgurl]=useState("");
  // const handleSubmit = async(pic)=>{

  //   // generate secure s3 url
  //   const { url } = await fetch("http://localhost:4000/s3Url").then(res => res.json())
  //   console.log(url)

  //   // post the image direclty to the s3 bucket
  //   await fetch(url, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "multipart/form-data"
  //     },
  //     body: pic
  //   })

  //   const imageUrl =await url.split('?')[0]
  //   setImgurl(imageUrl)
  //   console.log(imageUrl)
  // }

  return (
    <div className='w-full h-full'>
      <img src={`https://${myurl}`} alt="" className='object-cover h-full w-full'/>
    </div>
  )
}

export default TestPage