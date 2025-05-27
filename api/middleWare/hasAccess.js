module.exports = (req, res, next) => {
  const role = req.headers["role"];
  if (role !== "admin") {
    return res.status(401).json({ error: "only admin has permition!" });
  }
  next();
};
