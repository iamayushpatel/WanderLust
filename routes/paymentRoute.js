const express = require('express');
const bodyParser = require('body-parser');
const paymentController = require('../controllers/paymentController');
const path = require('path'); // Import the 'path' module

const payment_route = express();

// Middleware to parse incoming request bodies
payment_route.use(bodyParser.json());
payment_route.use(bodyParser.urlencoded({ extended: false }));

// Set the view engine to ejs
payment_route.set('view engine', 'ejs');
payment_route.set('views', path.join(__dirname, '../views')); // Corrected path usage

// Route to render the product page
payment_route.get('/', paymentController.renderProductPage);

// Route to handle creating an order with Razorpay
payment_route.post('/createOrder', paymentController.createOrder);

module.exports = payment_route;
