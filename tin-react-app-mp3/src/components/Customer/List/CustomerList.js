import { useEffect, useState } from "react";
import { getCustomersApiCall } from "../../../apiCalls/customerAPICalls";
import CustomerListTable from "./CustomerListTable";

function CustomerList() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [customers, setCustomers] = useState([]);

  function fetchCustomersList() {
    getCustomersApiCall()
        .then(res => res.json())
        .then(
            (data) => {
                setIsLoaded(true)
                setCustomers(data)
            },
            (error) => {
                setIsLoaded(true)
                setError(error)
            }
        )
  }
 
  
  useEffect(() => {
    fetchCustomersList()
  }, [])

  console.log(customers)

  let content;
  if(error){
    content = <p>Error: {error.message}</p>
  } else if(!isLoaded){
    content = <p>Loading...</p>
  }
  else{
    content = <CustomerListTable customers={customers}/>
  }

  return (
    <main>
      <h3>Customers List</h3>
      {content}
      <a type="button" href="/customers/add" className="button add">
        Add Customer
      </a>
    </main>
  );
}



export default CustomerList;
