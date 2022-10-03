const express = require("express");
const router = express.Router();

require("../Db/Connection");
const Categories = require("../Model/categoriesSchema");

// get categories
router.get("/categories", async (req, res) => {
  try {
    const category = await Categories.find();
    res.json(category);
  } catch (err) {
    console.log(err);
  }
});

// add categories
router.post("/addCategories", async (req, res) => {
  const { name, image } = req.body;

  if (!name || !image) {
    return res.status(422).json({ error: "Please Fill All Feild" });
  }
  try {
    const categoryExist = await Categories.findOne({ name: name });
    if (categoryExist) {
      res.status(422).json({ error: "Category is already exist" });
    } else {
      const category = new Categories({ name, image });
      await category.save();
      res.status(201).json({ message: "Category addedd successfully" });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router