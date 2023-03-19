const Customer = require('../../model/sequelize/Customer');
const Rent = require('../../model/sequelize/Rent');
const Car = require('../../model/sequelize/Car');
const authUtils = require('../../utils/authUtils')

exports.getCustomers = () => {
    return Customer.findAll({
        include: [{
            model: Rent,
            as: 'rents',
            include:[{
                model: Car,
                as : 'car'
            }]
        }]
    });
}

exports.getCustomerById = (customerId) => {
    return Customer.findByPk(customerId,
        {
            include: [{
                model: Rent,
                as: 'rents',
                include: [{
                    model: Car,
                    as: 'car'
                }]
            }]
        });
};

exports.createCustomer = (newCustomerData) => {
    return Customer.create({
        name: newCustomerData.name,
        lastName: newCustomerData.lastName,
        email: newCustomerData.email,
        phoneNumber: newCustomerData.phoneNumber,
        password: authUtils.hashPassword(newCustomerData.password)
    });
};

exports.updateCustomer = (customerId, customerData) => {
        const name = customerData.name;
        const lastName = customerData.lastName;
        const email = customerData.email;
        const phoneNumber = customerData.phoneNumber;
    return Customer.update(customerData, {where: {_id: customerId }});
};

exports.deleteCustomer = (customerId) => {
    return Customer.destroy({
        where: { _id: customerId }
    });
}; 

exports.findByEmail = (email) => {
    return Customer.findOne({
        where: {email : email}
    });
}