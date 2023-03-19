const Customer = require('../../model/sequelize/Customer');
const Rent = require('../../model/sequelize/Rent');
const Car = require('../../model/sequelize/Car');

exports.getRents = () => {
    return Rent.findAll({
        include: [
        {
            model: Customer,
            as: 'customer'
        },
        {
            model: Car,
            as: 'car'
        }]
    });
};


exports.getRentById = (rentId) => {
    return Rent.findByPk(rentId, {
        include: [
            {
                model: Customer,
                as: 'customer'
            },
            {
                model: Car,
                as: 'car'
            }]
    });
};

exports.createRent = (data) => {
    console.log(JSON.stringify(data));

    return Rent.create({
        carId: data.carId,
        customerId: data.customerId,
        returnDate: data.returnDate,
        pickupDate: data.pickupDate,
        price: data.price,
        discount: data.discount
    });
};

exports.updateRent = (rentId, data) => {
    return Rent.update(data, {where: {_id: rentId }});
}

exports.deleteRent = (rentId) => {
    return Rent.destroy({
        where: { _id: rentId }
    });
}

exports.deleteManyRents = (rentIds) => {
    return Rent.find({ _id: { [Sequelize.Op.in]: rentIds }})
}