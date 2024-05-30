import React from "react";

const Carousel = () => {
  return (
    <div className="flex relative">
    
      <div className="w-full h-[440px] bg-cover bg-center relative" style={{ backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNQDPIOQhXPBGrFxNJXNlBHAanWdXF_hIcVkmxioVsBwZM9VONhyx5RF5nbMjOOLrhYj4&usqp=CAU')` }}>
      
        <div className="absolute inset-0 bg-black opacity-[0.46]"></div>
        
        
        <div className="absolute top-0 left-0 h-full w-full flex items-center justify-center text-white z-10">
          
          <div className="mt-[-105px] mx-5 text-xl absolute">
    <p className="mt-[10px] italic font-serif">
   Saini Label providing essential
          sizing solutions for garments, textiles, and various consumer
          products. With a commitment to excellence and innovation, Saini Label
           ensures that each label meets the highest standards, offering accurate
          sizing information and durable materials. Trusted by leading brands
          worldwide, Saini Label continues to set the benchmark for size
          labeling, enhancing product presentation and customer satisfaction
           across diverse markets.    </p>
  </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;


