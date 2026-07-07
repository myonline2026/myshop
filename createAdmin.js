require("dotenv").config();

const mongoose = require("mongoose");

const bcrypt = require("bcrypt");

const User = require("./models/User");

const connectDatabase = require("./database");





async function createAdmin(){


    await connectDatabase();



    const exists = await User.findOne({

        role:"admin"

    });




    if(exists){


        console.log(
            "Admin already exists"
        );


        process.exit();


    }







    const password = await bcrypt.hash(

        "123456",

        10

    );






    const admin = new User({


        name:
        "مدیر خیرخواه",



        phone:
        "0700000000",



        cardId:
        "ADMIN001",



        password,



        role:
        "admin"



    });





    await admin.save();




    console.log(

        "Admin created successfully ✅"

    );


    console.log(

        "Phone: 0700000000"

    );


    console.log(

        "Password: 123456"

    );



    process.exit();



}



createAdmin();