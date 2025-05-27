const url = require("url");
const queryString = require("querystring");
const { readFileAndParse, writeFile } = require("../../utils.js");

const getAllProducts = async (req, res) => {
  const parsedUrl = url.parse(req.url);
  const query = queryString.parse(parsedUrl.query);

  let page = Number(query.page) || 1;
  let take = Number(query.take) || 30;
  take = Math.min(30, take);

  const start = (page - 1) * take;
  const end = take * page;

  const products = await readFileAndParse("products.json", true);
  res.end(JSON.stringify(products.slice(start, end)));
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
    createAt: new Date().toISOString(),
    updateAt: new Date().toISOString(),
  };

  const addedProduct = products.push(newProduct);
  await writeFile("products.json", JSON.stringify(products));
  res
    .status(201)
    .json({ message: "product added sucessfully", data: addedProduct });
};

const getProductById = async (req, res) => {
  const id = Number(req.params.id);
  const products = await readFileAndParse("products.json", true);

  const index = products.findIndex((el) => el.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "products not found" });
  }
  res.json(products[index]);
};

const deleteProduct = async (req, res) => {
  const id = Number(req.params.id);
  const products = await readFileAndParse("products.json", true);

  const index = products.findIndex((el) => el.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "products not found" });
  }

  const deletedProduct = products.splice(index, 1);
  await writeFile("products.json", JSON.stringify(products));
  return res
    .status(201)
    .json({ message: "product deleted successfully", data: deletedProduct });
};

const editProduct = async (req, res) => {
  const id = Number(req.params.id);
  const products = await readFileAndParse("products.json", true);
  const index = products.findIndex((el) => el.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "products not found" });
  }

  products[index] = {
    ...products[index],
    item: req.body?.item,
    price: req.body?.price,
    description: req.body?.description,
    updateAt: new Date().toISOString,
  };

  const updatedProduct = await writeFile(
    "products.json",
    JSON.stringify(products)
  );
  res
    .status(200)
    .json({ message: "product updated successfully", data: products[index] });
};

module.exports = {
  getAllProducts,
  addNewProduct,
  deleteProduct,
  editProduct,
  getProductById,
};
