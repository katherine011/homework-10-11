const url = require("url");
const queryString = require("querystring");
const { readFileAndParse, writeFile } = require("../../utils.js");
const path = require("path");
const { deletedFromCloudinary } = require("../../config/cloudinary.config.js");

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
    pictures: req.file?.path,
    createAt: new Date().toISOString(),
    updateAt: new Date().toISOString(),
  };

  products.push(newProduct);
  await writeFile("products.json", JSON.stringify(products));
  res.status(201).json({ message: "product added sucessfully" });
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

  const fileName = products[index].pictures.split("uploads/")[1];
  const fileId = fileName.split(".")[0];
  const publicFileId = `uploads/${fileId}`;
  await deletedFromCloudinary(publicFileId);

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
    if (req.file?.path) {
      const publicId = req.file.path.split("/").pop().split(".")[0];
      await deletedFromCloudinary(`uploads/${publicId}`);
    }
    // ეს if იმიტომ ჩავამატე რომ როდესაც პროდუქტის არარსებულ აიდზე ფოტოს განახლება დაგვჭირდებოდა ქვემოთ
    // არსებული ერორი გამოჰქონდა თუმცა ფოტოს ახლიდან ტვირთავდა ქლაუდინარზე, ამიტომ ეს publicId ჰქყოფს
    // ყველას სლეშზე და ბოლო ფოფით მისმართს რაზეც ფოტოა იმას სპლიტავს და მაგ ადგილს ვშლი.
    // ანუ თუ განახლების დროს არარსებულ აიდს მივუთითებთ, როგორც აიტვირთება ისე წაიშლება ქლაუიდნარიდან.

    return res.status(404).json({ error: "products not found" });
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
