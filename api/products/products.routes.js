const { Router } = require("express");
const {
  getAllProducts,
  getProductById,
  addNewProduct,
  deleteProduct,
  editProduct,
} = require("./products.service.js");
const requiredFields = require("../middleWare/requiredFields.js");
const hasAccess = require("../middleWare/hasAccess.js");

const productsRoute = Router();

productsRoute.get("/", getAllProducts);

productsRoute.get("/:id", getProductById);

productsRoute.post("/", requiredFields, addNewProduct);

productsRoute.delete("/:id", hasAccess, deleteProduct);

productsRoute.put("/:id", editProduct);

module.exports = productsRoute;
