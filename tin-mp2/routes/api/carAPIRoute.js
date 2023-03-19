const express = require('express');
const router = express.Router();

const CarApiController = require('../../api/CarAPI');

router.get('/', CarApiController.getCars);
router.get('/:carId', CarApiController.getCarById);
router.post('/', CarApiController.createCar);
router.put('/:carId', CarApiController.updateCar);
router.delete('/:carId', CarApiController.deleteCar);

module.exports = router;