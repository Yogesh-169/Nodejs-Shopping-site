const Product = require('../models/product');
const Order =require('../models/order');

// Fetch all products and render the product list page
exports.getProducts = (req, res, next) => {
    Product.find()
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
    Product.find()
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
        .populate('cart.items.productId')
        .then(user => {
         
            cartProducts = user.cart.items; 
            res.render('shop/cart', {
                path: '/cart',
                pageTitle: 'Your Cart',
                products: cartProducts, // Send the processed product list
            });
        })
        .catch(err => console.log(err));
};

// Add a product to the cart
exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    
    Product.findById(prodId)
        .then(product => {
            return req.user.addToCart(product);
        })
        .then(result => {
            res.redirect('/cart'); // Redirect to the cart after adding item
        })
        .catch(err => console.log(err));
};

// Render the orders page
exports.getOrders = (req, res, next) => {
    Order.find({ 'user.userId': req.user._id })
        .populate('products.product')  // ✅ Populate product details
        .then(orders => {
            res.render('shop/orders', {
                path: '/orders',
                pageTitle: 'Your Orders',
                orders: orders
            });
        })
        .catch(err => console.log(err));
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
    Product.findById(prodId)
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
    req.user.removeFromCart(prodId)
        .then(result => {
            res.redirect('/cart');
        })
        .catch(err => console.log(err));
};

// Create an order
exports.postOrder = (req, res, next) => {
    req.user
    .populate('cart.items.productId')
    .then(user => {
        const products = user.cart.items.map(i => {
return { quantity: i.quantity, product: i.productId };
}
)
            const order = new Order({                
                user: {
                    name: req.user.name,
                    userId: req.user
                },
                products: products
            });
            req.user.clearCart();
            return order.save();
        },)
    .then(() => {
        res.redirect('/orders');
    })
    .catch(err => console.log(err));
};
