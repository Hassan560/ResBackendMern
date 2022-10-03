const express = require("express");
const router = express.Router();

require("../Db/Connection");
const Orders = require("../Model/ordersSchema");

//get orders
router.get("/orders", async (req, res) => {
  try {
    const orders = await Orders.find();
    res.json(orders);
  } catch (err) {
    console.log(err);
  }
});

// add orders
router.post("/addOrders", async (req, res) => {
  const { ordersItems } = req.body;
  try {
    const order = new Orders({
      ordersItems,
    });
    await order.save();
    res.status(201).json({ message: "Ordered added successfully" });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
