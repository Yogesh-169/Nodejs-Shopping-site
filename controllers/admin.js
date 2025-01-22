const Product = require('../models/product');

// Display the Add Product page
exports.getAddProducts = (req, res, next) => {
    res.render('admin/add-product', { 
        pageTitle: 'Add Product', 
        path: '/admin/add-product' 
    });
};


  

// Handle the form submission for adding a new product
exports.postAddProducts = (req, res, next) => {
    const { title, imageUrl, description, price } = req.body;
    const product = new Product(title, imageUrl, description, price); // Pass all fields
    product.save(); // Save the product to the data source
    res.redirect('/admin/products'); // Redirect to the admin products list
};


// Display the Admin Products page
exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('admin/products', { 
            prods: products, 
            pageTitle: 'Admin Products', 
            path: '/admin/products' 
        });
    });
};
