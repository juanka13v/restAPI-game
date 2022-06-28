const { Router } = require("express");
const fileUpload = require("express-fileupload");
const router = Router();
const {
  createGame,
  deleteGame,
  getAllGames,
  getGame,
  updateGame,
} = require("../controllers/game.controller");

router.route("/games").get(getAllGames);
router.post(
  "/games",
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./uploads",
  }),
  createGame
);
router.route("/game/:id").get(getGame).put(updateGame).delete(deleteGame);

module.exports = router;
