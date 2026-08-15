const Order = require("../models/Order");

// @route POST /api/orders
const createOrder = async (req, res) => {
  try {
    const {
      items,
      totalAmount,
      phone,
      address,
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        message: "No order items",
      });
    }

    if (!phone || !address) {
      return res.status(400).json({
        message: "Phone and address are required",
      });
    }

    const order = await Order.create({
      user: req.user._id,

      customerName: req.user.name,
      customerEmail: req.user.email,

      phone,
      address,

      items,
      totalAmount,

      status: "pending",
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// @route GET /api/orders/my
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// @route GET /api/orders (admin only)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getAllOrders,
};