const Product = require('../models/product');


exports.getProducts=(req, res,next) => {
    // res.sendFile(path.join(rootDir,'views','Shop.html'));
   Product.fetchAll((products) => {
        res.render('shop/product-list', {prods: products, pageTitle: 'Shop', path: '/products'});
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


exports.getCart =(req,res,next) =>
{
    res.render('shop/cart', {path:'cart', pageTitle: 'Your Cart' });
};


exports.checkout =(req,res,next) =>
    {
        res.render=('shop/checkout',{
            pageTitle : 'Checkout',
            path: '/checkout'
        });
    };