const fs = require('fs');
const path = require('path');

const Cart = require('./cart');

const p = path.join(__dirname, '../data/products.json');

const getProductsFromFile = cb => {
    fs.readFile(p, (err, fileContent) => {
        if(err) {
            cb([]);
        } else {
            cb(JSON.parse(fileContent))
        };
    })
}

module.exports = class Product {
    constructor (id, t, imgURL, price, desc) {
        this.id = id
        this.bookTitle = t
        this.imageURL = imgURL
        this.price = price
        this.description = desc
    };

    save () {
        // fs.readFile(p, (err, fileContent) => {
        //     let products = [];
        //     // console.log(err);
        //     if(!err) {
        //         products = JSON.parse(fileContent);
        //         console.log(products);
        //     }
        //     products.push(this)
        //     fs.writeFile(p, JSON.stringify(products), (err) => {
        //         console.log(err);
        //     })
        // })
        getProductsFromFile(products => {
            if (this.id) {
                const existingProductIndex = products.findIndex(prod => prod.id === this.id);
                console.log(existingProductIndex);
                const updatedProducts = [...products];
                updatedProducts[existingProductIndex] = this;
                fs.writeFile(p, JSON.stringify(updatedProducts), err => {
                    console.log(err);
                })
            } else {
                this.id = Math.random().toString();
                products.push(this);
                fs.writeFile(p, JSON.stringify(products), err => {
                    console.log(err);
                })
            }
        })
    };

    static deleteById (id) {
        getProductsFromFile(products => {
            const product = products.find(prod => prod.id === id);
            const updatedProducts = products.filter(prod => prod.id !== id);
            fs.writeFile(p, JSON.stringify(updatedProducts), err => {
                if (!err) {
                  Cart.deleteCartById(id, product.price)  
                }
            })
        })
    } 

    static fetchAll (cb) {
        getProductsFromFile(cb);
    }

    static finById (id, cb) {
        getProductsFromFile(products => {
            const product = products.find(p => p.id === id);
            cb(product)
        })
    }
}