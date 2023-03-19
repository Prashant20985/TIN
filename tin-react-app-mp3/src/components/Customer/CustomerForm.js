import { Link, useNavigate, useParams } from "react-router-dom";
import FormMode from "../../helper/formHelper";
import { useState, useEffect } from "react";
import {
  getCustomerByIdApiCall,
  updateCustomerApiCall,
  addCustomerApiCall,
} from "../../apiCalls/customerAPICalls";
import {
  checkRequired,
  checkEmail,
  checkTextLengthRange,
} from "../../helper/ValidationCommon";
import FormInput from "../form/FormInput";
import FormButtons from "../form/FormButtons";


function CustomerForm() {
  const { customerId } = useParams();
  const currentFormMode = customerId ? FormMode.EDIT : FormMode.NEW;
  const navigate = useNavigate();

  const [customer, setCustomer] = useState({
    name: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password:""
  });

  const [errors, setErrors] = useState({
    name: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password:""
  });

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(null);
  const [message, setMessage] = useState(null);
  const [redirect, setRedirect] = useState(false);

  function fetchCustomerDetails() {
    getCustomerByIdApiCall(customerId)
      .then((res) => res.json())
      .then(
        (data) => {
          if (data.message) {
            setMessage(data.message);
          } else {
            setCustomer(data);
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
      fetchCustomerDetails();
    }
  }, []);

  useEffect(() => {
    if(redirect){
      navigate('/customers')
    }
  }, [redirect])

  function handleChange(event) {
    const { name, value } = event.target;
    const errorMessage = validateField(name, value);
    setErrors({
      ...errors,
      [name]: errorMessage,
    });
    setCustomer({
      ...customer,
      [name]: value,
    });
  }

  function validateField(fieldName, fieldValue) {
    let errorMessage = "";
    if (fieldName === "name") {
      if (!checkRequired(fieldValue)) {
        errorMessage = "Field is required.";
      } else if (!checkTextLengthRange(fieldValue, 2, 60)) {
        errorMessage = "Filed should contain from 2 to 60 characters.";
      }
    }
    if (fieldName === "lastName") {
      if (!checkRequired(fieldValue)) {
        errorMessage = "Field is required.";
      } else if (!checkTextLengthRange(fieldValue, 2, 60)) {
        errorMessage = "Field should contain from 2 to 60 characters.";
      }
    }
    if (fieldName === "email") {
      if (!checkRequired(fieldValue)) {
        errorMessage = "Field is required.";
      } else if (!checkTextLengthRange(fieldValue, 5, 60)) {
        errorMessage = "Field should contain from 5 to 60 characters.";
      } else if (!checkEmail(fieldValue)) {
        errorMessage = "Field should contain valid e-mail address.";
      }
    }
    if (fieldName === "phoneNumber") {
      if (!checkRequired(fieldValue)) {
        errorMessage = "Field is required.";
      } else if (!checkTextLengthRange(fieldValue, 9, 9)) {
        errorMessage = "Field should contain 9 characters.";
      }
    }
    return errorMessage;
  }

  function validateForm() {
    let isValid = true;
    let serverFieldsErrors = { ...errors };
    Object.entries(customer).forEach(([key, value]) => {
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
        promise = addCustomerApiCall(customer);
      } else if (currentFormMode === FormMode.EDIT) {
        promise = updateCustomerApiCall(customerId, customer);
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
    currentFormMode === FormMode.NEW ? "New Customer" : "Edit Customer";

    console.log(customer)
  return (
    <main>
      <h2>{pageTitle}</h2>
      <form className="form" onSubmit={handleSubmit}>
        <FormInput
          type="text"
          label="First name"
          required
          error={errors["name"]}
          name="name"
          placeholder="2-60 characters"
          onChange={handleChange}
          value={customer["name"]}
        />
        <FormInput
          type="text"
          label="Last name"
          required
          error={errors["lastName"]}
          name="lastName"
          placeholder="2-60 characters"
          onChange={handleChange}
          value={customer["lastName"]}
        />
        <FormInput
          type="text"
          label="E-mail"
          required
          error={errors["email"]}
          name="email"
          placeholder="np. name@domain.com"
          onChange={handleChange}
          value={customer["email"]}
        />
        
        <FormInput
          type="number"
          label="Phone Number"
          required
          error={errors["phoneNumber"]}
          name="phoneNumber"
          placeholder="Phone Number"
          onChange={handleChange}
          value={customer["phoneNumber"]}
        />
        {currentFormMode === FormMode.NEW && 
        <FormInput
          type="text"
          label="Password"
          required
          error={errors["password"]}
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={customer["password"]}
        />}
        
      <FormButtons
        formMode={currentFormMode}
        error={globalErrorMessage}
        cancelPath="/customers"
      />
      </form>
    </main>
  );
}

export default CustomerForm;
