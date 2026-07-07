const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
        trim:true
    },


    phone:{
        type:String,
        required:true,
        unique:true
    },


    cardId:{
        type:String,
        unique:true,
        sparse:true
    },


    password:{
        type:String,
        required:true
    },


    role:{
        type:String,
        enum:[
            "admin",
            "employee",
            "customer"
        ],
        default:"customer"
    },


    membership:{
        type:String,
        enum:[
            "normal",
            "silver",
            "gold",
            "vip"
        ],
        default:"normal"
    },


    address:{
        type:String,
        default:""
    },


    profileImage:{
        type:String,
        default:""
    },


    totalPurchase:{
        type:Number,
        default:0
    },


    purchaseHistory:[

        {

            orderId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Order"
            },


            date:{
                type:Date,
                default:Date.now
            },


            amount:{
                type:Number
            }

        }

    ],



    createdAt:{
        type:Date,
        default:Date.now
    }


});


module.exports = mongoose.model(
    "User",
    UserSchema
);