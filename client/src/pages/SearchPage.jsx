import React from 'react'
import ProductCard from "../components/homeComponents/ProductCard"
import {UserState} from "../context/context"
const SearchPage = () => {
  const {items,setItems} = UserState();
  return <>
    <div className='flex flex-col'>
        <span className='text-2xl font-semibold text-left py-3 px-5 items-start justify-start'>Results for search</span>
        <div className="px-5 py-2 grid grid-cols-4 gap-4">
        {console.log(items.results)}
        {
          items.results.length?
          items.results.map((item)=>(
            <ProductCard {...item} key={item._id}/>
          )):"No Products found"
        }

        </div>
    </div>
    </>
}

export default SearchPage