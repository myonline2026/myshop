const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");




// ثبت نام

router.post("/register", async(req,res)=>{


    try{


        const {

            name,
            phone,
            cardId,
            password

        } = req.body;



        const exists = await User.findOne({

            phone:phone

        });



        if(exists){


            return res.status(400).json({

                message:"این شماره قبلاً ثبت شده است"

            });


        }




        const hashPassword = await bcrypt.hash(

            password,

            10

        );



        const user = new User({

            name,

            phone,

            cardId,

            password:hashPassword

        });



        await user.save();



        res.json({

            message:"ثبت نام موفق شد",

            user:user

        });



    }catch(error){


        res.status(500).json({

            message:error.message

        });


    }


});









// ورود

router.post("/login", async(req,res)=>{


    try{


        const {

            phone,

            password

        } = req.body;



        const user = await User.findOne({

            phone

        });



        if(!user){


            return res.status(404).json({

                message:"کاربر پیدا نشد"

            });


        }





        const check = await bcrypt.compare(

            password,

            user.password

        );



        if(!check){


            return res.status(400).json({

                message:"رمز اشتباه است"

            });


        }




        const token = jwt.sign(

            {

                id:user._id,

                role:user.role

            },

            process.env.JWT_SECRET,

            {

                expiresIn:"30d"

            }

        );




        res.json({

            message:"ورود موفق",

            token,

            user

        });



    }catch(error){


        res.status(500).json({

            message:error.message

        });


    }



});








// پیدا کردن مشتری برای کارمند

router.get("/search/:phone", async(req,res)=>{


    try{


        const user = await User.findOne({

            phone:req.params.phone,

            role:"customer"

        });



        if(!user){


            return res.status(404).json({

                message:"مشتری پیدا نشد"

            });


        }



        res.json(user);



    }catch(error){


        res.status(500).json({

            message:error.message

        });


    }



});





module.exports = router;
// نمایش تمام مشتریان برای مدیر

router.get("/customers", async(req,res)=>{


    try{


        const customers = await User.find({

            role:"customer"

        }).select(

            "-password"

        );



        res.json(customers);



    }catch(error){


        res.status(500).json({

            message:error.message

        });


    }



});