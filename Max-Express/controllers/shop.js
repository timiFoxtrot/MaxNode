const Product = require ('../model/product');
const Cart = require ('../model/cart');

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/products-list', { 
            prods: products, 
            docTitle: 'Products', 
            path: '/products', 
            hasProduct: products.length>0, 
            activeShop:true 
        });
    });
};

exports.getProduct = (req, res, next) => {
    const prodID = req.params.productID
    // console.log(prodID);
    Product.finById(prodID, (product) => {
        // console.log(product);
        res.render('shop/product-detail', {
            product,
            docTitle: 'Product detail',
            path: '/products'
        })
    })
}

// Coming from post method from add-to-cart.ejs form
exports.postProduct = (req, res, next) => {
    const prodID = req.body.productID
    // console.log(prodID);
    Product.finById(prodID, (product) => {
        Cart.addProductToCart(prodID, product.price);
    })
    res.redirect('/cart')
}

exports.getIndex = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/index', { 
            prods: products, 
            docTitle: 'Shop', 
            path: '/', 
            hasProduct: products.length>0, 
            activeShop:true 
        });
    });
};

exports.getCart = (req, res, next) => {
    Cart.getCart((cart) => {
        Product.fetchAll(products => {
            const cartProducts = [];
            for (product of products) {
                cartProductData = cart.products.find(prod => prod.id === product.id);
                if (cartProductData) {
                    cartProducts.push({productData: product, productQty: cartProductData.qty});
                }
            }
            res.render('shop/cart', {
                path: '/cart',
                docTitle: 'Cart',
                products: cartProducts 
            })
        })
    })
};

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        path: '/orders',
        docTitle: 'Your orders'
    })
};

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        docTitle: 'Checkout'
    })
};