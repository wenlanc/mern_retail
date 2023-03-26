const Product = require("../models/Product");

module.exports.get_items = (req, res) => {
  Product.find()
    .sort({ createdAt: -1 })
    .then((items) => res.json(items));
};

module.exports.find_item = (req, res) => {
  Product.findOne({ _id: req.params.id }).then((item) => res.json(item));
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
          description: { $regex: new RegExp(searchText), $options: "is" },
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
    const products = await Product.find(searchObj)
      .skip(pageSize * page)
      .limit(pageSize)
      .sort(sortOrder);

    // Get the count of total available product of given filter
    const count = await Product.find(searchObj).count();

    res.json({
      products: products,
      current: page,
      pages: Math.ceil(count / pageSize),
      totalItems: count,
    });
  } catch (err) {
    res.json(err);
  }
};

module.exports.create_item = async (req, res) => {
  var data = {
    name: req.body.name,
    description: req.body.description,
    items: req.body.items,
  };

  var sdsFile = req.files.sdsFile;
  if (sdsFile) {
    await sdsFile.mv(__dirname + "/../uploads/" + sdsFile.name);
    data.sdsFile = sdsFile.name;
  }
  var labelFile = req.files.labelFile;
  if (labelFile) {
    await labelFile.mv(__dirname + "/../uploads/" + labelFile.name);
    data.labelFile = labelFile.name;
  }
  var imageFile = req.files.imageFile;
  if (imageFile) {
    await imageFile.mv(__dirname + "/../uploads/" + imageFile.name);
    data.imageFile = imageFile.name;
  }

  const newItem = new Product(data);
  newItem
    .save()
    .then((item) => res.json(item))
    .catch(() => {
      res.json({ error: "Error - Maybe already exist" });
    });
};

module.exports.update_item = async (req, res) => {
  var data = {
    name: req.body.name,
    description: req.body.description,
    items: req.body.items,
  };

  var sdsFile = req.files.sdsFile;
  if (sdsFile) {
    await sdsFile.mv(__dirname + "/../uploads/" + sdsFile.name);
    data.sdsFile = sdsFile.name;
  }
  var labelFile = req.files.labelFile;
  if (labelFile) {
    await labelFile.mv(__dirname + "/../uploads/" + labelFile.name);
    data.labelFile = labelFile.name;
  }
  var imageFile = req.files.imageFile;
  if (imageFile) {
    await imageFile.mv(__dirname + "/../uploads/" + imageFile.name);
    data.imageFile = imageFile.name;
  }

  Product.findByIdAndUpdate({ _id: req.body.id }, data)
    .then(function (item) {
      Product.findOne({ _id: req.body.id }).then(function (item) {
        res.json(item);
      });
    })
    .catch(() => {
      res.json({ error: "Error - Maybe already exist" });
    });
};

module.exports.delete_item = (req, res) => {
  Product.findByIdAndDelete({ _id: req.params.id }).then(function (item) {
    res.json({ success: true });
  });
};
