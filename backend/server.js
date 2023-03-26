const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const config = require("config");
const fileUpload = require('express-fileupload');

const auth = require("./routes/auth");
const cart = require("./routes/cart");
const item = require("./routes/item");
const order = require("./routes/order");
const product = require("./routes/product");
const customer = require("./routes/customer");
const invite = require("./routes/invite");

var cors = require("cors");

const app = express();
app.use(express.json());

// used in production to serve client files
if (process.env.NODE_ENV === "production") {
  app.use(express.static("../frontend/build"));
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    );
  });
}

app.use(function (req, res, next) {
  //allow cross origin requests
  res.setHeader(
    "Access-Control-Allow-Methods",
    "POST, PUT, OPTIONS, DELETE, PATCH, GET"
  );
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.options("*", cors()); // include before other routes

app.use(fileUpload({
  createParentPath: true,
}));

app.use(express.json({ limit: "50mb" }));
app.use("/api/auth", auth);
app.use("/api/cart", cart);
app.use("/api/item", item);
app.use("/api/product", product);
app.use("/api/customer", customer);
app.use("/api/order", order);
app.use("/api/invite", invite);


// connecting to mongoDB and then running server on port 4000
const dbURI = config.get("dbURI");
const port = process.env.PORT || 4000;
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(port, () => console.log(`Listening on port ${port}...`));
  })
  .catch((err) => console.log(err));
