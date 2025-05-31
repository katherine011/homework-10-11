const { Router } = require("express");
const {
  getAllProducts,
  getProductById,
  addNewProduct,
  deleteProduct,
  editProduct,
  createNewproducts,
  updateProduct,
  productsDetails,
} = require("./products.service.js");
const requiredFields = require("../middleWare/requiredFields.js");
const { upload } = require("../../config/cloudinary.config.js");

const productsRoute = Router();

productsRoute.get("/", getAllProducts);

productsRoute.get("/", getProductById);

productsRoute.post(
  "/",
  upload.single("pictures"),
  requiredFields,
  addNewProduct
);

productsRoute.get("/create", createNewproducts);

productsRoute.post("/:id/delete", deleteProduct);

productsRoute.post("/:id/update", upload.single("pictures"), editProduct);

productsRoute.get("/:id/update", updateProduct);

productsRoute.get("/:id/details", productsDetails);

module.exports = productsRoute;
