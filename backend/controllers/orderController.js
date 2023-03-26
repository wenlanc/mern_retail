const Order = require("../models/Order");
const Cart = require("../models/Cart");
const User = require("../models/User");
const config = require("config");
const stripe = require("stripe")(config.get("StripeAPIKey"));

module.exports.get_orders = async (req, res) => {
  const userId = req.params.id;
  Order.find({ userId })
    .sort({ date: -1 })
    .then((orders) => res.json(orders));
};

module.exports.checkout = async (req, res) => {
  try {
    const userId = req.params.id;
    const { source } = req.body;
    let cart = await Cart.findOne({ userId });
    let user = await User.findOne({ _id: userId });
    const email = user.email;
    if (cart) {
      const charge = await stripe.charges.create({
        amount: cart.bill,
        currency: "inr",
        source: source,
        receipt_email: email,
      });
      if (!charge) throw Error("Payment failed");
      if (charge) {
        const order = await Order.create({
          userId,
          items: cart.items,
          bill: cart.bill,
        });
        const data = await Cart.findByIdAndDelete({ _id: cart.id });
        return res.status(201).send(order);
      }
    } else {
      res.status(500).send("You do not have items in cart");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};

module.exports.create_item = async (req, res) => {
  var data = {
    customerId: req.body.customerId,
    items: req.body.products,
    paymentMethod: req.body.paymentMethod,
    payAmount: req.body.payAmount,
  };

  const newItem = new Order(data);
  newItem
    .save()
    .then((item) => res.json(item))
    .catch(() => {
      res.json({ error: "Error -" });
    });
};

module.exports.list_items = async (req, res) => {
  const pageSize = Number(req.body.rowsPerPage) || 10;
  const page = Number(req.body.page) || 0;
  const searchText = req.body.searchText || "";
  const order = req.body.order || {};

  let searchObj = {};
  if (searchText != "") {
    searchObj = {
      $or: [
        {
          name: { $regex: new RegExp(searchText), $options: "is" },
        },
        {
          email: { $regex: new RegExp(searchText), $options: "is" },
        },
      ],
    };
  }

  let sortOrder = {};
  if (order._id) {
    sortOrder[order._id] = order._direction === "asc" ? 1 : -1;
  } else {
    sortOrder = { createdAt: -1 };
  }

  try {
    // Fetch products from database
    const orders = await Order.find(searchObj)
      .populate("customerId")
      .skip(pageSize * page)
      .limit(pageSize)
      .sort(sortOrder);
    // Get the count of total available product of given filter
    const count = await Order.find(searchObj).count();

    res.json({
      orders: orders,
      current: page,
      pages: Math.ceil(count / pageSize),
      totalItems: count,
    });
  } catch (err) {
    res.json(err);
  }
};

module.exports.delete_item = (req, res) => {
  Order.findByIdAndDelete({ _id: req.params.id }).then(function (item) {
    res.json({ success: true });
  });
};

module.exports.find_item = (req, res) => {
  Order.findOne({ _id: req.params.id }).populate("customerId").then((item) => res.json(item));
};
