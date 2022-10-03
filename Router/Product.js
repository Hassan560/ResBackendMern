const express = require("express");
const router = express.Router();

require("../Db/Connection");
const Products = require("../Model/productsSchema");

// get all products
router.get("/products", async (req, res) => {
  try {
    const product = await Products.find();
    res.json(product);
  } catch (err) {
    console.log(err);
  }
});

// get single products
router.get("/products/:id", async (req, res) => {
  let productId = req.params.id;
  try {
    const singleProduct = await Products.findById(productId);
    res.json(singleProduct);
  } catch (err) {
    console.log(err);
  }
});

// add products
router.post("/addProducts", async (req, res) => {
  const { name, image, price, description, countInStock, category } = req.body;

  if (!name || !image || !price || !description || !category) {
    return res.status(422).json({ error: "Please Fill All Feild" });
  }

  try {
    const productExist = await Products.findOne({ name: name });
    if (productExist) {
      res.status(422).json({ error: "Product Name Is Already Exist" });
    } else {
      const product = new Products({
        name,
        image,
        price,
        description,
        countInStock,
        category,
      });
      await product.save();
      res.status(201).json({ message: "Product added successfully" });
    }
  } catch (err) {
    console.log(err);
  }
});

// edit products
router.put("/addProducts/:id", async (req, res) => {
  const { name, image, price, description, countInStock, category } = req.body;
  try {
    const editProduct = await Products.findByIdAndUpdate(req.params.id);
    if (editProduct) {
      (editProduct.name = name),
        (editProduct.image = image),
        (editProduct.price = price),
        (editProduct.description = description),
        (editProduct.countInStock = countInStock),
        (editProduct.category = category)

      const update = await editProduct.save();
      res.status(201).json(update);
    } else {
      res.status(404).json({ error: "Product Not Found" });
    }
  } catch (err) {
    console.log(err);
  }
});

// delete product
router.delete("/addProducts/:id", async (req, res) => {
  try {
    const deleteProduct = await Products.findByIdAndDelete(req.params.id);
    if (deleteProduct) {
      await deleteProduct.remove();
      res.status(200).json({ message: "Product Deleted Successfully" });
    } else {
      res.status(404)
      throw new Error("Product not found");
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
