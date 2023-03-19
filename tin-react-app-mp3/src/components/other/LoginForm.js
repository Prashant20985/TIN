import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loginApiCall } from "../../apiCalls/authAPICalls";
import { checkRequired } from "../../helper/ValidationCommon";
import { Link } from "react-router-dom";
import FormInput from "../form/FormInput";

function LoginForm(props) {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(null);
  const [message, setMessage] = useState(null);

  const navigate = useNavigate();

  function handleChange(event) {
    const { name, value } = event.target;
    const errorMessage = validateField(name, value);
    setErrors({
      ...errors,
      [name]: errorMessage,
    });
    setUser({
      ...user,
      [name]: value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const isValid = validateForm();

    if (isValid) {
      let response;
      loginApiCall(user)
        .then((res) => {
          response = res;
          return res.json();
        })
        .then(
          (data) => {
            if (response.status === 200) {
              if (data.token) {
                const userString = JSON.stringify(data);
                props.handleLogin(userString);
                navigate(-1);
              } else if (response.status === 401) {
                setMessage(data.message);
              }
            }
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        );
    }
  }

  function validateField(fieldName, fieldValue) {
    let errorMessage = "";
    if (fieldName === "email") {
      if (!checkRequired(fieldValue)) {
        errorMessage = "Field is required.";
      }
    }
    if (fieldName === "password") {
      if (!checkRequired(fieldValue)) {
        errorMessage = "Field is required.";
      }
    }
    return errorMessage;
  }

  function validateForm() {
    let isValid = true;
    let serverFieldsErrors = { ...errors };
    Object.entries(user).forEach(([key, value]) => {
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

  const errorsSummary = hasErrors() ? "Form contains errors." : "";
  const fetchError = error ? `Error: ${error.message}` : "";
  const globalErrorMessage = errorsSummary || fetchError || message;

  return (
    <main>
      <div id="login">
        <h2>Login</h2>
        <form className="form" method="post" onSubmit={handleSubmit}>
          <FormInput
            name="email"
            value={user.email}
            error={errors.email}
            label="Email"
            onChange={handleChange}
            type="text"
          />
          <FormInput
            name="password"
            value={user.password}
            error={errors.password}
            label="Password"
            onChange={handleChange}
            type="password"
          />
          <div className="form-buttons">
            <p id="errorsSummary" className="errors-text">
              {globalErrorMessage}
            </p>
            <input
              className="button submit"
              type="submit"
              value="Login"
            />
            <Link to="/" className="button cancel">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}

export default LoginForm;
