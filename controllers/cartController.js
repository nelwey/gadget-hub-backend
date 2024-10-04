const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../data/cart.json');
const { readProductsFromFile } = require('./productController')

const products = readProductsFromFile();

const readCartFromFile = () => {
    try {
        const data = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading cart.json:", error);
        return [];
    }
};
const writeCartToFile = (cart) => {
    fs.writeFileSync(filePath, JSON.stringify(cart, null, 2), 'utf-8');
};
const getCart = (req, res) => {
    try {
        const cart = readCartFromFile();


        const cartWithProductDetails = cart.map(item => {
            const productDetails = products.find(p => p.id === item.productId);
            return {
                ...item,
                ...productDetails,
                subtotal: item.subtotal,
            };
        });

        res.json(cartWithProductDetails);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
const addProduct = (req, res) => {
    const { productId, quantity, subtotal } = req.body;
    try {
        const cart = readCartFromFile();
        const existingItem = cart.find(item => item.productId === productId);
        if (existingItem) {
            existingItem.quantity += quantity;
            existingItem.subtotal += subtotal;
        } else {
            cart.push({ productId, quantity, subtotal });
        }
        writeCartToFile(cart);
        res.status(201).json({ message: 'Product added to cart', cart });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: 'Invalid product data' });
    }
};
const updateProductQuantity = (req, res) => {
    try {
        const { productId } = req.params;
        const { quantity, action } = req.body;

        if (quantity <= 0) {
            return res.status(400).json({ message: 'Quantity must be greater than 0' });
        }

        let cart = readCartFromFile();
        const existingItem = cart.find(item => item.productId === Number(productId));

        if (!existingItem) {
            return res.status(404).json({ message: 'Product not found in the cart' });
        }
        const product = products.find(p => p.id === Number(productId));

        if (action === 'increase') {
            existingItem.quantity += quantity;
            existingItem.subtotal += product.price;
        } else {
            existingItem.quantity -= quantity;
            existingItem.subtotal -= product.price;
            //remover producto del json
            if(existingItem.quantity < 1){
                cart = cart.filter(item => item.productId !== Number(productId));
            }

        }
        writeCartToFile(cart);

        res.json({ message: 'Product quantity updated successfully', cart });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
const removeFromCart = (req, res) => {
    const { productId } = req.params;

    try {
        const cart = readCartFromFile();

        let updatedCart = cart.filter(item => item.productId !== Number(productId));

        if (cart.length === updatedCart.length) {
            return res.status(404).json({ message: 'Product not found in cart' });
        }

        writeCartToFile(updatedCart);

        res.json({ message: 'Product removed from cart', cart: updatedCart });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
module.exports = {
    getCart,
    addProduct,
    removeFromCart,
    updateProductQuantity
};