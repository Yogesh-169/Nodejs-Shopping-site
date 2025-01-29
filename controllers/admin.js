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
    const { prodId, title, imageUrl, description, price } = req.body;

    const product = new Product(prodId, title, imageUrl, description, price);

    req.user.createProduct({
        title: title,
        price: price,
        imageUrl: imageUrl,
        description: description,
        
    })
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

    req.user.getProducts({ where: { id: prodId } })
        .then(products => {
            const product = products[0];
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

    Product.findByPk(productId)
        .then(product => {
            product.title = title;
            product.price = price;
            product.imageUrl = imageUrl;
            product.description = description;
            return product.save();
        })
        .then(() => {
            res.redirect('/admin/products');
        })
        .catch(err => {
            console.log(err);
        });
};


// Display the Admin Products page
exports.getProducts = (req, res, next) => {
    req.user.getProducts()
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

    Product.destroy({ where: { id: productId } })
        .then(() => {
            console.log('Product Deleted');
            res.redirect('/admin/products');
        })
        .catch(err => {
            console.log(err);
        });
};
