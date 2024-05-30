import React from 'react'
import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom'
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';


const Navbar = () => {

const [cartView,setCartView]= useState(false)

let data = useCart();
  const navigate = useNavigate();

const handlelogout=()=>{
localStorage.removeItem("authtoken")
navigate("/login")
}

  return (
    <div>
      <nav className="bg-green-500 " style={{ position: "fixed", width: "100%", zIndex: "1000" }}>
        <div className="w-full mx-4">
          <div className="flex items-center justify-between h-[70px] font-serif">
            <div className="flex items-center">  
              <span className="text-white font-italic text-3xl">Saini Label</span>
              <ul className="ml-4 flex"> {/* Apply flex to the entire list */}
                <li>
                  <Link to="/" className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-xl font-bold">Home</Link>
                </li>
                {localStorage.getItem("authtoken") &&
                  <li>
                    <Link to="/myorder" className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-xl font-bold">My Orders</Link>
                  </li>
                }
              </ul>
            </div>
            
            <div className="flex items-center">
              {!localStorage.getItem("authtoken") ?
                <div className="flex items-center mr-10">
                  <Link to="/login" className="bg-white text-green-500 hover:bg-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-md font-bold mx-1 my-1">Login</Link>
                  <Link to="/createuser" className="bg-white text-green-500 hover:bg-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-md font-bold mx-1 my-1">SignUp</Link>
                </div>
                :
<div className='flex'>
                <div onClick={()=>{setCartView(true)}} className=" hover:cursor-pointer bg-white text-green-500 hover:bg-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-bold mx-1 my-1">
                  My Cart 
                  <span className="inline-flex items-center px-3 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                   {data.length}</span>

                </div>
                {cartView? <Modal onClose={()=>setCartView(false)} ><Cart/></Modal>:null}

                <div className="ml-auto mr-10">
                  <div onClick={handlelogout} className=" hover:cursor-pointer bg-white text-red-500 hover:bg-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-bold mx-1 my-1">
                    Logout</div>
                </div></div>
              }
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar


