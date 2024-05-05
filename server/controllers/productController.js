const Product = require("../models/productModel");

const getProductDetails = async (req,res) =>{
    try{
        const productId=req.params.id;
        // console.log(productId)

        const product = await Product.findOne({_id : productId})
        return res.status(200).json(product)
    }
    catch(error){
        res.status(400);
        throw new Error(error.message)
    }
}

const updateProductDetails = async (req,res) =>{
    const productId = req.params.id;
    const payment_Details  = req.body;
    console.log(payment_Details)
     // assuming paymentDetails is provided in the request body

    try {
        // Find the product by ID
        const updatedProduct = await Product.findByIdAndUpdate(productId, {
            sold: true,
            paymentDetails: payment_Details
          }, { new: true }); // Return the updated product
      
          if (!updatedProduct) {
            return res.status(404).send('Product not found');
          }
          console.log(updatedProduct)
      
        //   res.send(updatedProduct);

        // // Save the updated product
        res.status(200).json(updatedProduct);

    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports={getProductDetails,updateProductDetails};