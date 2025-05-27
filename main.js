const express = require("express");
const apiRoute = require("./api/index.js");

const app = express();
app.use(express.json());

app.use("/api", apiRoute);

app.listen(3000, () => {
  console.log("running on server http://localhost:3000");
});
