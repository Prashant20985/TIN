import {
  errorReset,
  checkRequiredValues,
  checktextLength,
  validateDate,
} from "./validationFunctions";

function validateForm() {
  const customerInput = document.getElementById("customer");
  const carInput = document.getElementById("car");
  const pickupDateInput = document.getElementById("pickupDate");
  const returnDateInput = document.getElementById("returnDate");
  const priceInput = document.getElementById("price");

  const errorCustomer = document.getElementById("errorCustomer");
  const errorCar = document.getElementById("errorCar");
  const errorPickupDate = document.getElementById("errorPickupDate");
  const errorReturnDate = document.getElementById("errorReturnDate");
  const errorPrice = document.getElementById("errorPrice");

  let valid = true;

  errorReset(
    [
      customerInput,
      carInput,
      pickupDateInput,
      returnDateInput,
      priceInput,
      discountInput,
    ],
    [
      errorCustomer,
      errorCar,
      errorPickupDate,
      errorReturnDate,
      errorPrice,
      errorDiscount,
    ]
  );

  if (
    !checkRequiredValues(customerInput.value) ||
    customerInput.value == "--Select Customer--"
  ) {
    valid = false;
    customerInput.classList.add("error-input");
    errorCustomer.innerText = "Select a Customer";
  }

  if (!checkRequiredValues(carInput.value) || carInput.value == "--Select Car--") {
    valid = false;
    carInput.classList.add("error-input");
    errorCar.innerText = "Select a Car";
  }

  if (!checkRequiredValues(pickupDateInput.value)) {
    valid = false;
    pickupDateInput.classList.add("error-input");
    errorPickupDate.innerText = "Enter Pickup date";
  } else if (!validateDate(pickupDateInput.value)) {
    valid = false;
    pickupDateInput.classList.add("error-input");
    errorPickupDate.innerText = "Enter Date in valid format (MM-DD-YYYY)";
  }

  if (!checkRequiredValues(returnDateInput.value)) {
    valid = false;
    returnDateInput.classList.add("error-input");
    errorReturnDate.innerText = "Enter Pickup date";
  } else if (!validateDate(pickupDateInput.value)) {
    valid = false;
    returnDateInput.classList.add("error-input");
    errorReturnDate.innerText = "Enter Date in valid format (MM-DD-YYYY)";
  }

  if (!checkRequiredValues(priceInput.value)) {
    valid = false;
    priceInput.classList.add("error-input");
    errorPrice.innerText = "Enter Price";
  } else if (priceInput.value == "") {
    valid = false;
    priceInput.classList.add("invalid-input");
    errorPrice.innerText = "Enter Price Value";
  }

  return valid;
}
