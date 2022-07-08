const jwt = require("jsonwebtoken");
const User = require("../model/User");

const verifySingUp = async (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (token) {
    const decoded = jwt.verify(token, process.env.SECRET);
    const user = await User.findById(decoded.id, { password: 0 });
    req.user = user;
  }

  next();
};

module.exports = verifySingUp;
