import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [user, setuser] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
  });

  const navigate = useNavigate();

  const handleinput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setuser({
      ...user,
      [name]: value,
    });
  };


  const handlesubmit = async (e) => {
    e.preventDefault();
    console.log(user);

    try {
      // connect with backend
      const response = await fetch(`http://localhost:4000/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        setuser({ name: "", email: "", password: "", location: "" });
        navigate("/login");
      }
      console.log(response);
    } catch (error) {
      console.log("user", error);
    }
  };

  return (
    <>
      <div className="container">
        <form
          onSubmit={handlesubmit}
          className="max-w-md mx-auto m-4 p-6 bg-white shadow-md rounded"
        > 
        <div className="text-green-700 text-2xl font-bold text-center">Sign Up</div>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Name
            </label>
            <input
              type="text"
              placeholder="Enter name"
              name="name"
              value={user.name}
              onChange={handleinput}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

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
              value={user.email}
              onChange={handleinput}
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
              type="text"
              name="password"
              value={user.password}
              onChange={handleinput}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="exampleInputPassword1"
              placeholder="password"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="exampleInputPassword1"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Address
            </label>
            <input
              type="text"
              name="location"
              value={user.location}
              onChange={handleinput}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="exampleInputPassword1"
              placeholder="Address"
            />
          </div>

          <button
            type="submit"
            className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
          <Link
            to="/login"
            className="m-3 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Already a user
          </Link>
        </form>
      </div>
    </>
  );
};

export default Signup;
