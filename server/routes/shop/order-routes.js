const express = require('express')

const { 
  createOrder, capturePayment, getAllOrdersByUsers, getOrderDetails 
} = require('../../controllers/shop/order-controller');

const router = express.Router();

router.post('/create', createOrder);
router.post('/capture', capturePayment);
router.get('/list/:userId', getAllOrdersByUsers);
router.get('/details/:id', getOrderDetails);

module.exports = router;