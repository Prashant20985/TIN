const CustomerRepository = require('../repository/sequelize/CustomerRepo');

exports.showCustomersList = (req, res, next) => {
    CustomerRepository.getCustomers()
        .then(customers => {
            res.render('pages/customers/customers-list', {
                customers: customers,
                navLocation: 'customers'
            });
        });
}

exports.showCustomersFormNew = (req, res, next) => {
        res.render('pages/customers/customers-form', {
        customer: {},
        pageTitle: 'New Customer',
        formMode: 'createNew',
        btnLabel: 'Add Customer',
        formAction: '/customers/add',
        navLocation: 'customers',
        validationErrors: []
    });
}

exports.showCustomersFormEdit = (req, res, next) => {
    const customerId = req.params.customerId;
    
    CustomerRepository.getCustomerById(customerId)
        .then(customer => {
            res.render('pages/customers/customers-form', {
                customer: customer,
                formMode: 'edit',
                pageTitle: 'Edit Customer',
                btnLabel: 'Save Edit',
                formAction: '/customers/edit',
                navLocation: 'customers',
                validationErrors: []
            });
        });
}

exports.showCustomersDetails = (req, res, next) => {
    const customerId = req.params.customerId;
    
    CustomerRepository.getCustomerById(customerId)
        .then(customer => {
            res.render('pages/customers/customers-form', {
                customer: customer,
                formMode: 'showDetails',
                pageTitle: 'Customer Details',
                formAction: '',
                navLocation: 'customers',
                validationErrors: []
            });
        });
}

exports.addCustomer = (req, res, next) => {
    const customerData = { ...req.body };
    
    CustomerRepository.createCustomer(customerData)
        .then( result => {
            res.redirect('/customers');
        })
        .catch(err => {
            res.render('pages/customers/customers-form', {
                customer: customerData,
                pageTitle: 'New Customer',
                formMode: 'createNew',
                btnLabel: 'Add Customer',
                formAction: '/customers/add',
                navLocation: 'customers',
                validationErrors: err.errors
            })
        });
};

exports.updateCustomer = (req, res, next) => {
    const customerId = req.body._id;
    const customerData = { ...req.body };
    let error;
    
    CustomerRepository.updateCustomer(customerId, customerData)
        .then(result => {
            res.redirect('/customers');
        })
        .catch(err => {
            error = err;
            return CustomerRepository.getCustomerById(customerId)
        })
        .then(customer => {
            res.render('pages/customers/customers-form', {
                customer: customer,
                formMode: 'edit',
                pageTitle: 'Edit Customer',
                btnLabel: 'Save Edit',
                formAction: '/customers/edit',
                navLocation: 'customers'
            })
        });
};

exports.deleteCustomer = (req, res, next) => {
    const customerId = req.params.customerId;
    const customerData = { ...req.body };
    
    CustomerRepository.deleteCustomer(customerId)
        .then( () => {
            res.redirect('/customers');
        })
        .catch(err => {
            res.render('pages/customers/customers-form', {
                customer: customerData,
                formMode: 'delete',
                pageTitle: 'Delete Customer',
                btnLabel: 'Delete',
                formAction: '/customers/delete',
                navLocation: 'customers',
                validationErrors: []
            })
        });
};