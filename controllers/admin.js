const Product = require('../models/product');

// Display the Add Product page
exports.getAddProducts = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false,
        product: {}
    });
};

// Handle the form submission for adding a new product
exports.postAddProducts = (req, res, next) => {
    const { title,price,description,imageUrl} = req.body;

    const product = new Product({title:title,price:price,description:description,imageUrl:imageUrl,userId:req.user._id});
    console.log('Product:', product);
    product
        .save()
        .then(() => {
            console.log('Product created successfully!');
            res.redirect('/admin/products');
        })
        .catch(err => {
            console.error('Error saving product:', err);
            res.status(500).send('Internal Server Error');
        });
};

// Handle the form submission for editing a product
exports.getEditProducts = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }

    const prodId = req.params.productId;

    Product.findById(prodId)
        .then(product => {
            if (!product) {
                return res.redirect('/');
            }
            res.render('admin/edit-product', {
                pageTitle: 'Edit Product',
                path: '/admin/edit-product',
                editing: editMode,
                product: product
            });
        })
        .catch(err => {
            console.log(err);
        });
};

// Handle the form submission for editing a product

exports.postEditProducts = (req, res, next) => {
    const { productId, title, imageUrl, description, price } = req.body;

    Product.findById(productId)
        .then(product => {
            if (!product) {
                console.log("Product not found!");
                return res.redirect('/admin/products');
            }
            // Create a new product instance with updated data
            product.title = title;
            product.price = price;
            product.description = description;
            product.imageUrl = imageUrl;

            return product.save();  
        })
        .then(() => {
            console.log("Product updated successfully!");
            res.redirect('/admin/products');
        })
        .catch(err => {
            console.error("Error updating product:", err);
        });
};



// Display the Admin Products page
exports.getProducts = (req, res, next) => {
    Product.find()
        .then(products => {
            res.render('admin/products', {
                prods: products,
                pageTitle: 'Admin Products',
                path: '/admin/products'
            });
        })
        .catch(err => {
            console.log(err);
        });
};

// Handle the form submission for deleting a product
exports.postDeleteProduct = (req, res, next) => {
    const productId = req.body.productId;
    Product.findByIdAndDelete(productId)
        .then(() => {
            console.log('Product Deleted');
            res.redirect('/admin/products');
        })
        .catch(err => {
            console.log(err);
        });
};