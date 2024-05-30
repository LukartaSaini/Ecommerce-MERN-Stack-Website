const express = require('express');
const router = express.Router();

router.post('/',async (req,res)=>{


try {
    
//console.log("Request body:",global.Label_Tyle);
res.send([global.Label_Tyle,global.Label_Category])

} catch (error) {
    console.log("DisplayData Catch Error");
    res.send("DisplayData Catch Error")
    
}})

module.exports = router;