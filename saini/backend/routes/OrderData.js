const express = require('express');
const router = express.Router();
const Order = require('../models/Order')
const stripe = require('stripe')('sk_test_51PA69cSH3D9zH59Rwk30n4yzuxFpDzjgIPKBaHSJddF3po9sKgTxFYJWlAkX8M4ApLcKlXJwfY7MWEgPsGCOjBcN00a1PoXgyx');
router.post("/data", async (req, res) => {
    let data = req.body.order_data
    await data.splice(0,0,{Order_date: req.body.order_date})
    

    let eId =await Order.findOne({'email': req.body.email})
    console.log(eId)
   

if(eId === null){

    try {
        console.log(data)
        console.log("1231242343242354",req.body.email)
         await Order.create({
            email: req.body.email,
            order_data: [data]
         }).then(()=>{
            res.json({sucess: true})
         })
    } catch (error) {
        console.log('Error:', error.message);
        res.send("Catch Error OrderData",error.message);
    }


}
else{
    try {
        await Order.findOneAndUpdate({email: req.body.email},
            {$push: {order_data: data}}).then(()=>{
                res.json({success: true})
            })
        
    } catch (error) {
        res.send("Catch Error OrderData",error.message);
    }
}
  

});



router.post("/myorder", async (req, res) => {
    try {
        const myData = await Order.findOne({ email: req.body.email });
        console.log("Order Data:", myData); // Log the order data
        res.json({ orderData: myData });
    } catch (error) {
        console.error("Error fetching order data:", error); // Log any errors
        res.status(500).send("Server Error: " + error.message);
    }
});


// payment
router.post("/payment", async (req, res) => {
  const { products } = req.body;
  // console.log("radharadha", products);

  const lineItems = products.map((product) => ({
      price_data: {
          currency: "inr",
          product_data: {
              name: product.name
              
          },
          unit_amount: Math.round(product.price * 100),
      },
      quantity: product.qty 
  }));

  const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:5173",
cancel_url: "https://yourwebsite.com/cancel"

  });

  res.json({ id: session.id });
});






module.exports= router;


//card no Test Visa Card: 4000 0035 6000 00081.


