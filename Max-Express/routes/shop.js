const express = require('express');

const shopController = require ('../controllers/shop')

const path = require('path');

const router = express.Router();

router.get('/', shopController.getIndex);
router.get('/products', shopController.getProducts);
router.get('/product/:productID', shopController.getProduct);
router.get('/cart', shopController.getCart);
router.post('/cart', shopController.postProduct);
router.get('/orders', shopController.getOrders);
router.get('/checkout', shopController.getCheckout)

module.exports = router;