const CarRepository = require('../repository/sequelize/CarRepo');

exports.showCarsList = (req, res, next) => {
    CarRepository.getCars()
        .then(cars => {
            res.render('pages/car/car-list', {
                cars: cars,
                navLocation: 'cars'
            });
        });
}

exports.showCarsFormNew = (req, res, next) => {
    res.render('pages/car/add-car-form', {
        car: {},
        pageTitle: 'New Car',
        formMode: 'createNew',
        btnLabel: 'Submit',
        formAction: '/cars/add',
        navLocation: 'cars',
        validationErrors: []
    });
}

exports.showCarsFormEdit = (req, res, next) => {
    const carId = req.params.carId;
    
    CarRepository.getCarById(carId)
        .then(car => {
            res.render('pages/car/add-car-form', {
                car: car,
                formMode: 'edit',
                pageTitle: 'Edit Car',
                btnLabel: 'Submit',
                formAction: '/cars/edit',
                navLocation: 'cars',
                validationErrors: []
            });
        });
}

exports.showCarsDetails = (req, res, next) => {
    const carId = req.params.carId;
    
    CarRepository.getCarById(carId)
        .then(car => {
            res.render('pages/car/add-car-form', {
                car: car,
                formMode: 'showDetails',
                pageTitle: 'Car Details',
                formAction: '',
                navLocation: 'cars',
                validationErrors: []
            });
        });
}

exports.addCar = (req, res, next) => {
    const carData = { ...req.body };
    
    CarRepository.createCar(carData)
        .then( result => {
            res.redirect('/cars');
        })
        .catch(err => {
            res.render('pages/car/add-car-form', {
                car: carData,
                formMode: 'createNew',
                pageTitle: 'New Car',
                btnLabel: 'Submit',
                formAction: '/cars/add',
                navLocation: 'cars',
                validationErrors: err.errors
            })
        });
};

exports.updateCar = (req, res, next) => {
    const carId = req.body._id;
    const carData = { ...req.body };
    let error;
    
    CarRepository.updateCar(carId, carData)
        .then(result => {
            res.redirect('/cars');
        })
        .catch(err => {
            error = err;
            return CarRepository.getCarById(carId)
        })
        .then(car => {
            res.render('pages/car/add-car-form', {
                car: car,
                formMode: 'edit',
                pageTitle: 'Edit Car',
                btnLabel: 'Submit',
                formAction: '/cars/edit',
                navLocation: 'cars'
            })
        });
};

exports.deleteCar = (req, res, next) => {
    const carId = req.params.carId;
    const carData = { ...req.body };
    
    CarRepository.deleteCar(carId)
        .then( () => {
            res.redirect('/cars');
        })
        .catch(err => {
            res.render('pages/car/add-car-form', {
                car: carData,
                formMode: 'delete',
                pageTitle: 'Delete Car',
                btnLabel: 'Delete',
                formAction: '/cars/delete',
                navLocation: 'cars',
                validationErrors: []
            })
        });
};