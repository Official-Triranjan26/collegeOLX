const generateToken = require("../config/generateToken"); 
const UserModel = require("../models/userModel"); 
const {LocalStorage}=require("node-localstorage")
 
const authSignin = async (req,res) => { 
  localStorage = new LocalStorage('./scratch')
  const {email,password}=req.body; 
 
  if(!email || !password){ 
    return res.status(400).json({ 
      success:false, 
      message:"credentials not provideded !!" 
    }) 
  } 
 
  const user = await UserModel.findOne({email:email}); 
  console.log(user) 
  localStorage.setItem("user_name", user.name)
  console.log(localStorage.getItem("user_name"))
  if(user && (await user.matchPassword(password))){ 
    return res.json({ 
      _id: user._id, 
      name: user.name, 
      email: user.email, 
      isAdmin: user.isAdmin, 
      pic: user.pic, 
      token: generateToken(user._id), 
    }); 
  } 
  else{ 
     res.status(400).json({ 
      success:false, 
      message:"invalid credentials !!" 
    }) 
  } 
}; 
 
const authSignup = async (req, res) => { 
  const { name, email, password} = req.body; 
  if (!name  || !email  || !password) { 
    return res.status(400).json({ 
      success: false, 
      message: "credentials are needed !", 
    }); 
  } 
 
  const user = await UserModel.findOne({ email }); 
  if (user) { 
    return res.status(400).json({ 
      success: false, 
      message: "user with credential exists", 
    }); 
  } 
  const newUser = await UserModel.create({ 
    name, 
    email, 
    password, 
  }); 
  console.log(newUser); 
  if (newUser) { 
    res.status(201).json({ 
        id:newUser._id, 
        name:newUser.name, 
        email:newUser.email, 
        password:newUser.password, 
        pic:newUser.pic, 
        token:generateToken(newUser._id) 
      }) 
    }
  else{ 
    return res.status(400).json({ 
        success:false, 
        message:"Failed to craeate user !" 
    }) 
  } 
}; 
 
// const getAllUser = async (req,res)=> { 
//   const keyword = req.query.search 
//     ? { 
//         $or: [ 
//           { name: { $regex: req.query.search, $options: "i" } }, 
//           { email: { $regex: req.query.search, $options: "i" } }, 
//         ], 
//       } 
//     : {}; 
//     const users = await UserModel.find(keyword).find({ _id: { $ne: req.user._id } }); 
//     res.send(users); 
//   // }); 
// } 
module.exports = { authSignin , authSignup  };