import { useEffect, useState } from "react";
import { getCarApiCall } from "../../apiCalls/carAPICalls";
import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../helper/authHelper";

function CarList() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [cars, setCars] = useState([]);

  const navigate = useNavigate();

  function fetchCarsList() {
    getCarApiCall()
      .then((res) => res.json())
      .then(
        (data) => {
          setIsLoaded(true);
          setCars(data);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }

  useEffect(() => {
    fetchCarsList();
  }, []);

  const deleteCar = (carId) => {
    fetch(`http://localhost:3000/api/cars/${carId}`, {
      method: "DELETE",
    })
      .then((res) => {
        console.log(res);
        navigate(`/cars`);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        navigate("/cars");
        window.location.reload();
      });
  };

  return (
    <main>
      <h2>Car List</h2>
      <br />
      <table className="list">
        <thead>
          <tr>
            <th>Model</th>
            <th>Brand</th>
            <th>Year of Release</th>
            <th>Milage</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => (
            <tr key={car._Id}>
              <td>{car.model}</td>
              <td>{car.brand}</td>
              <td>{car.yearOfRelease}</td>
              <td>{car.milage}</td>
              {isAuthenticated && 
              <td>
                <Link className="button view" to={`/cars/details/${car._Id}`}>
                  View
                </Link>
                <Link className="button edit" to={`/cars/edit/${car._Id}`}>
                  Edit
                </Link>
                <a
                  className="button del"
                  onClick={() => deleteCar(car._Id)}
                >
                  Delete
                </a>
              </td>}
            </tr>
          ))}
        </tbody>
      </table>

      <a type="button" href="/cars/add" className="button add">
        Add Car
      </a>
    </main>
  );
}

export default CarList;
