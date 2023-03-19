import {
  errorReset,
  checkRequiredValues,
  checktextLength,
} from "./validationFunctions";

function validateForm() {
  const modelInput = document.getElementById("model");
  const brandInput = document.getElementById("brand");
  const yearOfReleaseInput = document.getElementById("year");
  const milageInput = document.getElementById("milage");

  const errorModel = document.getElementById("errorModel");
  const errorBrand = document.getElementById("errorBrand");
  const errorYear = document.getElementById("errorYear");
  const errorMilage = document.getElementById("errorMilage");

  errorReset(
    [modelInput, brandInput, yearOfReleaseInput, milageInput],
    [errorModel, errorBrand, errorYear, errorMilage]
  );

  let valid = true;

  //Check Model
  if (!checkRequiredValues(modelInput.value)) {
    valid = false;
    modelInput.classList.add("invalid-input");
    errorModel.innerText = "Enter valid input for Model";
  } else if (!checktextLength(modelInput.value, 1, 30)) {
    valid = false;
    modelInput.classList.add("invalid-input");
    errorModel.innerText = "Please enter a value between 1 to 30 words";
  }

  //Check Brand
  if (!checkRequiredValues(brandInput.value)) {
    valid = false;
    brandInput.classList.add("invalid-input");
    errorBrand.innerText = "Enter valid input for Brand";
  } else if (!checktextLength(brandInput.value, 3, 30)) {
    valid = false;
    brandInput.classList.add("invalid-input");
    errorBrand.innerText = "Please enetr a value between 3 to 30 words";
  }

  //Check Year
  if (yearOfReleaseInput.value == "") {
    valid = false;
    yearOfReleaseInput.classList.add("invalid-input");
    errorYear.innerText = "Enter valid input for Year of Release";
  }

  //Check Milage
  if (milageInput.value == "") {
    valid = false;
    milageInput.classList.add("invalid-input");
    errorMilage.innerText = "Enter valid input for Brand";
  }

  return valid;
}
