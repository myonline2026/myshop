const express = require("express");
const router = express.Router();

const multer = require("multer");
const path = require("path");





// محل ذخیره عکس‌ها

const storage = multer.diskStorage({


    destination:function(req,file,cb){


        cb(
            null,
            "uploads/"
        );


    },



    filename:function(req,file,cb){


        const uniqueName =

        Date.now()

        +

        path.extname(file.originalname);



        cb(
            null,
            uniqueName
        );


    }



});






// فیلتر عکس

const fileFilter = (req,file,cb)=>{


    const allowed = [

        "image/jpeg",

        "image/png",

        "image/jpg",

        "image/webp"

    ];



    if(

        allowed.includes(

            file.mimetype

        )

    ){


        cb(null,true);


    }else{


        cb(

            new Error(
                "فقط فایل عکس قابل قبول است"
            ),

            false

        );


    }


};








const upload = multer({


    storage,


    fileFilter,


    limits:{


        fileSize:5 * 1024 * 1024


    }



});









// یک عکس

router.post(

    "/single",

    upload.single("image"),


    (req,res)=>{


        res.json({


            message:
            "عکس آپلود شد ✅",


            image:

            "/uploads/" +

            req.file.filename



        });


    }


);









// چند عکس برای یک جنس

router.post(

    "/multiple",


    upload.array(

        "images",

        5

    ),


    (req,res)=>{


        const images =

        req.files.map(file=>

            "/uploads/" +

            file.filename

        );




        res.json({


            message:
            "عکس‌ها ذخیره شد ✅",


            images



        });


    }


);








module.exports = router;