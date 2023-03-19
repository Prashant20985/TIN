const express = require('express');
const router = express.Router();

const CustomerApiController = require('../../api/CustomerAPI');
const isAuth = require('../../middleware/isAuth')

router.get('/', CustomerApiController.getCustomers);
router.get('/:customerId', CustomerApiController.getCustomerById);
router.post('/', CustomerApiController.createCustomer);
router.put('/:customerId', CustomerApiController.updateCustomer);
router.delete('/:customerId', isAuth, CustomerApiController.deleteCustomer);

module.exports = router;