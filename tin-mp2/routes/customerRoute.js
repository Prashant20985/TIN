const express = require('express');
const router = express.Router();

const customerController = require('../controllers/customerController');

router.get('/', customerController.showCustomersList);
router.get('/add', customerController.showCustomersFormNew);
router.get('/edit/:customerId', customerController.showCustomersFormEdit);
router.get('/details/:customerId', customerController.showCustomersDetails);

router.post('/add', customerController.addCustomer); 
router.post('/edit', customerController.updateCustomer);
router.get('/delete/:customerId', customerController.deleteCustomer);

module.exports = router;