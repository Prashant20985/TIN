export function errorReset(inputs, errorText) {
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].classList.remove("inalid-input");
  }

  for (let i = 0; i < errorText.length; i++) {
    errorText[i].innerText = "";
  }
}

export function checkRequiredValues(inputValue) {
  if (!inputValue) return false;

  inputValue = inputValue.toString().trim();
  if (inputValue === "") return false;

  return true;
}

export function checktextLength(inputValue, min, max) {
  if (!inputValue) return false;

  inputValue = inputValue.toString().trim();
  const size = inputValue.length;

  if (size > max && size < min) return false;

  return true;
}

export function validateEmail(inputValue) {
  if (!inputValue) return false;

  inputValue = inputValue.toString().trim();

  var emailFormat =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return emailFormat.test(inputValue);
}

export function validatePhoneNumber(inputValue) {
  if (!inputValue) return false;

  inputValue = inputValue.toString().trim();

  var phoneFormat = /{1-9}{3}\-{1-9}{3}\-{1-9}{3}/i;

  return phoneFormat.test(inputValue);
}

export function validateDate(inputValue){
  if(!inputValue) return false;

  var dateFormat = /(\d{2})-(\d{2})-(\d{4})/;

  return dateFormat.test(inputValue);
}