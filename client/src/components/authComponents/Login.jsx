import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  let navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handleClick = () => setShow(!show);
  const showToastMessage = (state, s) => {
    if (state === "warn") {
      return toast.warn(s, {
        position: "bottom-center",
      });
    } else if (state === "error") {
      return toast.error(s, {
        position: "bottom-center",
      });
    } else if (state === "success") {
      return toast.success(s, {
        position: "bottom-center",
      });
    }
  };

  const submit = async () => {
    // console.log(email);
    setLoading(true);
    if (!email || !password) {
      showToastMessage("warn", "credentials cannot be empty !!");
      setLoading(false);
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "http://localhost:4000/api/user/signin",
        { email, password },
        config
      );
      if(data.message) showToastMessage("error",data.message)

      showToastMessage("success", "Login Successful !");
      // setUser(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/listed");
    } catch (error) {
      // .response.data.message
      console.log(error)
      showToastMessage("error", error);
      setLoading(false);
    }
  };

  return (
    <div className="p-2 lg:px-10 lg:py-0">
      <form className="flex flex-col text-black">
        <label htmlFor="email" className=" text-left">Email </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-2 w-9/10 border-b-2 p-2 outline-none"
          placeholder="example@gmail.com"
        />

        <label htmlFor="password" className=" text-left">Password </label>
        <div className="flex flex-row">
          <input
            type={show ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-3/4 border-b-2 p-2 outline-none"
            placeholder="*****"
            autoComplete="off"
          />
          <span
            className="text-[#002f34] text-sm w-1/4 text-right border-b-2 cursor-pointer"
            onClick={handleClick}
          >
            {show ? "Hide" : "Show"}
          </span>
        </div>
        <button
          type="button"
          onClick={() => {
            setEmail("guest@gmail.com");
            setPassword("1234");
          }}
          className="flex items-center justify-center w-full p-2 bg-[#002f34] rounded-md text-white mt-5 "
          disabled={loading}
        >
          <span className="font-medium"> Guest Credentials</span>
        </button>

        <button
          type="button"
          onClick={submit}
          className="flex items-center justify-center w-full p-2 bg-[#002f34] rounded-md text-white mt-5 "
          disabled={loading}
        >
          {loading ? (
            <svg
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
          ) : (
            " "
          )}
          <span className="font-medium">
            {" "}
            {loading ? "Processing... " : "Signin"}
          </span>
        </button>
        <ToastContainer/>
      </form>
    </div>
  );
};

export default Login;
