import {
  errorReset,
  checkRequiredValues,
  checktextLength,
  validateEmail,
  validatePhoneNumber,
} from "./validationFunctions";

function validateForm() {
  const firstNameInput = document.getElementById("name");
  const lastNameInput = document.getElementById("lastName");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phoneNumber");

  const errorName = document.getElementById("errorName");
  const errorLastName = document.getElementById("errorLastName");
  const errorEmail = document.getElementById("errorEmail");
  const errorPhone = document.getElementById("errorPhone");

  const errorsSummary = document.getElementById('errorsSummary')

  errorReset(
    [firstNameInput, lastNameInput, emailInput, phoneInput],
    [errorName, errorLastName, errorEmail, errorPhone]
  );

  let valid = true;

  if (!checkRequiredValues(firstNameInput.value)) {
    valid = false;
    firstNameInput.classList.add("error-input");
    errorName.innerText = "Enter valid input for Name";
  } else if (!checktextLength(firstNameInput.value, 1, 30)) {
    valid = false;
    firstNameInput.classList.add("error-input");
    errorName.innerText = "Please enter a value between 1 to 30 words";
  }

  if (!checkRequiredValues(lastNameInput.value)) {
    valid = false;
    lastNameInput.classList.add("error-input");
    errorLastName.innerText = "Enter valid input for Last Name";
  } else if (!checktextLength(lastNameInput.value, 1, 30)) {
    valid = false;
    lastNameInput.classList.add("error-input");
    errorLastName.innerText = "Please enter a value between 1 to 30 words";
  }

  if (!checkRequiredValues(emailInput.value)) {
    valid = false;
    emailInput.classList.add("error-input");
    errorEmail.innerText = "Enter valid input for Email";
  } else if (!validateEmail(lastNameInput.value)) {
    valid = false;
    emailInput.classList.add("error-input");
    errorEmail.innerText = "Please enter a valid Email address";
  }

  if (!checkRequiredValues(phoneInput.value)) {
    valid = false;
    phoneInput.classList.add("error-input");
    errorPhone.innerText = "Enter valid input for Phone number";
  } else if (!validatePhoneNumber(phoneInput.value)) {
    valid = false;
    phoneInput.classList.add("error-input");
    errorPhone.innerText = "Please enter a valid Email address";
  }

  if (!valid)
        errorsSummary.innerText = "The form contains errors";

  return valid;
}
