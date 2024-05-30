import React, { useState, useEffect } from "react";
import Footer from "../compontents/Footer";
 import Navbar from "../compontents/Navbar";
 
 
 const MyOrder = () => {
     const [orderData, setOrderData] = useState([]);
     const [error, setError] = useState(null);
     const [lastDate, setLastDate] = useState(null);
 
     useEffect(() => {
         const fetchMyOrder = async () => {
             try {
                 const userEmail = localStorage.getItem('userEmail');
                 const response = await fetch(`http://localhost:4000/order/myorder`, {
                     method: 'POST',
                     headers: {
                         'Content-Type': 'application/json'
                     },
                     body: JSON.stringify({ email: userEmail })
                 });
 
                 if (!response.ok) {
                     throw new Error('Failed to fetch data');
                 }
 
                 const data = await response.json();
                 console.log("Order Data:", data);
 
                 if (data.orderData && Array.isArray(data.orderData.order_data) && data.orderData.order_data.length > 0) {
                     setOrderData(data.orderData.order_data.reverse()); // Reverse the order data here
                 } else {
                     setOrderData([]);
                 }
             } catch (error) {
                 setError(error.message);
             }
         };
 
         fetchMyOrder();
     }, []);
 
     if (error) {
         return <div>Error: {error}</div>;
     }
 
     return (
         <>
             <Navbar />
             <div className="container mx-auto pt-[57px]">
                 {orderData.length > 0 ? (
                     orderData.map((arrayData, index) => (
                         <div key={index} className="my-8 flex flex-cols-1">
                             {Array.isArray(arrayData) ? (
                                 arrayData.map((item, itemIndex) => (
                                     <div key={itemIndex}>
                                         {/* Display date only if it's different from the last one */}
                                         {/* {itemIndex === 0 && (lastDate !== item.Order_date) && ( */}
                                         {itemIndex === 0 && (lastDate !== item.Order_date) && (


                                             <div className="m-auto mt-5">
                                       <h3>{new Date(item.Order_date).toLocaleDateString()}</h3>
                                       {/* <h3>{new Date().toLocaleString()}</h3> */}


                                    

                                                 <hr className="h-1 bg-gray-300 w-full" />
                                             </div>
                                         )}
                                         {itemIndex !== 0 && ( // Don't render for the first item in each order
                                             <div className="col-12 col-md-6 col-lg-3">
                                                 <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                                     <div className="card-body">
                                                         <h5 className="card-title">{item.name}</h5>
                                                         <div className='flex flex-wrap items-center'>
                                                             <span className='m-1'>Quantity: {item.qty}</span>
                                                             <span className='m-1'>Size: {item.size}</span>
                                                             <div className='flex-1 text-right text-lg'>
                                                                 ₹{item.price}/-
                                                             </div>
                                                         </div>
                                                     </div>
                                                 </div>
                                             </div>
                                         )}
                                     </div>
                                 ))
                             ) : null}
                         </div>
                     ))
                 ) : (
                     <div className="text-center my-8">No orders found</div>
                 )}
             </div>
             <div className="fixed bottom-0 w-full bg-gray-600 "><Footer /></div>
         </>
     );
 };


export default MyOrder;

// import React, { useState, useEffect } from "react";
// import Footer from "../compontents/Footer";
//  import Navbar from "../compontents/Navbar";


 

// const MyOrder = () => {
//     const [orderData, setOrderData] = useState([]);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchMyOrder = async () => {
//             try {
//                 const userEmail = localStorage.getItem('userEmail');
//                 const response = await fetch(`http://localhost:4000/order/myorder`, {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json'
//                     },
//                     body: JSON.stringify({ email: userEmail })
//                 });

//                 if (!response.ok) {
//                     throw new Error('Failed to fetch data');
//                 }

//                 const data = await response.json();
//                 console.log("Order Data:", data);

//                 if (data.orderData && Array.isArray(data.orderData.order_data) && data.orderData.order_data.length > 0) {
//                     setOrderData(data.orderData.order_data.reverse()); // Reverse the order data here
//                 } else {
//                     setOrderData([]);
//                 }
//             } catch (error) {
//                 setError(error.message);
//             }
//         };

//         fetchMyOrder();
//     }, []);

//     const formatDate = (dateString) => {
//         try {
//             let date = new Date(dateString);
//             return date.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
//         } catch (e) {
//             console.error(e);
//             return 'Invalid Date';
//         }
//     };

//     if (error) {
//         return <div>Error: {error}</div>;
//     }

//     return (
//         <>
//             <Navbar />
//             <div className="container mx-auto pt-[57px]">
//                 {orderData.length > 0 ? (
//                     orderData.map((arrayData, index) => {
//                         let lastDate = null; // Use a local variable to track the last date
//                         return (
//                             <div key={index} className="my-8 flex flex-cols-1">
//                                 {Array.isArray(arrayData) ? (
//                                     arrayData.map((item, itemIndex) => {
//                                         // Check if item has all the required properties
//                                         const isValidItem = item.name && item.qty && item.size && item.price;
//                                         const displayDate = itemIndex === 0 && lastDate !== item.Order_date;

//                                         if (displayDate) {
//                                             lastDate = item.Order_date; // Update the local lastDate variable
//                                         }

//                                         return (
//                                             <div key={itemIndex}>
//                                                 {displayDate && (
//                                                     <div className="m-auto mt-5">
//                                                         <h3>{formatDate(item.Order_date)}</h3>
//                                                         <hr className="h-1 bg-gray-300 w-full" />
//                                                     </div>
//                                                 )}
//                                                 {isValidItem && (
//                                                     <div className="col-12 col-md-6 col-lg-3">
//                                                         <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
//                                                             <div className="card-body">
//                                                                 <h5 className="card-title">{item.name}</h5>
//                                                                 <div className='flex flex-wrap items-center'>
//                                                                     <span className='m-1'>Quantity: {item.qty}</span>
//                                                                     <span className='m-1'>Size: {item.size}</span>
//                                                                     <div className='flex-1 text-right text-lg'>
//                                                                         ₹{item.price}/-
//                                                                     </div>
//                                                                 </div>
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                 )}
//                                             </div>
//                                         );
//                                     })
//                                 ) : null}
//                             </div>
//                         );
//                     })
//                 ) : (
//                     <div className="text-center my-8">No orders found</div>
//                 )}
//             </div>
//             <div className="fixed bottom-0 w-full bg-gray-600"><Footer /></div>
//         </>
//     );
// };

// export default MyOrder;
