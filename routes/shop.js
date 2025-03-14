const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getIndex); 



// router.get('/about', (req, res) => {
//     res.render('shop/about', { pageTitle: 'About' });
// });

router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCart);

router.get('/orders', shopController.getOrders);

router.post('/create-order', shopController.postOrder);

router.get('/products', shopController.getProducts);

router.get('/products/:productId', shopController.getProduct);


// router.get('/checkout',shopController.checkout);

router.post('/cart-delete-item', shopController.postCartDeleteProduct);

module.exports = router;