const rentBaseURL = "http://localhost:3000/api/rents"

export function getRentApiCall() {
    const promise = fetch(rentBaseURL);
    return promise;
}

export function getRentByIdApiCall(rentId) {
    const promise = fetch(`${rentBaseURL}/${rentId}`);
    return promise;
}

export function addRentApiCall(rent) {
    const rentString = JSON.stringify(rent)
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: rentString
    }
    const promise = fetch(rentBaseURL, options);
    return promise;
}

export function updateRentApiCall(rentId, rent) {
    const url = `${rentBaseURL}/${rentId}`
    const carString = JSON.stringify(rent)
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: carString
    }
    const promise = fetch(url, options);
    return promise;
}