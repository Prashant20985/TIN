import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getRentApiCall } from "../../apiCalls/rentAPICalls";
import { isAuthenticated } from "../../helper/authHelper";

function RentList() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [rents, setRent] = useState([]);

  const navigate = useNavigate();

  function fetchrentsList() {
    getRentApiCall()
      .then((res) => res.json())
      .then(
        (data) => {
          setIsLoaded(true);
          setRent(data);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }

  useEffect(() => {
    fetchrentsList();
  }, []);

  const deleteRent = (rentId) => {
    fetch(`http://localhost:3000/api/rents/${rentId}`, {
      method: "DELETE",
    })
      .then((res) => {
        console.log(res);
        navigate(`/rents`);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        navigate("/rents");
        window.location.reload();
      });
  };

  console.log(rents);

  return (
    <main>
      <h2>Rent List</h2>
      <br />
      <table className="list">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Car</th>
            <th>Price</th>
            <th>Pickup Date</th>
            <th>Return Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {rents.map(rent => (
            <tr key={rent._Id}>
              <td>{rent.customer.name} {rent.customer.lastName}</td>
              <td>{rent.car.brand} {rent.car.model}</td>
              <td>{rent.price}</td>
              <td>{rent.pickupDate}</td>
              <td>{rent.returnDate}</td>
              {isAuthenticated && <td>
                <Link className="button view" to={`/rents/details/${rent._Id}`}>
                  View
                </Link>
                <Link className="button edit" to={`/rents/edit/${rent._Id}`}>
                  Edit
                </Link>
                <a
                  className="button del"
                  onClick={() => deleteRent(rent._Id)}
                >
                  Delete
                </a>
              </td>}
            </tr>
          ))}
        </tbody>
      </table>

      <a type="button" href="/rents/add" className="button add">
        Add rent
      </a>
    </main>
  );
}

export default RentList;
