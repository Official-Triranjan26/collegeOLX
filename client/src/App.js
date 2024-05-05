import "./App.css";
import { Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import ProductPage from "./pages/ProductPage";
import HomePage from "./pages/HomePage";
import SellPage from "./pages/SellPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Appliences, Books, Electronics, Engineering, Furniture } from './components/homeComponents/allExport'
import AllContent from "./components/homeComponents/AllContent";
import TestPage from "./pages/TestPage";
import SearchPage from "./pages/SearchPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" Component={AuthPage} />

        <Route path="/listed" Component={HomePage} >
          <Route path="" element={<AllContent />} />
          <Route path="electronics" element={<Electronics />} />
          <Route path="books" element={<Books />} />
          <Route path="appliences" element={<Appliences />} />
          <Route path="engineering" element={<Engineering />} />
          <Route path="furniture" element={<Furniture/>}/>
          <Route path="search" element={<SearchPage/>} />
        </Route>
        
        <Route path="/product/:id" Component={ProductPage} />
        <Route path="/sell" Component={SellPage} />
        
        {/* <Route path="/test/:imgurl" Component={TestPage} /> */}
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
