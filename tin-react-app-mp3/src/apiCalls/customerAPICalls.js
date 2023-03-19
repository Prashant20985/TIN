import { getCurrentUser } from "../helper/authHelper";

const customerBaseURL = "http://localhost:3000/api/customers"

export function getCustomersApiCall() {
    const promise = fetch(customerBaseURL);
    return promise;
}

export function getCustomerByIdApiCall(customerId) {
    const promise = fetch(`${customerBaseURL}/${customerId}`);
    return promise;
}

export function addCustomerApiCall(customer) {
    const user = getCurrentUser();
    const customerString = JSON.stringify(customer)
    let token
    if (user && user.token) {
        token = user.token
    }
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: customerString
    }
    const promise = fetch(customerBaseURL, options);
    return promise;
}

export function updateCustomerApiCall(customerId, customer) {
    const url = `${customerBaseURL}/${customerId}`
    const customerString = JSON.stringify(customer)
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: customerString
    }
    const promise = fetch(url, options);
    return promise;
}