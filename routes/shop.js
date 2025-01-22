const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getIndex); 



router.get('/about', (req, res) => {
    res.render('shop/about', { pageTitle: 'About' });
});

router.get('/cart', shopController.getCart);


router.get('/products', shopController.getProducts);

router.get('/checkout',shopController.checkout);


module.exports = router;