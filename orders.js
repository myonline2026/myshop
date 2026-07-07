const express = require("express");
const router = express.Router();

const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User");





// ثبت فروش جدید

router.post("/create", async(req,res)=>{


    try{


        const {

            customerId,

            employeeId,

            products,

            paymentMethod

        } = req.body;



        let totalAmount = 0;

        let marketTotal = 0;



        const items = [];





        for(const item of products){



            const product = await Product.findById(

                item.productId

            );




            if(!product){


                return res.status(404).json({

                    message:"محصول پیدا نشد"

                });


            }




            if(product.stock < item.quantity){


                return res.status(400).json({

                    message:
                    "موجودی کافی نیست"

                });


            }






            const total =

            product.storePrice *

            item.quantity;




            totalAmount += total;




            marketTotal +=

            product.marketPrice *

            item.quantity;






            items.push({


                productId:product._id,


                productName:product.name,


                quantity:item.quantity,


                unitPrice:product.storePrice,


                marketPrice:product.marketPrice,


                totalPrice:total



            });






            // کم شدن انبار

            product.stock -= item.quantity;



            if(product.stock <= 0){

                product.status="out_of_stock";

            }



            await product.save();



        }







        const profit =

        marketTotal - totalAmount;








        const order = new Order({


            customerId,


            employeeId,


            items,


            totalAmount,


            marketTotal,


            profit,


            paymentMethod



        });




        await order.save();







        // ذخیره تاریخچه خرید مشتری

        await User.findByIdAndUpdate(

            customerId,

            {

                $push:{


                    purchaseHistory:{


                        orderId:order._id,


                        amount:totalAmount


                    }


                },



                $inc:{


                    totalPurchase:totalAmount


                }


            }

        );







        res.json({

            message:
            "فروش موفق ثبت شد ✅",


            order



        });





    }catch(error){


        res.status(500).json({

            message:error.message

        });


    }



});







// نمایش فروش‌ها

router.get("/", async(req,res)=>{


    try{


        const orders = await Order.find()

        .populate("customerId")

        .populate("employeeId");



        res.json(orders);



    }catch(error){


        res.status(500).json({

            message:error.message

        });


    }


});






module.exports = router;