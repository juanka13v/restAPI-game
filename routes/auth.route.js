const { Router } = require("express");
const router = Router();
const verifyToken = require("../middlewares/authJwt");

const { signIn, signUp } = require("../controllers/auth.controller");

// create
router.post("/auth/singup", signUp);

// login
router.post("/auth/singin", signIn);

module.exports = router;
