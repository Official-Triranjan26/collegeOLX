import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  let navigate = useNavigate();
  const [show1, set1Show] = useState(false);
  const [show2, set2Show] = useState(false);
  const handleClick1 = () => set1Show(!show1);
  const handleClick2 = () => set2Show(!show2);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  // const [pic, setPic] = useState();
  const [loading, setLoading] = useState(false);

  const showToastMessage = (state,s) => {
    if(state ==='warn'){
      return toast.warn(s, {
        position: "bottom-center"
      });
    }
    else if(state ==='error'){
      return toast.error(s, {
        position: "bottom-center"
      });
    }
    else if(state ==='success'){
      return toast.success(s, {
        position: "bottom-center"
      });
    }
  }
  const submit = async() => {
    setLoading(true);
    if (!name || !email || !password || !confirmpassword) {
      showToastMessage('warn',"credentials are needed !");
      setLoading(false);
      return;
    }
    if (password !== confirmpassword) {
      showToastMessage('warn',"password doesn't match !!");
      setLoading(false);
      return;
    }
    console.log(name, email, password);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "http://localhost:4000/api/user/signup",
        {
          name,
          email,
          password,
        },
        config
      );
      showToastMessage('success',"Registration Successful !");
      console.log(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/listed");
    } catch (error) {
      showToastMessage('error',`${error}`);
      setLoading(false);
    }
  }

  return (
    <div className=" px-2 lg:px-10 lg:py-2">
      <form className="flex flex-col gap-1 text-black text-left">
        {/* name */}
        <label htmlFor="name">Name </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-9/10 border-b-2 p-2 outline-none"
          placeholder="Enter your name"
        />

        {/* email */}
        <label htmlFor="email">Email </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-9/10 border-b-2 p-2 outline-none"
          placeholder="example@gmail.com"
        />

        {/* password */}
        <label htmlFor="password">Password </label>
        <div className="flex flex-row">
          <input
            type={show1 ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-3/4 border-b-2 p-2 outline-none"
            placeholder="*****"
            autoComplete="off"
          />
          <span
            className="text-[#002f34] text-sm w-1/4 text-right border-b-2 cursor-pointer"
            onClick={handleClick1}
          >
            {show1 ? "Hide" : "Show"}
          </span>
        </div>

        {/* conformPassword */}
        <label htmlFor="password">Conform Password </label>
        <div className="flex flex-row">
          <input
            type={show2 ? "text" : "password"}
            value={confirmpassword}
            onChange={(e) => setConfirmpassword(e.target.value)}
            className="w-3/4 border-b-2  p-2 outline-none"
            placeholder="*****"
            autoComplete="off"
          />
          <span
            className="text-[#002f34] w-1/4 text-right border-b-2 text-sm  cursor-pointer"
            onClick={handleClick2}
          >
            {show2 ? "Hide" : "Show"}
          </span>
        </div>
        
        <div className="flex flex-row items-center justify-center">
          <button
            type="button"
            onClick={submit}
            className="flex items-center justify-center w-full p-2 bg-[#002f34] rounded-md text-white mt-5 "
            disabled={loading}
          >
            {loading? <svg
              className=" h-5 w-5 animate-spin text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            :" "}
            <span className="font-medium"> {loading? 'Processing... ':'Signup'}</span>
          </button>
          <ToastContainer />
        </div>
      </form>
    </div>
  );
};

export default Signup;
