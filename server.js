const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const connectDatabase = require("./database");


const app = express();



// اتصال دیتابیس

connectDatabase();



// تنظیمات

app.use(cors());

app.use(express.json());

app.use(morgan("dev"));



// فایل‌های عکس

app.use(
    "/uploads",
    express.static("uploads")
);



// مسیرها

const authRoutes = require("./routes/auth");

const productRoutes = require("./routes/products");

const orderRoutes = require("./routes/orders");

const uploadRoutes = require("./routes/upload");



app.use(
    "/api/auth",
    authRoutes
);


app.use(
    "/api/products",
    productRoutes
);


app.use(
    "/api/orders",
    orderRoutes
);


app.use(
    "/api/upload",
    uploadRoutes
);





// تست سیستم

app.get("/",(req,res)=>{


    res.json({

        store:
        process.env.STORE_NAME,

        status:
        "Online ✅"

    });


});





const PORT =
process.env.PORT || 5000;



app.listen(PORT,()=>{


    console.log(

        `Server running on ${PORT} ✅`

    );


});