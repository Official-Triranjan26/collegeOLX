const express = require("express")
const sellProduct = require("../controllers/sellController")
const Router = express.Router()

Router.post('/',sellProduct)

module.exports = Router