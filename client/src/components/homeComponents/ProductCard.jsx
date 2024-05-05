import React from "react";
import { electronics } from "../../images/exportAllImages";
import { FaHeart } from "react-icons/fa6";
import { AiFillThunderbolt } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
const ProductCard = ({
  _id,
  productName,
  brandName,
  description,
  price,
  images,
}) => {
  const navigate = useNavigate();
  return (
    <Link to={`/product/${_id}`}>
      <div className="flex flex-col gap-1 py-2 border-2 border-gray-300 rounded-md h-60 relative">
        <div
          title="favourite"
          className="absolute top-3 right-3 h-7 w-7 rounded-full bg-white flex items-center justify-center"
        >
          <FaHeart className="h-5 w-5 cursor-pointer hover:text-red-500" />
        </div>
        <div className="absolute top-3 left-3 h-5 w-1/4 flex gap-1  bg-yellow-400 px-1 rounded-sm">
          <AiFillThunderbolt className="h-full w-full text-lg cursor-pointer" />
          <span className="text-xs font-thin">FEATURED</span>
        </div>
        <div className="h-3/5 px-2">
          {/* {console.log(images)} */}
          {images?<img src={`${images[0]}`} alt="" className="w-full h-full" />:""}
        </div>
        <div className="flex h-2/5">
          <div className="w-3 h-full bg-yellow-400"></div>
          <div className="h-full pl-3 flex flex-col text-left">
            <span className="text-sm font-medium">
              {brandName} {productName}
            </span>
            <span className="text-lg font-semibold text-gray-700">
              ₹ {price}
            </span>
            <span className="text-sm font-thin ">{description}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
