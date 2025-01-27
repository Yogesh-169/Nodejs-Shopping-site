const Product = require('../models/product');
const Cart = require('../models/cart');
exports.getProducts = (req, res, next) => {
    // res.sendFile(path.join(rootDir,'views','Shop.html'));
    Product.fetchAll((products) => {
        res.render('shop/product-list', { prods: products, pageTitle: 'Products', path: '/products' });
    });
    // res.render('shop', {prods: products, pageTitle: 'Shop'});
};

exports.getIndex = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/index', {
            prods: products,
            pageTitle: 'Shop',
            path: '/'
        });
    });
};


exports.getCart = (req, res, next) => {
    res.render('shop/cart', { path: 'cart', pageTitle: 'Your Cart' });
};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, product => {
        Cart.addProduct(prodId, product.price);
    });
    res.redirect('/cart');
};

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', { path: 'orders', pageTitle: 'Your Orders' });
};


exports.checkout = (req, res, next) => {
    res.render = ('shop/checkout', {
        pageTitle: 'Checkout',
        path: '/checkout'
    });
};

exports.getProduct  = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId, product => {
        res.render('shop/product-detail', { product: product, pageTitle: product.title, path: '/products' });
    });
};