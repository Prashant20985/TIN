import { Link, useNavigate, useParams } from "react-router-dom";
import FormMode from "../../helper/formHelper";
import { useState, useEffect } from "react";
import {
  getCarByIdApiCall,
  updateCarApiCall,
  addCarApiCall,
} from "../../apiCalls/carAPICalls";
import {
  checkRequired,
  checkEmail,
  checkTextLengthRange,
} from "../../helper/ValidationCommon";
import FormInput from "../form/FormInput";
import FormInputDecimal from "../form/FormInputDecimal";
import FormButtons from "../form/FormButtons";

function CarForm() {
  const { carId } = useParams();
  const currentFormMode = carId ? FormMode.EDIT : FormMode.NEW;
  const navigate = useNavigate();

  const [car, setCar] = useState({
    model: "",
    brand: "",
    yearOfRelease: "",
    milage: "",
  });

  const [errors, setErrors] = useState({
    model: "",
    brand: "",
    yearOfRelease: "",
    milage: "",
  });

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(null);
  const [message, setMessage] = useState(null);
  const [redirect, setRedirect] = useState(false);

  function fetchCarDetails() {
    getCarByIdApiCall(carId)
      .then((res) => res.json())
      .then(
        (data) => {
          if (data.message) {
            setMessage(data.message);
          } else {
            setCar(data);
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

  useEffect(() => {
    if (currentFormMode === FormMode.EDIT) {
      fetchCarDetails();
    }
  }, []);

  useEffect(() => {
    if(redirect){
      navigate('/cars')
    }
  }, [redirect])

  function handleChange(event) {
    const { name, value } = event.target;
    const errorMessage = validateField(name, value);
    setErrors({
      ...errors,
      [name]: errorMessage,
    });
    setCar({
      ...car,
      [name]: value,
    });
  }

  function validateField(fieldName, fieldValue) {
    let errorMessage = "";
    if (fieldName === "model") {
      if (!checkRequired(fieldValue)) {
        errorMessage = "Field is required.";
      } else if (!checkTextLengthRange(fieldValue, 2, 60)) {
        errorMessage = "Filed should contain from 2 to 60 characters.";
      }
    }
    if (fieldName === "brand") {
      if (!checkRequired(fieldValue)) {
        errorMessage = "Field is required.";
      } else if (!checkTextLengthRange(fieldValue, 2, 60)) {
        errorMessage = "Field should contain from 2 to 60 characters.";
      }
    }
    if (fieldName === "yearOfRelease") {
      if (!checkRequired(fieldValue)) {
        errorMessage = "Field is required.";
      } else if (!checkTextLengthRange(fieldValue, 4,4)) {
        errorMessage = "Field should contain 4 characters.";
      }
    }
    if (fieldName === "milage") {
      if (!checkRequired(fieldValue)) {
        errorMessage = "Field is required.";
      }
    }
    return errorMessage;
  }

  function validateForm() {
    let isValid = true;
    let serverFieldsErrors = { ...errors };
    Object.entries(car).forEach(([key, value]) => {
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
        promise = addCarApiCall(car);
      } else if (currentFormMode === FormMode.EDIT) {
        promise = updateCarApiCall(carId, car);
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

  const pageTitle =
    currentFormMode === FormMode.NEW ? "New Car" : "Edit Car";

    console.log(car)
  return (
    <main>
      <h2>{pageTitle}</h2>
      <form className="form" onSubmit={handleSubmit}>
        <FormInput
          type="text"
          label="Model"
          required
          error={errors["model"]}
          name="model"
          placeholder="2-60 characters"
          onChange={handleChange}
          value={car["model"]}
        />
        <FormInput
          type="text"
          label="brand"
          required
          error={errors["brand"]}
          name="brand"
          placeholder="2-60 characters"
          onChange={handleChange}
          value={car["brand"]}
        />
        <FormInput
          type="number"
          label="Year Of Release"
          required
          error={errors["yearOfRelease"]}
          name="yearOfRelease"
          placeholder="Year"
          onChange={handleChange}
          value={car["yearOfRelease"]}
        />
        <FormInputDecimal
          type="number"
          step="0.01"
          label="Milage"
          required
          error={errors["milage"]}
          name="milage"
          placeholder="Milage"
          onChange={handleChange}
          value={car["milage"]}
        />
      <FormButtons
        formMode={currentFormMode}
        error={globalErrorMessage}
        cancelPath="/cars"
      />
      </form>
    </main>
  );
}

export default CarForm;
