const express = require('express'); 
const app = express(); 
const dotenv = require('dotenv'); 
const cors = require('cors') 
const Razorpay= require("razorpay")
app.use(cors()) 

const connectDB = require('./config/DBconnection'); 
const userRoutes = require('./routes/userRoutes')
const sellRoutes = require('./routes/sellRoutes')
const listedRoutes = require('./routes/listedRoutes')
const productRoutes = require('./routes/productRoures')
const generateUploadURL =require('./config/s3')
const crypto = require('node:crypto');
 
dotenv.config(); 
connectDB(); 
app.use(express.json()); 
 
app.get("/",(req,res)=>{ 
    res.send("listining to port"); 
}) 
app.use('/api/user',userRoutes);
app.use('/api/sell',sellRoutes)
app.use('/api/listed',listedRoutes)
app.use('/api/product',productRoutes)

app.get('/s3Url', async (req, res) => {
    const url = await generateUploadURL()
    res.send({url})
})
app.post('/api/order', async (req, res) => {

    try {

        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_SECRET
        });

        if(!req.body){
            return res.status(400).send("Bad Request no body");

        }
        const options = req.body;

        const order = await razorpay.orders.create(options);

        if(!order){
            return res.status(400).send("Bad Request");
        }

        res.json(order);
        
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
})
app.post("/api/validate", async (req, res) => {

    const {razorpay_order_id, razorpay_payment_id, razorpay_signature} = req.body

    const sha = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
    // order_id + " | " + razorpay_payment_id

    sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);

    const digest = sha.digest("hex");

    if (digest!== razorpay_signature) {
        return res.status(400).json({msg: " Transaction is not legit!"});
    }

    res.json({msg: " Transaction is legit!", orderId: razorpay_order_id,paymentId: razorpay_payment_id});
})

app.get("*", (req, res) => { 
    res.status(404).json({ 
        success:false, 
        message: "This route does no exist", 
    }); 
  }); 
 
const PORT = process.env.PORT; 
 
app.listen(4000,console.log(`Server listining on ${PORT}`));