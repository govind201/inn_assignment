const express = require('express');
const router = express.Router();
const productComponents = require('../components/components');

router.get('/',productComponents.getAllProducts);

router.post('/',productComponents.postNewProduct);

router.get('/:productId',productComponents.getProduct);

router.put('/:productId',productComponents.updateProduct);

router.delete('/:productId',productComponents.deleteProduct);

module.exports = router;