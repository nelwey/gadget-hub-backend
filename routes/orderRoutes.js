const express = require('express');
const {
    getOrder,
    addOrder,
} = require('../controllers/orderController');

const router = express.Router();

router.route('/')
    .get(getOrder)
    .post(addOrder);

module.exports = router;