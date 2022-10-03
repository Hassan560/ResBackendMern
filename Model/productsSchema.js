const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    image: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      require: true,
      default: 0,
    },
    description: {
      type: String,
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const Products = mongoose.model("PRODUCTS", productsSchema);
module.exports = Products;
