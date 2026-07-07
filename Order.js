const mongoose = require("mongoose");



const OrderSchema = new mongoose.Schema({



    customerId:{

        type:mongoose.Schema.Types.ObjectId,

        ref:"User",

        required:true

    },



    employeeId:{

        type:mongoose.Schema.Types.ObjectId,

        ref:"User"

    },



    items:[

        {

            productId:{

                type:mongoose.Schema.Types.ObjectId,

                ref:"Product"

            },


            productName:{

                type:String

            },


            quantity:{

                type:Number,

                required:true

            },


            unitPrice:{

                type:Number,

                required:true

            },


            marketPrice:{

                type:Number

            },


            totalPrice:{

                type:Number,

                required:true

            }


        }

    ],




    // مجموع پولی که مشتری پرداخت کرده

    totalAmount:{

        type:Number,

        required:true

    },



    // مجموع قیمت بازار

    marketTotal:{

        type:Number,

        default:0

    },



    // سود فروشگاه

    profit:{

        type:Number,

        default:0

    },



    paymentMethod:{

        type:String,

        enum:[

            "cash",

            "card",

            "credit"

        ],

        default:"cash"

    },



    status:{

        type:String,

        enum:[

            "completed",

            "cancelled"

        ],

        default:"completed"

    },



    createdAt:{

        type:Date,

        default:Date.now

    }



});




module.exports = mongoose.model(

    "Order",

    OrderSchema

);