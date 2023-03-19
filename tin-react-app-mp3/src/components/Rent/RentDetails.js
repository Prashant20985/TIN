import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getRentByIdApiCall } from "../../apiCalls/rentAPICalls";
import { getFormattedDate } from "../../helper/dateHelper";


function RentDetails() {
  let { rentId } = useParams();
  rentId = parseInt(rentId);

  const [rent, setRent] = useState(null);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [message, setMessage] = useState(null);
  
  useEffect(() => {
    getRentByIdApiCall(rentId)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      setRent(data);
      setIsLoaded(true);
    })
    .catch(error =>{
      console.log(error);
      setIsLoaded(true);
      setError(error);
    });
  },[]);

  console.log(rent);
  console.log(rentId);

if(isLoaded === true){
  return (
    <main>
      <h2>Rent Data</h2>
      <br />
      <p>Car: {rent.car.brand} {rent.car.model}</p>
      <p>Pickup Date: {rent.pickupDate ? getFormattedDate(rent.pickupDate) : ""}</p>
      <p>Return Date: {rent.returnDate ? getFormattedDate(rent.returnDate) : ""}</p>
      <br />
      <h2>Customer and Car Details</h2>
      <br />
      <table className="list">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
            <tr key={rent._Id}>
              <td>{rent.customer.name} {rent.customer.lastName}</td>
              <td>{rent.customer.email}</td>
              <td>{rent.price}</td>
            </tr>
        </tbody>
      </table>
      <div className="section-buttons">
        <Link to="/rents" className="button cancel">
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

export default RentDetails;
