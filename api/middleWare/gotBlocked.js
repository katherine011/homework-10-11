module.exports = (req, res, next) => {
  const factBlock = Math.random() < 0.5;
  if (factBlock) {
    return res.status(401).json({ error: "you got blocked!" });
  }
  next();
};
