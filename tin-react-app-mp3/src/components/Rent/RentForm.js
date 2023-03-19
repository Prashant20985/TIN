import { useNavigate, useParams } from "react-router-dom";
import FormMode from "../../helper/formHelper";
import { useState, useEffect } from "react";
import {
  getRentByIdApiCall,
  updateRentApiCall,
  addRentApiCall,
} from "../../apiCalls/rentAPICalls";
import { getCustomersApiCall } from "../../apiCalls/customerAPICalls";
import { getCarApiCall } from "../../apiCalls/carAPICalls";
import { checkRequired } from "../../helper/ValidationCommon";
import FormInput from "../form/FormInput";
import FormButtons from "../form/FormButtons";

function RentForm() {
  const { rentId } = useParams();
  const currentFormMode = rentId ? FormMode.EDIT : FormMode.NEW;
  const navigate = useNavigate();

  const [rent, setRent] = useState({
    carId: "",
    customerId: "",
    price: "",
    returnDate: "",
    pickupDate: "",
  });

  const [errors, setErrors] = useState({
    carId: "",
    customerId: "",
    price: "",
    returnDate: "",
    pickupDate: "",
  });

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(null);
  const [message, setMessage] = useState(null);
  const [redirect, setRedirect] = useState(false);

  const [cars, setCars] = useState([]);
  const [customers, setCustomers] = useState([]);

  function fetchRentDetails() {
    getRentByIdApiCall(rentId)
      .then((res) => res.json())
      .then(
        (data) => {
          if (data.message) {
            setMessage(data.message);
          } else {
            setRent(data);
            setMessage(null);
          }
          setIsLoaded(true);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }

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

  function fetchCustomersList() {
    getCustomersApiCall()
      .then((res) => res.json())
      .then(
        (data) => {
          setIsLoaded(true);
          setCustomers(data);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }

  useEffect(() => {
    if (currentFormMode === FormMode.EDIT) {
      fetchRentDetails();
    }
    fetchCarsList();
    fetchCustomersList();
  }, []);

  console.log(customers);
  console.log(cars);

  useEffect(() => {
    if (redirect) {
      navigate("/rents");
    }
  }, [redirect]);

  function handleChange(event) {
    const { name, value } = event.target;
    const errorMessage = validateField(name, value);
    setErrors({
      ...errors,
      [name]: errorMessage,
    });
    setRent({
      ...rent,
      [name]: value,
    });
  }

  function validateField(fieldName, fieldValue) {
    let errorMessage = "";

    if (fieldName === "returnDate") {
      if (!checkRequired(fieldValue)) {
        errorMessage = "Field is required.";
      }
    }

    if (fieldName === "pickupDate") {
      if (!checkRequired(fieldValue)) {
        errorMessage = "Field is required.";
      }
    }

    if (fieldName === "price") {
      if (!checkRequired(fieldValue)) {
        errorMessage = "Field is required.";
      }
    }
    return errorMessage;
  }

  function validateForm() {
    let isValid = true;
    let serverFieldsErrors = { ...errors };
    Object.entries(rent).forEach(([key, value]) => {
      const errorMessage = validateField(key, value);
      serverFieldsErrors[key] = errorMessage;
      if (errorMessage.length > 0) {
        isValid = false;
      }
    });
    setErrors(serverFieldsErrors);
    return isValid;
  }

  function hasErrors() {
    let hasErrors = false;
    Object.values(errors).forEach((value) => {
      if (value.length > 0) {
        hasErrors = true;
      }
    });
    return hasErrors;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      let promise, response;
      if (currentFormMode === FormMode.NEW) {
        promise = addRentApiCall(rent);
      } else if (currentFormMode === FormMode.EDIT) {
        promise = updateRentApiCall(rentId, rent);
      }
      if (promise) {
        promise
          .then((data) => {
            response = data;
            if (response.status === 201 || response.status === 500) {
              return data.json();
            }
          })
          .then(
            (data) => {
              if (!response.ok && response.status === 500) {
                const serverFieldsErrors = { ...errors };
                for (const i in data) {
                  const errorItem = data[i];
                  const errorMessage = errorItem.message;
                  const fieldName = errorItem.path;
                  serverFieldsErrors[fieldName] = errorMessage;
                }
                setErrors(serverFieldsErrors);
                setError(null);
              } else {
                setRedirect(true);
              }
            },
            (error) => {
              setError(error);
            }
          );
      }
    }
  }

  const errorsSummary = hasErrors() ? "Form contains errors." : "";
  const fetchError = error ? `Error: ${error.message}` : "";
  const globalErrorMessage = errorsSummary || fetchError || message;

  const pageTitle = currentFormMode === FormMode.NEW ? "New rent" : "Edit rent";

  console.log(rent);

  return (
    <main>
      <h2>{pageTitle}</h2>
      <br />
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="customer" className="label">
          Customer:{" "}
          <abbr title="required" aria-label="required">
            *
          </abbr>
        </label>
        <select
          className="input"
          id="customer"
          name="customerId"
          required
          onChange={handleChange}
        >
          <option value="">--- Choose Customer ---</option>
          {customers.map((customer) => (
            <option
              selected={customer._Id === rent.customerId}
              key={customer._Id}
              value={customer._Id}
              label={customer.name + " " + customer.lastName}
            ></option>
          ))}
        </select>
        <span id="errorCustomerId" className="errors-text">
          {errors["customerId"]}
        </span>

        <label htmlFor="car" className="label">
          Car:{" "}
          <abbr title="required" aria-label="required">
            *
          </abbr>
        </label>
        <select
          className="input"
          id="car"
          name="carId"
          required
          onChange={handleChange}
        >
          <option value="">--- Choose Customer ---</option>
          {cars.map((car) => (
            <option
              selected={car._Id === rent.carId}
              key={car._Id}
              value={car._Id}
              label={car.brand + " " + car.model}
            ></option>
          ))}
        </select>
        <span id="errorCarId" className="errors-text">
          {errors["carId"]}
        </span>

        <FormInput
          type="date"
          label="Pickup Date"
          required
          error={errors["pickupDate"]}
          name="pickupDate"
          placeholder="Pickup Date"
          onChange={handleChange}
          value={rent["pickupDate"]}
        />

        <FormInput
          type="date"
          label="Return Date"
          required
          error={errors["returnDate"]}
          name="returnDate"
          placeholder="Return Date"
          onChange={handleChange}
          value={rent["returnDate"]}
        />

        <FormInput
          type="number"
          label="Price"
          required
          error={errors["price"]}
          name="price"
          placeholder="Price"
          onChange={handleChange}
          value={rent["price"]}
        />

        <FormButtons
          formMode={currentFormMode}
          error={globalErrorMessage}
          cancelPath="/rents"
        />
      </form>
    </main>
  );
}

export default RentForm;
