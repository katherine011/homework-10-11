const express = require("express");
const { readFileAndParse, writeFile } = require("./utils.js");
const url = require("url");
const queryString = require("querystring");

const app = express();
app.use(express.json());

app.get("/api/products", async (req, res) => {
  const parsedUrl = url.parse(req.url);
  const query = queryString.parse(parsedUrl.query);

  let page = Number(query.page) || 1;
  let take = Number(query.take) || 30;
  take = Math.min(30, take);

  const start = (page - 1) * take;
  const end = take * page;
  const products = await readFileAndParse("products.json", true);
  //   res.json(products);
  res.end(JSON.stringify(products.slice(start, end)));
});

app.get("/api/products/:id", async (req, res) => {
  const id = Number(req.params.id);
  const products = await readFileAndParse("products.json", true);

  const index = products.findIndex((el) => el.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "products not found" });
  }
  res.json(products[index]);
});

app.post("/api/products", async (req, res) => {
  const { item, price, description } = req.body;

  if (!item || !title || !price || description) {
    return res.status(400).json({ error: "this is required!" });
  }

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
});

app.delete("/api/products/:id", async (req, res) => {
  const secret = req.headers["secret"];
  if (secret === "random123") {
    const id = Number(req.params.id);
    const products = await readFileAndParse("products.json", true);

    const index = products.findIndex((el) => el.id === id);
    if (index === -1) {
      return res.status(404).json({ error: "products not found" });
    }

    const deletedProduct = products.splice(index, 1);
    await writeFile("products.json", JSON.stringify(products));
    res
      .status(201)
      .json({ message: "product deleted successfully", data: deletedProduct });
  }
  return res.status(400).json({ error: "this is secret" });
});

app.put("/api/products/:id", async (req, res) => {
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
});

app.listen(3000, () => {
  console.log("running on server http://localhost:3000");
});
