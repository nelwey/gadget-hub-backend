const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../data/order.json');

const readOrderFromFile = () => {
    try {
        const data = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading cart.json:", error);
        return [];
    }
};
const writeOrderToFile = (order) => {
    fs.writeFileSync(filePath, JSON.stringify(order, null, 2), 'utf-8');
};
const getOrder = (req, res) => {
    try {
        const orders = readOrderFromFile();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
const addOrder = (req, res) => {
    try {
        const orders = readOrderFromFile();
        const newOrder = {
            id: orders.length + 1,
            ...req.body
        };
        orders.push(newOrder);
        writeOrderToFile(orders);
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(400).json({ message: 'Invalid product data' });
    }
};

module.exports = {
    getOrder,
    addOrder,
};