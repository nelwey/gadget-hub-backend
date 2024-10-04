const express = require('express');
const {
    getCart,
    addProduct,
    updateProductQuantity,
    removeFromCart
} = require('../controllers/cartController');

const router = express.Router();

router.route('/')
    .get(getCart)
    .post(addProduct);
router.put('/update/:productId', updateProductQuantity);
router.delete('/remove/:productId', removeFromCart);

module.exports = router;