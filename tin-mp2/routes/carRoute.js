const express = require('express');
const router = express.Router();

const carController = require('../controllers/carController');

router.get('/', carController.showCarsList);
router.get('/add', carController.showCarsFormNew);
router.get('/edit/:carId', carController.showCarsFormEdit);
router.get('/details/:carId', carController.showCarsDetails);

router.post('/add', carController.addCar); 
router.post('/edit', carController.updateCar);
router.get('/delete/:carId', carController.deleteCar);

module.exports = router;