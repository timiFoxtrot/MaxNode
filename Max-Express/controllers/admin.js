const Product = require ('../model/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', { 
    docTitle: 'Add it!', 
    path: '/admin/add-product',
    editing: false, 
    activeAddProduct:true })
    // res.sendFile(path.join(__dirname, '..', 'views', 'add-product.html'));
};

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title
    const imageURL = req.body.imageURL
    const price = req.body.price
    const description = req.body.description

    const product = new Product(null, title, imageURL, price, description);
    product.save();
    res.redirect('/') 
};

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    console.log(editMode);

    if (!editMode) {
        return res.redirect('/');
    }
    const prodID = req.params.productID;
    Product.finById(prodID, product => {
        res.render('admin/edit-product', { 
        docTitle: 'Edit it!', 
        path: '/admin/edit-product',
        editing: editMode,
        product,
        activeAddProduct:true })
        // res.sendFile(path.join(__dirname, '..', 'views', 'add-product.html'));
    })
};

exports.postEditProduct = (req, res, next) => {
    const prodID = req.body.productID
    console.log(prodID);
    const{title, price, imageURL, description} = req.body;
    const updatedProduct = new Product(prodID, title, imageURL, price, description)
    // const upTitle = req.body.title;
    // const upImageURL = req.body.imageURL;
    // const upPrice = req.body.price;
    // const upDesc = req.body.description
    // const updatedProduct = new Product(prodID, upTitle, upImageURL, upPrice, upDesc)
    updatedProduct.save();
    res.redirect('/admin/products');
}

exports.postDeleteProduct = (req, res, next) => {
    const prodID = req.body.productID;
    Product.deleteById(prodID);
    res.redirect('/admin/products');
}

exports.getAdminProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('admin/my-products', { 
            prods: products, 
            docTitle: 'Admin Products', 
            path: '/admin/products', 
            hasProduct: products.length>0, 
            activeShop:true 
        });
    });
};
