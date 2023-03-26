const Customer = require("../models/Customer");
var bcrypt = require('bcryptjs');

module.exports.get_items = (req, res) => {
  Customer.find()
    .sort({ createdAt: -1 })
    .then((items) => res.json(items));
};

module.exports.find_item = (req, res) => {
  Customer.findOne({ _id: req.params.id }).then((item) => res.json(item));
};

// fetch store products by advancedFilters api
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
    const customers = await Customer.find(searchObj)
      .skip(pageSize * page)
      .limit(pageSize)
      .sort(sortOrder);

    // Get the count of total available product of given filter
    const count = await Customer.find(searchObj).count();

    res.json({
      customers: customers,
      current: page,
      pages: Math.ceil(count / pageSize),
      totalItems: count,
    });
  } catch (err) {
    res.json(err);
  }
};

module.exports.create_item = async (req, res) => {
  let body = req.body;
  let password = "";
  if(body.formPassword) {
    const salt = bcrypt.genSaltSync(10);
    password = bcrypt.hashSync(body.formPassword, salt);
  }
  var data = {
    name: body.formName,
    email: body.formEmail,
    phone: body.formPhone,
    billing_first_name: body.formBillingFirstName,
    billing_last_name: body.formBillingLastName,
    billing_addr1: body.formBillingAddr1,
    billing_addr2: body.formBillingAddr2,
    billing_country: body.formBillingCountry,
    billing_state: body.formBillingState,
    billing_zip: body.formBillingZip,
    shipping_first_name: body.formShippingFirstName,
    shipping_last_name: body.formShippingLastName,
    shipping_addr1: body.formShippingAddr1,
    shipping_addr2: body.formShippingAddr2,
    shipping_country: body.formShippingCountry,
    shipping_state: body.formShippingState,
    shipping_zip: body.formShippingZip,
    password,
  };
  const newItem = new Customer(data);
  newItem
    .save()
    .then((item) => res.json(item))
    .catch(() => {
      res.json({ error: "Error - Maybe already exist" });
    });
};

module.exports.update_item = async (req, res) => {
  let body = req.body;
  var data = {
    name: body.formName,
    email: body.formEmail,
    phone: body.formPhone,
    billing_first_name: body.formBillingFirstName,
    billing_last_name: body.formBillingLastName,
    billing_addr1: body.formBillingAddr1,
    billing_addr2: body.formBillingAddr2,
    billing_country: body.formBillingCountry,
    billing_state: body.formBillingState,
    billing_zip: body.formBillingZip,
    shipping_first_name: body.formShippingFirstName,
    shipping_last_name: body.formShippingLastName,
    shipping_addr1: body.formShippingAddr1,
    shipping_addr2: body.formShippingAddr2,
    shipping_country: body.formShippingCountry,
    shipping_state: body.formShippingState,
    shipping_zip: body.formShippingZip,
  };

  Customer.findByIdAndUpdate({ _id: req.body.id }, data)
    .then(function (item) {
      Customer.findOne({ _id: req.body.id }).then(function (item) {
        res.json(item);
      });
    })
    .catch(() => {
      res.json({ error: "Error - Maybe already exist" });
    });
};

module.exports.delete_item = (req, res) => {
  Customer.findByIdAndDelete({ _id: req.params.id }).then(function (item) {
    res.json({ success: true });
  });
};

module.exports.update_status = async (req, res) => {
  let body = req.body;
  var data = {
    status: body.status
  };

  Customer.findByIdAndUpdate({ _id: body.id }, data)
    .then(function (item) {
      Customer.findOne({ _id: body.id }).then(function (item) {
        res.json(item);
      });
    })
    .catch(() => {
      res.json({ error: "Error - Maybe already exist" });
    });
};
