import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
 
  const [credentials, setcredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
   

    try {
      const response = await fetch(`http://localhost:4000/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      const json = await response.json();
      console.log(json);

      if (json.success) {
        localStorage.setItem("userEmail", credentials.email);
        localStorage.setItem("authtoken", json.authtoken);
        console.log("Authentication Token:", localStorage.getItem("authtoken"));
        navigate("/");
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.log("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      <form
        className="max-w-md mx-auto m-4 p-6 bg-white shadow-md rounded"
        onSubmit={handlesubmit}
      >
        <div className="text-green-700 text-2xl font-bold text-center">Login</div>
        <div className="mb-4">
          <label
            htmlFor="exampleInputEmail1"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Enter Email
          </label>
          <input
            type="email"
            name="email"
            value={credentials.email}
            onChange={onChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="exampleInputPassword1"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={onChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="exampleInputPassword1"
            placeholder="password"
          />
        </div>

        <button
          type="submit"
          className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
        <Link
          to="/createuser"
          className="m-3 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          I am a new user
        </Link>
      </form>
    </>
  );
};

export default Login;

// 1415263