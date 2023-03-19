const carBaseURL = "http://localhost:3000/api/cars" 

export function getCarApiCall() {
    const promise = fetch(carBaseURL);
    return promise;
}

export function getCarByIdApiCall(carId) {
    const promise = fetch(`${carBaseURL}/${carId}`);
    return promise;
}

export function addCarApiCall(car) {
    const carString = JSON.stringify(car)
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: carString
    }
    const promise = fetch(carBaseURL, options);
    return promise;
}

export function updateCarApiCall(carId, car) {
    const url = `${carBaseURL}/${carId}`
    const carString = JSON.stringify(car)
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
