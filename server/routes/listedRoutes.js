const express = require("express")
const Router = express.Router()
const { getAllListed, getAllElectronics,getAllBooks,getAllAppliences,getAllFurniture,getAllEngineering,getItemsFromSearchString} = require("../controllers/listedControllers")

Router.get('/',getAllListed)
Router.get('/electronics',getAllElectronics)
Router.get('/books',getAllBooks)
Router.get('/furniture',getAllFurniture)
Router.get('/engineering',getAllEngineering)
Router.get('/appliences',getAllAppliences)
Router.get('/search',getItemsFromSearchString)

module.exports = Router