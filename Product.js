const mongoose = require("mongoose");


const ProductSchema = new mongoose.Schema({


    productCode:{
        type:String,
        required:true,
        unique:true
    },


    name:{
        type:String,
        required:true,
        trim:true
    },


    category:{
        type:String,
        required:true
    },


    subCategory:{
        type:String,
        default:""
    },


    description:{
        type:String,
        default:""
    },



    images:[

        {
            type:String
        }

    ],



    // قیمت خرید (فقط مدیر)

    purchasePrice:{
        type:Number,
        required:true
    },



    // قیمت بازار

    marketPrice:{
        type:Number,
        required:true
    },



    // قیمت فروش خیرخواه

    storePrice:{
        type:Number,
        required:true
    },



    discount:{
        type:Number,
        default:0
    },



    // انبار

    stock:{
        type:Number,
        default:0
    },



    minimumStock:{
        type:Number,
        default:5
    },



    unit:{
        type:String,
        enum:[
            "عدد",
            "کیلو",
            "لیتر",
            "بسته",
            "کارتن"
        ],
        default:"عدد"
    },



    supplier:{
        type:String,
        default:""
    },



    barcode:{
        type:String,
        default:""
    },



    status:{
        type:String,
        enum:[
            "available",
            "out_of_stock"
        ],
        default:"available"
    },



    createdAt:{
        type:Date,
        default:Date.now
    }


});



module.exports = mongoose.model(
    "Product",
    ProductSchema
);