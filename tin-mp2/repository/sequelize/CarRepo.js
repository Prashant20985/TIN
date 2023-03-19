const Customer = require('../../model/sequelize/Customer');
const Rent = require('../../model/sequelize/Rent');
const Car = require('../../model/sequelize/Car');

exports.getCars = () => {
    return Car.findAll({
            include: [{
                model: Rent,
                as: 'rents',
                include: [{
                    model: Customer,
                    as: 'customer'
                }]
            }]
    });
};

exports.getCarById = (carId) => {
    return Car.findByPk(carId,
        {
            include: [{
                model: Rent,
                as: 'rents',
                include: [{
                    model: Customer,
                    as: 'customer'
                }]
            }]
        });
};

exports.createCar = (newCarData) => {
    return Car.create({
        model: newCarData.model,
        brand: newCarData.brand,
        yearOfRelease: newCarData.yearOfRelease,
        milage: newCarData.milage
    });
};

exports.updateCar = (carId, carData) => {
    const model = carData.model;
    const brand = carData.brand;
    const yearOfRelease = carData.yearOfRelease;
    const milage = carData.milage;
    return Car.update(carData, {where: {_id: carId }});
};

exports.deleteCar = (carId) => {
    return Car.destroy({
        where: { _id: carId }
    });
}; 