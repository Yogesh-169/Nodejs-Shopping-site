const Product = require('../models/product');

// Display the Add Product page
exports.getAddProducts = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false,
        product: {} // Pass an empty object for add-product mode
    });
};


// Handle the form submission for adding a new product
exports.postAddProducts = (req, res, next) => {
    const { prodId, title, imageUrl, description, price } = req.body;
    const product = new Product(prodId, title, imageUrl, description, price); // Pass all fields
    product.save(); // Save the product to the data source
    res.redirect('/'); // Redirect to the home page
};

exports.getEditProducts = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findById(prodId, product => {
        console.log(product);
        if (!product) {
            return res.redirect('/');
        }
        res.render('admin/edit-product', {
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            editing: editMode,
            product: product // Pass the product to the view

        });
    });
};

exports.postEditProducts = (req, res, next) => {
    const { productId, title, imageUrl, description, price } = req.body;

    // Create an updated product by passing all necessary fields including productId
    const updatedProduct = new Product(productId, title, imageUrl, description, price);

    updatedProduct.save();  // Save or update the product

    res.redirect('/admin/products');  // Redirect to the admin products page
}



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
