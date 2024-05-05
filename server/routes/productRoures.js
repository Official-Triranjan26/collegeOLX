const express = require("express")
const Router = express.Router()
const {getProductDetails,updateProductDetails} = require("../controllers/productController")

Router.get('/:id',getProductDetails)
Router.put('/updateProductDetails/:id',updateProductDetails)


module.exports = Router