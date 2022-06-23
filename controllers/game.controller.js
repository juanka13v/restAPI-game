const Game = require("../model/Game");

const getGame = async (req, res) => {
  const id = req.params.id;

  try {
    const game = await Game.findById(id);
    res.status(200).json({ game });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const getAllGames = async (req, res) => {
  try {
    const games = await Game.find();
    res.status(200).json({ games });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const createGame = async (req, res) => {
  const newGame = new Game(req.body);
  try {
    const savedGame = await newGame.save();
    res.status(201).json({ savedGame });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const updateGame = async (req, res) => {
  const id = req.params.id;

  try {
    const gameUpdate = await Game.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({ gameUpdate });
  } catch (error) {
    res.status(400).json({ msg: "done" });
  }
};

const deleteGame = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedGame = await Game.findByIdAndDelete(id);
    res.status(200).json({ msg: "Deleted" });
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports = {
  createGame,
  getAllGames,
  getGame,
  updateGame,
  deleteGame,
};
