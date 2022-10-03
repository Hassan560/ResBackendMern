const mongoose = require("mongoose");

const ordersSchema = new mongoose.Schema(
  {
    userName:{
      type:String,
      require:true
    },
    ordersItems: [
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
    ],
  },
  {
    timestamps: true,
  }
);

const Orders = new mongoose.model("ORDERS", ordersSchema);
module.exports = Orders;
