const express = require('express');
const router = express.Router();
// const rootDir = require('../util/path');
const adminController = require('../controllers/admin');


router.get('/add-product',adminController.getAddProducts);

router.post('/add-product',adminController.postAddProducts);

router.get('/products',adminController.getProducts);

router.get('/edit-product/:productId',adminController.getEditProducts);

module.exports= router;