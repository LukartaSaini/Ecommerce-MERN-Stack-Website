import React from 'react';
import { useCart, useDispatchCart } from '../compontents/ContextReducer';
import { loadStripe } from '@stripe/stripe-js';

export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();

  if (data.length === 0) {
    return (
      <div className="m-5 text-center text-lg font-semibold">
        The Cart is Empty!
      </div>
    );
  }

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
    let response = await fetch(`http://localhost:4000/order/data`, {
      method: "POST",
      headers: {
        'Content-Type': "application/json",
      },
      body: JSON.stringify({
        email: userEmail, // Add the user's email here
        order_data: data,
        order_date: new Date().toDateString()
      })
    });
    console.log("Order Respons: e", response.status)
    
  }
  
  let totalPrice = data.reduce((total, label) => total + label.price, 0);

  const makePayment =async ()=>{
  const stripe = await loadStripe("pk_test_51PA69cSH3D9zH59R54WIzVwRTbRa85AYAPv6n3Ge0s6m6mHW4FK8sFRsajdo3aqMpRPAyG8nlxwXmWTiikw24myy00rQeJPeFd")
  const body ={
    products:data
  }
  console.log(data) // Corrected to log data
  const headers = {
          'Content-Type': "application/json"
  }
  const response = await fetch("http://localhost:4000/order/payment",{
    method:"POST",
    headers:headers,
    body:JSON.stringify(body)
  })
  const session = await response.json();

  const result = stripe.redirectToCheckout({
    sessionId:session.id
  });

  if(result.error){
    console.log(result.error)
  }

}

  return (
    <div className="container mx-auto mt-5">
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead className="text-green-500 text-lg">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2">Option</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((label, index) => (
              <tr key={index}>
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{label.name}</td>
                <td className="px-4 py-2">{label.qty}</td>
                <td className="px-4 py-2">{label.size}</td>
                <td className="px-4 py-2">{label.price}</td>
                <td className="px-4 py-2">
                  <button
                    className="btn p-0"
                    onClick={() => { dispatch({ type: "REMOVE", index: index }) }}
                  >
                    DELETE
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-5">
        <h1 className="text-2xl font-semibold">Total Price: ₹ {totalPrice}/-</h1>
        <button
          className="btn bg-green-500 text-white px-4 py-2 rounded-md"
         onClick={()=>{
          handleCheckOut(); makePayment();
         }}
        >
         Pay Now
        </button>
      </div>
    </div>
  );
}



