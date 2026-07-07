const express = require("express");
const router = express.Router();



let settings = {


    storeName:
    "خیرخواه سوپرمارکیت",


    storePhone:
    "",


    storeAddress:
    "",


    currency:
    "AFN",


    online:
    true


};





// گرفتن تنظیمات

router.get("/",(req,res)=>{


    res.json(settings);


});






// ذخیره تنظیمات

router.post("/",(req,res)=>{


    settings = {


        ...settings,

        ...req.body


    };



    res.json({

        message:
        "تنظیمات ذخیره شد ✅",


        settings


    });


});





module.exports = router;