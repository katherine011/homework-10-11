module.exports = (req, res, next) => {
  const { item, price, description } = req.body;
  if (!item || !price || !description) {
    return res
      .status(400)
      .json({ error: "item, price and description is required!" });
  }
  next();
};
