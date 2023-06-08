
import axios from 'axios';
import React, { useEffect, useState } from 'react'



function ShowProducts() {

    const [products, setProducts] = useState([]);

    useEffect(()=>
    {
        getAllProducts()
    },[])
    
    const endpoint = "https://stunning-manatee-42.hasura.app/v1/graphql";
    
    const headers = {
        "content-type": "application/json",
        "x-hasura-admin-secret": "l0KXo8dTld5DzSQcL6JTnls0j7b27k5BkhDnLSnnW2PHUmEzzDkzyiIA44uyoWar"
    }
    
    const graphqlQuery = {      // query to get all peoducts 
        "query": `query getAllProducts {
                agrimart_products {
                    id
                    name
                    price
                    description
                }
            }`
    };
  
    const getAllProducts = async () => {
        const allproducts = await axios({
            url:endpoint,
            method:'post',
            headers:headers,
            data:graphqlQuery
            }
        )
        if(allproducts.data != null){
            setProducts(allproducts.data.data.agrimart_products)
            console.log(allproducts)
            console.log(products)
        }
    }
  
    return (
        <div className='row'>
            {products.map(p=> 
                    
                        { return <div className="col-lg-4 col-md-3 col-2 mt-3 mb-3" id={p.id}>
                                        <div>
                                            <div className="card-body">
                                                <div>
                                                    <center>Name : {p.name}</center>
                                                </div>
                                                <div>
                                                    <center>Price : {" "}₹ {p.price}</center>
                                                </div>
                                                <div>
                                                    <center>Description : {" "} {p.description}</center>
                                                </div>
                                            </div>
                                        </div>
                                </div>
                        }
                    
                )
            }
        </div>
    )
}

 export default ShowProducts

