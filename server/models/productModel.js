const mongoose = require("mongoose"); 
 
const productSchema = mongoose.Schema({
    featured: { type: Boolean, required: false , default:false}, 
    productName: { type: "String", required: true }, 
    brandName: { type: "String", required: false }, 
    description: { type: "String", required: true }, 
    details: { type: "String", required: true }, 
    images: [{type :"String",required : true}], 
    owner : {type : "String" , required:true},
    price: { type: Number, required: true },
    picupLocation: { type: "String", required: true },
    catagory: { type: "String", required: true },
    sold: { type: Boolean, required: true , default :false},
    paymentDetails: {
        order_id: { type: String, required: false },
        payment_id: { type: String, required: false },
        coustomer_id: { type: String, required: false },
        coustomer_name: { type: String, required: false },
        coustomer_contact: { type: String, required: false },

    } 
},
    { timestamps: true } 
)

const Product = mongoose.model("Product", productSchema); 
// Product.createIndexes()
 
module.exports = Product;
