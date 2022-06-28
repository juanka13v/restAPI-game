const CustomError = require("../errors");
const Game = require("../model/Game");
const { uploadImage } = require("../utils/cloudinary");
const fs = require("fs-extra");

const getGame = async (req, res, next) => {
  const id = req.params.id;

  try {
    const game = await Game.findById(id);

    if (!game) {
      throw new CustomError.NotFoundError(`No game with id : ${id}`);
    }

    res.status(200).json({ success: true, game });
  } catch (err) {
    next(err);
  }
};

const getAllGames = async (req, res, next) => {
  try {
    const games = await Game.find();
    res.status(200).json({ success: true, games });
  } catch (err) {
    next(err);
  }
};

const createGame = async (req, res, next) => {
  if (!req.files?.thumbnail) {
    throw new CustomError.BadRequestError("No thumbail upload");
  }

  try {
    const thumbnail = await uploadImage(req.files.thumbnail.tempFilePath);

    const newGame = new Game({
      title: req.body.title,
      thumbnail: thumbnail.secure_url,
      description: req.body.description,
      genre: req.body.genre,
      publisher: req.body.publisher,
      release_date: req.body.release_date,
      platform: req.body.platform,
      franchise: req.body.franchise,
      developer: req.body.developer,
      minimum_system_requirements: {
        os: req.body.os,
        processor: req.body.processor,
        graphics: req.body.graphics,
        storage: req.body.storage,
      },
      screenshots: req.body.screenshots,
    });

    await fs.unlink(req.files.thumbnail.tempFilePath);

    const savedGame = await newGame.save();
    res.status(201).json({ success: true, savedGame });
  } catch (err) {
    next(err);
  }
};

const updateGame = async (req, res, next) => {
  const id = req.params.id;

  try {
    const gameUpdate = await Game.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!gameUpdate) {
      throw new CustomError.NotFoundError(`No game with id : ${id}`);
    }

    res.status(200).json({ success: true, gameUpdate });
  } catch (err) {
    next(err);
  }
};

const deleteGame = async (req, res, next) => {
  const id = req.params.id;

  try {
    const deletedGame = await Game.findById(id);

    if (!deletedGame) {
      throw new CustomError.NotFoundError(`No game with id : ${id}`);
    }

    await deletedGame.remove();

    res.status(200).json({ success: true, msg: "Deleted" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createGame,
  getAllGames,
  getGame,
  updateGame,
  deleteGame,
};
