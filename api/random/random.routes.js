const { Router } = require("express");
const gotBlocked = require("../middleWare/gotBlocked");

const randomRoute = Router();

randomRoute.get("/", gotBlocked, async (req, res) => {
  const resp = await fetch("https://uselessfacts.jsph.pl/api/v2/facts/random");
  const data = await resp.json();

  res.json(data);
});

module.exports = randomRoute;
