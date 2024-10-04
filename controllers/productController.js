const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../data/products.json');

const readProductsFromFile = () => {
    try {
        const data = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading products.json:", error);
        return [];
    }
};

const writeProductsToFile = (products) => {
    fs.writeFileSync(filePath, JSON.stringify(products, null, 2), 'utf-8');
};

const getProducts = (req, res) => {
    try {
        const products = readProductsFromFile();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

const getProductById = (req, res) => {
    try {
        const products = readProductsFromFile();
        const product = products.find(p => p.id === parseInt(req.params.id));
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

const addProduct = (req, res) => {
    try {
        const products = readProductsFromFile();
        const newProduct = {
            id: products.length + 1,
            ...req.body
        };
        products.push(newProduct);
        writeProductsToFile(products);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ message: 'Invalid product data' });
    }
};

module.exports = {
    getProducts,
    getProductById,
    addProduct,
    readProductsFromFile
};