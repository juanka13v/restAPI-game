const jwt = require("jsonwebtoken");
const User = require("../model/User");

const verifyAdminRole = async (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) return res.status(400).json({ message: "No token provided" });

  const decoded = jwt.verify(token, process.env.SECRET);

  const user = await User.findById(decoded.id, { password: 0 });
  if (!user) return res.status(404).json({ message: "no user found" });

  if (user.role != "admin")
    return res.status(401).json({ error: "Unauthorized Access" });

  next();
};

module.exports = verifyAdminRole;
