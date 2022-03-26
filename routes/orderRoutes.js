const express = require('express');
const router = express.Router();
const orderComponents = require('../components/components');

router.get('/',orderComponents.getAllOrders);

router.post('/',orderComponents.postNewOrder);

router.get('/:orderId',orderComponents.getOrder);

router.delete('/:orderId',orderComponents.deleteOrder);

module.exports = router;