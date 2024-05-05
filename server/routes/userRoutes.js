const express = require("express")
const { authSignup, authSignin } = require("../controllers/userController")
const Router = express.Router()

Router.post('/signup',authSignup)
Router.post('/signin',authSignin)

module.exports = Router