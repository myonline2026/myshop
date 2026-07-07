const API = "http://localhost:5000/api";





async function loadSales(){


    try{


        const response = await fetch(

            API + "/orders"

        );



        const orders = await response.json();




        const table = document.getElementById(

            "sales"

        );



        table.innerHTML="";




        let totalSales = 0;

        let totalProfit = 0;







        orders.forEach(order=>{


            totalSales += order.totalAmount;


            totalProfit += order.profit;





            table.innerHTML += `



            <tr>



            <td>

            ${

            order.customerId ?

            order.customerId.name :

            "-"

            }

            </td>





            <td>

            ${

            order.employeeId ?

            order.employeeId.name :

            "-"

            }

            </td>





            <td>

            ${order.items.length}

            </td>





            <td>

            ${order.totalAmount}

            AFN

            </td>





            <td>

            ${order.profit}

            AFN

            </td>





            <td>

            ${new Date(order.createdAt)

            .toLocaleDateString("fa-AF")}

            </td>




            </tr>



            `;



        });





        document.getElementById(

            "totalSales"

        ).innerHTML = totalSales;





        document.getElementById(

            "totalProfit"

        ).innerHTML = totalProfit;





    }catch(error){


        console.log(error);


    }



}




loadSales();