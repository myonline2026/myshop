const express = require("express");
const router = express.Router();

const Product = require("../models/Product");





// اضافه کردن محصول جدید

router.post("/add", async(req,res)=>{


    try{


        const product = new Product(req.body);


        await product.save();



        res.json({

            message:"محصول اضافه شد ✅",

            product

        });



    }catch(error){


        res.status(500).json({

            message:error.message

        });


    }


});








// نمایش تمام محصولات

router.get("/", async(req,res)=>{


    try{


        const products = await Product.find();



        res.json(products);



    }catch(error){


        res.status(500).json({

            message:error.message

        });


    }



});









// جستجوی محصول با کد

router.get("/code/:code", async(req,res)=>{


    try{


        const product = await Product.findOne({

            productCode:req.params.code

        });



        if(!product){


            return res.status(404).json({

                message:"محصول پیدا نشد"

            });


        }



        res.json(product);



    }catch(error){


        res.status(500).json({

            message:error.message

        });


    }



});









// ویرایش محصول

router.put("/:id", async(req,res)=>{


    try{


        const product = await Product.findByIdAndUpdate(

            req.params.id,

            req.body,

            {
                new:true
            }

        );



        res.json({

            message:"محصول ویرایش شد",

            product

        });



    }catch(error){


        res.status(500).json({

            message:error.message

        });


    }



});









// حذف محصول

router.delete("/:id", async(req,res)=>{


    try{


        await Product.findByIdAndDelete(

            req.params.id

        );



        res.json({

            message:"محصول حذف شد"

        });



    }catch(error){


        res.status(500).json({

            message:error.message

        });


    }


});






module.exports = router;