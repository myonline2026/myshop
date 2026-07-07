const API = "http://localhost:5000/api";





// نمایش محصولات

async function loadProducts(){


    try{


        const response = await fetch(

            API + "/products"

        );



        const products = await response.json();



        showProducts(products);



    }catch(error){


        console.log(error);


    }


}







function showProducts(products){


    const box = document.getElementById(

        "products"

    );



    box.innerHTML="";





    products.forEach(product=>{


        box.innerHTML += `


        <div class="product">


        <img src="

        ${product.images && product.images[0] 
        ? product.images[0] 
        : 'https://via.placeholder.com/300'}

        ">



        <h3>

        ${product.name}

        </h3>



        <p class="market">

        قیمت بازار:

        ${product.marketPrice}

        افغانی

        </p>




        <p class="store">

        قیمت خیرخواه:

        ${product.storePrice}

        افغانی

        </p>




        <p>

        موجودی:

        ${product.stock}

        </p>



        </div>


        `;


    });


}







// جستجو

function searchProduct(){


    const text = document.getElementById(

        "search"

    ).value.toLowerCase();




    const items = document.querySelectorAll(

        ".product"

    );



    items.forEach(item=>{


        if(

            item.innerText.toLowerCase()

            .includes(text)

        ){


            item.style.display="block";


        }else{


            item.style.display="none";


        }


    });


}









// ثبت نام مشتری

async function register(){



    const user = {


        name:

        document.getElementById("name").value,


        phone:

        document.getElementById("phone").value,


        cardId:

        document.getElementById("cardId").value,


        password:

        document.getElementById("password").value



    };





    try{


        const response = await fetch(

            API + "/auth/register",

            {


                method:"POST",


                headers:{


                    "Content-Type":

                    "application/json"

                },


                body:

                JSON.stringify(user)



            }


        );




        const data = await response.json();




        alert(

            data.message

        );




    }catch(error){


        alert(

            "خطا در اتصال"

        );


    }



}





loadProducts();