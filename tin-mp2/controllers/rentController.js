const RentRepository = require('../repository/sequelize/RentRepo');
const CustomerRepository = require('../repository/sequelize/CustomerRepo');
const CarRepository = require('../repository/sequelize/CarRepo');

exports.showRentList = (req, res, next) => {
    RentRepository.getRents()
        .then(rents => {
            res.render('pages/rent/rent-list', {
                rents: rents,
                pageTitle: 'List Rents',
                navLocation: 'rent'
            });
        });
}

exports.showRentFormNew = (req, res, next) => {
    let allCustomers, allCars;
    
    RentRepository.getRents()
        .then(rents => {
            allRents = rents;
            return CustomerRepository.getCustomers();
        })
        .then(customers => {
            allCustomers = customers;
            return CarRepository.getCars();
        })
        .then(books => {
            allCars = books;
            res.render('pages/rent/rent-form', {
                rent: {},
                allCustomers: allCustomers,
                allCars: allCars,
                formMode: 'createNew',
                pageTitle: 'New Rent',
                btnLabel: 'Add Rent',
                formAction: '/rent/add',
                navLocation: 'rent',
                validationErrors: []
            });
        });
}

exports.showRentFormEdit = (req, res, next) => {
    const rentId = req.params.rentId;
    let allCustomers, allCars, allRents;
    
    RentRepository.getRents()
        .then(rents => {
            allRents = rents;
            return CustomerRepository.getCustomers();
        })
        .then(customers => {
            allCustomers = customers;
            return CarRepository.getCars();
        })
        .then(cars => {
            allCars = cars;
            return RentRepository.getRentById(rentId);
        })
        .then(rent => {
            res.render('pages/rent/rent-form', {
                rent: rent,
                allCustomers: allCustomers,
                allCars: allCars,
                allRents: allRents,
                formMode: 'edit',
                pageTitle: 'Edit Rent',
                btnLabel: 'Save Edit',
                formAction: '/rent/edit',
                navLocation: 'rent',
                validationErrors: []
            });
        });
}

exports.showRentDetails = (req, res, next) => {
    const rentId = req.params.rentId;
    let allCustomers, allCars;
    
    CustomerRepository.getCustomers()
        .then(customers => {
            allCustomers = customers;
            return CarRepository.getCars();
        })
        .then(books => {
            allCars = books;
            return RentRepository.getRentById(rentId)
        })
        .then(rent => {
            res.render('pages/rent/rent-form', {
                rent: rent,
                allCustomers: allCustomers,
                allCars: allCars,
                formMode: 'showDetails',
                pageTitle: 'Rent Details',
                formAction: '',
                navLocation: 'rent',
                validationErrors: []
            });
        });     
}

exports.addRent = (req, res, next) => {
    let allCustomers, allCars, error;
    const rentData = { ...req.body };
    
    RentRepository.createRent(rentData)
        .then(result => {
            res.redirect('/rent');
        })
        .catch(err => {
            error = err;
            return CustomerRepository.getCustomers();   
        })
        .then(customers => {
            allCustomers= customers;
            return CarRepository.getCars()
        })
        .then(cars => {
            allCars = cars;
            res.render('pages/rent/rent-form', {
                rent: {},
                allCustomers: allCustomers,
                allCars: allCars,
                formMode: 'createNew',
                pageTitle: 'New Rent',
                btnLabel: 'Add Rent',
                formAction: '/rent/add',
                navLocation: 'rent'
            });
        });
};



exports.updateRent = (req, res, next) => {
    let allCustomers, allCars, error;
    const rentId = req.body._id;
    const rentData = { ...req.body };
    
    RentRepository.updateRent(rentId, rentData)
        .then(result => {
            res.redirect('/rent');
        })
        .catch(err => { 
            error = err;
            return CustomerRepository.getCustomers()
        })
        .then(customers => {
            allCustomers = customers;
            return CarRepository.getCars();
        })
        .then(cars => {
            allCars = cars;
            return RentRepository.getRentById(rentId)
        })
        .then(rent => {
            res.render('pages/rent/rent-form', {
                rent: rent,
                allCustomers: allCustomers,
                allCars: allCars,
                formMode: 'edit',
                pageTitle: 'Edit Rent',
                btnLabel: 'Save Edit',
                formAction: '/rent/edit',
                navLocation: 'rent'
            });
        });
};

exports.deleteRent = (req, res, next) => {
    const rentId = req.params.rentId;
    
    RentRepository.deleteRent(rentId)
        .then(() => {
            res.redirect('/rent');
        })
        .catch(err => {
            res.render('pages/rent/rent-form', {
                rent: rentData,
                pageTitle: 'Delete Rent',
                formMode: 'delete',
                btnLabel: 'Delete',
                formAction: '/rent/delete',
                navLocation: 'rent',
                validationErrors: []
            })
        });
};