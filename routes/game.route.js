const { Router } = require("express");
const router = Router();
const {
  createGame,
  deleteGame,
  getAllGames,
  getGame,
  updateGame,
} = require("../controllers/game.controller");

router.route("/games").get(getAllGames).post(createGame);
router.route("/game/:id").get(getGame).put(updateGame).delete(deleteGame);

module.exports = router;
