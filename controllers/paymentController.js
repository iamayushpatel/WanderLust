const express = require("express");
const Razorpay = require("razorpay");
const { RAZORPAY_ID_KEY, RAZORPAY_SECRET_KEY } = process.env; // Load Razorpay keys from environment variables

const paymentRoute = express.Router();

// Razorpay instance
const razorpay = new Razorpay({
  key_id: RAZORPAY_ID_KEY,
  key_secret: RAZORPAY_SECRET_KEY,
});

const renderProductPage = async (req, res) => {
  try {
    // Your logic for fetching listing details
    res.render("product", { listing: yourListingData });
  } catch (error) {
    console.log(error.message);
  }
};

const createOrder = async (req, res) => {
  try {
    console.log("Received booking request:", req.body); // Debugging

    const { listingId, name, amount, description } = req.body;

    if (!listingId || !name || !amount || !description) {
      console.error("Invalid request data:", req.body);
      return res
        .status(400)
        .json({ success: false, msg: "Invalid request data" });
    }

    const amountInPaise = parseInt(amount) * 100; // Ensure amount is a number and convert to paise

    const orderOptions = {
      amount: amountInPaise,
      currency: "INR",
      receipt: "order_" + Date.now(),
    };

    console.log("Creating Razorpay order with:", orderOptions);

    const order = await razorpay.orders.create(orderOptions);

    console.log("Razorpay Order Created:", order);

    res.status(200).json({
      success: true,
      order_id: order.id,
      amount: amountInPaise,
      key_id: process.env.RAZORPAY_ID_KEY,
      product_name: name,
      description: description,
      contact: "9409949750",
      name: "Ayush Patel",
      email: "payush1725@gmail.com",
    });
  } catch (error) {
    console.error("Error in creating order:", error);
    res.status(500).json({ success: false, msg: "Server error" });
  }
};

module.exports = {
  renderProductPage,
  createOrder,
  paymentRoute,
};
