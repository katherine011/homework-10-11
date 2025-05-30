const express = require("express");
const apiRoute = require("./api/index.js");

const app = express();
app.use(express.json());
app.use(express.static("uploads"));

app.use("/api", apiRoute);

app.listen(4000, () => {
  console.log("running on server http://localhost:4000");
});
