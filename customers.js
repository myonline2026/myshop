const API = "http://localhost:5000/api";





async function loadCustomers(){


    try{


        const response = await fetch(

            API + "/auth/customers"

        );



        const customers = await response.json();




        const table = document.getElementById(

            "customers"

        );



        table.innerHTML="";





        customers.forEach(customer=>{


            table.innerHTML += `


            <tr>


            <td>

            ${customer.name}

            </td>




            <td>

            ${customer.phone}

            </td>




            <td>

            ${customer.cardId || "-"}

            </td>




            <td>

            ${customer.membership}

            </td>




            <td>

            ${customer.totalPurchase}

            AFN

            </td>




            <td>

            ${new Date(customer.createdAt)

            .toLocaleDateString("fa-AF")}

            </td>




            </tr>


            `;



        });




    }catch(error){


        console.log(error);


    }


}





loadCustomers();