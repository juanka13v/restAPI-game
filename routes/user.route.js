const { Router } = require("express");
const router = Router();
const {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} = require("../controllers/user.controller");

router.route("/users").get(getAllUsers).post(createUser);
router.route("/user/:id").get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
