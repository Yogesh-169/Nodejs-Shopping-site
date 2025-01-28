const fs = require('fs');
const path = require('path');
const Cart = require('./cart');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      // If there's an error, return an empty array
      cb([]);
    } else {
      try {
        const products = JSON.parse(fileContent);
        cb(products);
      } catch (parseError) {
        // Handle invalid JSON gracefully by returning an empty array
        console.error('Error parsing JSON:', parseError);
        cb([]);
      }
    }
  });
};
module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id; // id should be passed as the first parameter
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }


  save() {
    getProductsFromFile((products) => {
      if (this.id) {
        const existingProductIndex = products.findIndex((prod) => prod.id === this.id);
        console.log('existingProductIndex:', existingProductIndex);

        if (existingProductIndex !== -1) {
          // Update the existing product
          const updatedProducts = [...products];
          updatedProducts[existingProductIndex] = this;

          fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
            if (err) {
              console.error('Error updating product:', err);
            }
          });
        } else {
          console.error('Product not found for updating.'); // Log if the product ID is not found
        }
      } else {
        // Add a new product
        this.id = Math.random().toString();
        products.push(this);

        fs.writeFile(p, JSON.stringify(products), (err) => {
          if (err) {
            console.error('Error saving new product:', err);
          }
        });
      }
    });
  }


  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id, cb) {
    getProductsFromFile(products => {
      const product = products.find(p => p.id === id);
      cb(product);
    });
  }

  static deleteById(id) {
    getProductsFromFile((products) => {

      const product = products.find(product => product.id === id);

      const updatedProducts = products.filter(product => product.id !== id);

      fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
        if (err) {
          console.error('Error deleting product:', err);
        }
        Cart.deleteProduct(id, product.price);
      });
    });
  }


};


