const Product = require('../models/product');


// Fetch all products and render the product list page
exports.getProducts = (req, res, next) => {
    Product.findAll()
        .then(products => {
            res.render('shop/product-list', {
                prods: products,
                pageTitle: 'Products',
                path: '/products'
            });
        })
        .catch(err => {
            console.log(err);
        });
};

// Fetch all products and render the homepage
exports.getIndex = (req, res, next) => {
    Product.findAll()
        .then(products => {
            res.render('shop/index', {
                prods: products,
                pageTitle: 'Shop',
                path: '/'
            });
        })
        .catch(err => {
            console.log(err);
        });
};

// Fetch and display products in the cart
exports.getCart = (req, res, next) => {
    req.user
        .getCart()
        .then(cart => {
            return cart.getProducts()
                .then(products => {
                    res.render('shop/cart', {
                        path: '/cart',
                        pageTitle: 'Your Cart',
                        products: products, // Use the fetched products here
                    });
                })
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
};


// Add a product to the cart
exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    let fetchedCart;

    req.user.getCart()
        .then(cart => {
            fetchedCart = cart;
            return cart.getProducts({ where: { id: prodId } });
        })
        .then(products => {
            let product;
            let newQuantity = 1;

            if (products.length > 0) {
                product = products[0];
                newQuantity = product.cartItem.quantity + 1;
                return product.cartItem.update({ quantity: newQuantity });  // Update quantity directly
            }

            return Product.findByPk(prodId)
                .then(product => {
                    if (!product) {
                        throw new Error('Product not found');
                    }
                    return fetchedCart.addProduct(product, { through: { quantity: newQuantity } });
                });
        })
        .then(() => {
            res.redirect('/cart');
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Something went wrong'); // Better error handling
        });
};


// Render the orders page
exports.getOrders = (req, res, next) => {
    req.user.getOrders({ include: ['products'] })
        .then(orders => {
            res.render('shop/orders', {
                path: '/orders',
                pageTitle: 'Your Orders',
                orders: orders
            });
        }
        ).catch(err => {
            console.logg(err);
        })
};

// Render the checkout page
exports.checkout = (req, res, next) => {
    res.render('shop/checkout', {
        pageTitle: 'Checkout',
        path: '/checkout'
    });
};

// Fetch details for a single product and render the product detail page
exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findByPk(prodId)
        .then(product => {
            if (!product) {
                return res.status(404).send('Product not found'); // Handle product not found
            }
            res.render('shop/product-detail', {
                product: product,
                pageTitle: product.title,
                path: '/products'
            });
        })
        .catch(err => {
            console.error('Error fetching product:', err);
            res.status(500).send('Internal Server Error'); // Handle server-side errors
        });
};

// Delete a product from the cart
exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    req.user.getCart()
        .then(
            cart => {
                return cart.getProducts({ where: { id: prodId } });
            })
        .then(products => {
            const product = products[0];
            return product.cartItem.destroy();
        })
        .then(result => {
            res.redirect('/cart');
        })
        .catch(err => console.log(err));
}; 



// Create an order
exports.postOrder = (req, res, next) => {

    let fetchedCart;


    req.user.getCart().then(
        cart => {
            fetchedCart = cart;
            return cart.getProducts();
        }

    ).then(products => {
        return req.user.createOrder()
            .then(
                order => {
                    order.addProducts(products.map(product => {
                        product.orderItem = { quantity: product.cartItem.quantity };
                        return product;
                    })
                    );
                }
            ).then(
                result => {
                    return fetchedCart.setProducts(null);
                }
            )
            .then(result => {
                res.redirect('/orders');
            })
            .catch(err => console.log(err));
    })
        .catch(
            err => console.log(err)
        );
};
