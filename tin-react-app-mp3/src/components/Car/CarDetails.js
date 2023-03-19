import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getCarByIdApiCall } from "../../apiCalls/carAPICalls";
import { getFormattedDate } from "../../helper/dateHelper";


function CarDetails() {
  let { carId } = useParams();
  carId = parseInt(carId);

  const [car, setCar] = useState(null);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [message, setMessage] = useState(null);
  
  useEffect(() => {
    getCarByIdApiCall(carId)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      setCar(data);
      setIsLoaded(true);
    })
    .catch(error =>{
      console.log(error);
      setIsLoaded(true);
      setError(error);
    });
  },[]);

  console.log(car);
  console.log(carId);

if(isLoaded === true){
  return (
    <main>
      <h2>Car data</h2>
      <br />
      <p>Car: {car.brand} {car.model}</p>
      <br />
      <h2>Rent details</h2>
      <br />
      <table className="list">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Price</th>
            <th>Pickup Date</th>
            <th>Return Date</th>
          </tr>
        </thead>
        <tbody>
          {car.rents.map((rents) => (
            <tr key={rents._Id}>
              <td>{rents.customer.name}</td>
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
        <Link to="/cars" className="button cancel">
          Back
        </Link>
      </div>
    </main>
  );
} 
else if(error){
  <p>{error.message}</p>
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

export default CarDetails;
