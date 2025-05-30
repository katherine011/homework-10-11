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
const { upload } = require("../../config/cloudinary.config.js");

const productsRoute = Router();

productsRoute.get("/", getAllProducts);

productsRoute.get("/:id", getProductById);

productsRoute.post(
  "/",
  upload.single("pictures"),
  requiredFields,
  addNewProduct
);

productsRoute.delete("/:id", hasAccess, deleteProduct);

productsRoute.put("/:id", upload.single("pictures"), editProduct);

module.exports = productsRoute;
