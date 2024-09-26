const express = require('express');
const {
  getProducts,
  getProductById,
  addProduct,
} = require('../controllers/productController');

const router = express.Router();

router.route('/')
  .get(getProducts)
  .post(addProduct);

router.route('/:id')
  .get(getProductById);

module.exports = router;