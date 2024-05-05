const Product = require("../models/productModel")

const getAllListed = async(req,res) => {
    try{
        const listed = await Product.find({ sold: false });
        return res.status(200).json({
            listed
        })
    }catch(error){
        res.status(400);
        throw new Error(error.message)
    }
}

const getAllElectronics = async(req,res) =>{
    try{
        const electronics = await Product.find({catagory : "electronics"});
        return res.status(200).json({
            electronics
        })
    }catch(error){
        res.status(400);
        throw new Error(error.message)
    }

}
const getAllBooks = async(req,res) =>{
    try{
        const books = await Product.find({catagory : "books"});
        return res.status(200).json({
            books
        })
    }catch(error){
        res.status(400);
        throw new Error(error.message)
    }

}
const getAllAppliences = async(req,res) =>{
    try{
        const appliences = await Product.find({catagory : "appliances"});
        return res.status(200).json({
            appliences
        })
    }catch(error){
        res.status(400);
        throw new Error(error.message)
    }

}
const getAllEngineering = async(req,res) =>{
    try{
        const engineering = await Product.find({catagory : "engineering"});
        return res.status(200).json({
            engineering
        })
    }catch(error){
        res.status(400);
        throw new Error(error.message)
    }

}
const getAllFurniture = async(req,res) =>{
    try{
        const furniture = await Product.find({catagory : "furnature"});
        return res.status(200).json({
            furniture
        })
    }catch(error){
        res.status(400);
        throw new Error(error.message)
    }

}
const getItemsFromSearchString = async(req,res) =>{
    try {
        // console.log(req.query.searchString)
        const searchString = req.query.searchString;
        const regex = new RegExp(searchString, 'i');
        const results = await Product.find({ productName: { $regex: regex } });
        // console.log(items)
        return res.status(200).json({
            results
        })
    } catch (error) {
        res.status(400);
        throw new Error(error.message)
    }
}
module.exports={getAllListed,getAllElectronics,getAllBooks,getAllAppliences,getAllFurniture,getAllEngineering,getItemsFromSearchString}