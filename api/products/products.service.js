const { readFileAndParse, writeFile } = require("../../utils.js");
const path = require("path");
const { deletedFromCloudinary } = require("../../config/cloudinary.config.js");

const getAllProducts = async (req, res) => {
  const products = await readFileAndParse("products.json", true);

  res.render("pages/home.ejs", { products });
};

const addNewProduct = async (req, res) => {
  const { item, price, description } = req.body;
  const products = await readFileAndParse("products.json", true);

  const lastId = products[products.length - 1]?.id || 0;
  const newProduct = {
    id: lastId + 1,
    item,
    price: Number(price),
    description,
    pictures: req.file?.path,
    createAt: new Date().toISOString(),
    updateAt: new Date().toISOString(),
  };

  products.push(newProduct);
  await writeFile("products.json", JSON.stringify(products));

  res.redirect("/api/products");
};

const createNewproducts = async (req, res) => {
  res.render("pages/create.ejs");
};

const getProductById = async (req, res) => {
  const id = Number(req.params.id);
  const products = await readFileAndParse("products.json", true);

  const index = products.findIndex((el) => el.id === id);
  if (index === -1) {
    return res.send("product not found");
  }

  res.render("pages/create.ejs");
};

const deleteProduct = async (req, res) => {
  const id = Number(req.params.id);
  const products = await readFileAndParse("products.json", true);

  const index = products.findIndex((el) => el.id === id);
  if (index === -1) {
    return res.send("Products Not Found");
  }

  const fileName = products[index].pictures.split("uploads/")[1];
  const fileId = fileName.split(".")[0];
  const publicFileId = `uploads/${fileId}`;
  await deletedFromCloudinary(publicFileId);

  products.splice(index, 1);
  await writeFile("products.json", JSON.stringify(products));

  res.redirect("/api/products");
};

const editProduct = async (req, res) => {
  const id = Number(req.params.id);
  const products = await readFileAndParse("products.json", true);

  const index = products.findIndex((el) => el.id === id);
  if (index === -1) {
    if (req.file?.path) {
      const publicId = req.file.path.split("/").pop().split(".")[0];
      await deletedFromCloudinary(`uploads/${publicId}`);
    }

    return res.send("products not found");
  }

  if (req.file?.path && products[index].pictures) {
    const fileName = products[index].pictures.split("uploads/")[1];
    const fileId = fileName.split(".")[0];
    const publicFileId = `uploads/${fileId}`;

    await deletedFromCloudinary(publicFileId);
  }

  products[index] = {
    ...products[index],
    item: req.body?.item || products[index].item,
    price: req.body?.price || products[index].price,
    description: req.body?.description || products[index].description,
    pictures: req.file?.path || products[index].pictures,
    updateAt: new Date().toISOString(),
  };

  await writeFile("products.json", JSON.stringify(products));
  res.redirect("/api/products");
};

const updateProduct = async (req, res) => {
  const id = Number(req.params.id);
  const products = await readFileAndParse("products.json", true);
  const product = products.find((el) => el.id === id);
  if (!product) return res.send("product not found");

  res.render("pages/update.ejs", { product });
};

const productsDetails = async (req, res) => {
  const id = Number(req.params.id);
  const products = await readFileAndParse("products.json", true);
  const product = products.find((el) => el.id === id);
  if (!product) return res.send("product not found");

  res.render("pages/details.ejs", { product });
};

module.exports = {
  getAllProducts,
  addNewProduct,
  deleteProduct,
  editProduct,
  getProductById,
  createNewproducts,
  updateProduct,
  productsDetails,
};
