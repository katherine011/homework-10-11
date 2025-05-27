const { Router } = require("express");
const productsRoute = require("./products/products.routes");
const randomRoute = require("./random/random.routes");

const apiRoute = Router();

apiRoute.use("/products", productsRoute);
apiRoute.use("/random", randomRoute);

module.exports = apiRoute;
