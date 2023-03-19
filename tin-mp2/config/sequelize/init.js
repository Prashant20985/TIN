const sequelize = require('./sequelize');
const authUtils = require('../../utils/authUtils')
const Customer = require('../../model/sequelize/Customer');
const Car = require('../../model/sequelize/Car');
const Rent = require('../../model/sequelize/Rent');

const passHash1 = authUtils.hashPassword('12345');
const passHash2 = authUtils.hashPassword('123456');


module.exports = () => {
    Customer.hasMany(Rent, {as: 'rents', foreignKey: {name: 'customerId', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
    Rent.belongsTo(Customer, {as: 'customer', foreignKey: {name: 'customerId', allowNull: false} } );
    Car.hasMany(Rent, {as: 'rents', foreignKey: {name: 'carId', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
    Rent.belongsTo(Car, {as: 'car', foreignKey: {name: 'carId', allowNull: false} });


    let allCustomers, allCars;
    return sequelize
        .sync({force: true})
        .then( () => {
            return Customer.findAll();
        })
        .then(customers => {
            if( !customers || customers.length == 0 ) {
                return Customer.bulkCreate([
                    {name: 'Prashant', lastName: 'Sharma', email:'prashant@gmail.com', phoneNumber:'987654321', password:passHash1},
                    {name: 'Nishant', lastName: 'Singh', email:'Nishant@gmail.com', phoneNumber:'987654323', password:passHash2}
                ])
                .then( () => {
                    return Customer.findAll();
                });
            } else {
                return customers;
            }
        })
        .then( customers => {
            allCustomers = customers;
            return Car.findAll();
        })
        .then( cars => {
            if( !cars || cars.length == 0 ) {
                return Car.bulkCreate([
                    {model: 'S', brand:'Tesla', yearOfRelease:'2013', milage:'13.6' },
                    {model: 'E', brand:'Tesla', yearOfRelease:'2016', milage:'12.6' }
                ])
                .then( () => {
                    return Car.findAll();
                });
            } else {
                return cars;
            }
        })
        .then( cars => {
            allCars = cars;
            return Rent.findAll();
        })
        .then( rents => {
            if( !rents || rents.length == 0 ) {
                return Rent.bulkCreate([
                    {pickupDate:'2022-2-01', returnDate: '2022-03-01', price:'599.9', discount:null, customerId: 2, carId: 1},
                    {pickupDate:'2022-2-02', returnDate: '2022-03-01', price:'699.9', discount:'5', customerId: 2, carId: 2}
                ]);
            } else {
                return rents;
            }
        });
};