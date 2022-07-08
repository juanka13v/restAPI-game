const { Router } = require("express");
const fileUpload = require("express-fileupload");
const router = Router();
const verifyAdminRole = require("../middlewares/authJwt");
const verifySingUp = require("../middlewares/verifySingUp");
const {
  createGame,
  deleteGame,
  getAllGames,
  getGame,
  updateGame,
} = require("../controllers/game.controller");

router.get("/games", verifySingUp, getAllGames);

router.post(
  "/games",
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./uploads",
  }),
  verifyAdminRole,
  createGame
);
router.put(
  "/game/:id",
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./uploads",
  }),
  verifyAdminRole,
  updateGame
);

router.delete("/game/:id", verifyAdminRole, deleteGame);

router.route("/game/:id").get(getGame);

module.exports = router;
