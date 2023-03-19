import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getCustomerByIdApiCall } from "../../../apiCalls/customerAPICalls";
import { getFormattedDate } from "../../../helper/dateHelper";


function CustomerDetails() {
  let { customerId } = useParams();
  customerId = parseInt(customerId);

  const [customer, setCustomer] = useState(null);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [message, setMessage] = useState(null);
  
  useEffect(() => {
    getCustomerByIdApiCall(customerId)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      setCustomer(data);
      setIsLoaded(true);
    })
    .catch(error =>{
      console.log(error);
      setIsLoaded(true);
      setError(error);
    });
  },[]);

  console.log(customer);
  console.log(customerId);

if(isLoaded === true){
  return (
    <main>
      <h2>Customer data</h2>
      <br />
      <p>Name: {customer.name}</p>
      <p>Surname: {customer.lastName} </p>
      <p>E-mail: {customer.email} </p>
      <br />
      <h2>Rent details</h2>
      <br />
      <table className="list">
        <thead>
          <tr>
            <th>Car</th>
            <th>Price</th>
            <th>Pickup Date</th>
            <th>Return Date</th>
          </tr>
        </thead>
        <tbody>
          {customer.rents.map((rents) => (
            <tr key={rents._Id}>
              <td>{rents.car.model}</td>
              <td>{rents.price}</td>
              <td>
                {rents.pickupDate ? getFormattedDate(rents.pickupDate) : ""}
              </td>
              <td>
                {rents.returnDate ? getFormattedDate(rents.returnDate) : ""}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="section-buttons">
        <Link to="/customers" className="button cancel">
          Back
        </Link>
      </div>
    </main>
  );
} 
else {
  return(
    <>
    <h2>Customer Details</h2>
    <p>Loading...</p>
    </>
  )
}
}

export default CustomerDetails;
