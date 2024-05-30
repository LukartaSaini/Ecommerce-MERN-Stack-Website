import React from "react";
import Footer from "../compontents/Footer";
import Navbar from "../compontents/Navbar";
import Card from "../compontents/Card";
import Carousel from "../compontents/Carousel";
import { useState, useEffect } from "react";

const Home = () => {
  const [Label_Category, setLabel_Category] = useState([]);
  const [Label_Type, setLabel_Type] = useState([]);

  const loadData = async () => {
    try {
      let response = await fetch(`http://localhost:4000/data`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      response = await response.json();

      setLabel_Category(response[0]);
      setLabel_Type(response[1]);

    } catch (error) {
      console.log("card load data error");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
         <Navbar />
   
      <div className="mb-[15px]">
        <Carousel />
      </div>

     
     <div className="container">
  {Label_Category !== 0 ? (
    Label_Category.map((data) => {
      return (
        <div key={data._id} className="grid grid-rows-1 mb-6">
          <div className="text-xl">{data.CategoryName}</div>
          <hr className="bg-gray-500 w-full" />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Label_Type !== 0 ? (
              Label_Type.filter((item) => item.CategoryName === data.CategoryName).map((filterItems) => {
                return (
                  <div key={filterItems._id}>
                    <Card labelItem={filterItems} options={filterItems.options[0]} />
                  </div>
                );
              })
            ) : (
              <div>No such item found</div>
            )}
          </div>
        </div>
      );
    })
  ) : (
    ""
  )}
</div>

        <Footer />
      
    </div>
  );
};

export default Home;
