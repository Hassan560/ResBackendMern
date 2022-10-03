const mongoose = require("mongoose");

const categoriesSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  category:{
    type: String,
    require: true
  }
});


const Categories = mongoose.model("CATEGORIES", categoriesSchema)
module.exports = Categories