const CustomError = require("../errors");
const Game = require("../model/Game");
const { uploadImage, deleteImage } = require("../utils/cloudinary");
const getInfo = require("../utils/info");
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
    const count = await Game.count();
    const info = getInfo(count, req);

    const games = await Game.find()
      .limit(info.limit)
      .skip((info.page - 1) * info.limit);

    res.status(200).json({ success: true, info, games });
  } catch (err) {
    next(err);
  }
};

const createGame = async (req, res, next) => {
  if (!req.files?.thumbnail) {
    throw new CustomError.BadRequestError("No thumbail upload");
  }

  if (!req.files?.screenshots) {
    throw new CustomError.BadRequestError("No screenshots upload");
  }

  try {
    const header = await uploadImage(req.files.thumbnail.tempFilePath);

    const screenshots = [];
    for (let i = 0; i < req.files.screenshots.length; i++) {
      const item = req.files.screenshots[i];
      let img = await uploadImage(item.tempFilePath);
      await fs.unlink(item.tempFilePath);
      screenshots.push({
        screenshot_url: img.secure_url,
        screenshot_id: img.public_id,
      });
    }

    const requirements = {
      os: req.body.os,
      processor: req.body.processor,
      graphics: req.body.graphics,
      storage: req.body.storage,
    };

    const newGame = new Game({
      ...req.body,
      thumbnail: { url: header.secure_url, img_id: header.public_id },
      screenshots,
      minimum_system_requirements: requirements,
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
  const update = req.body;

  try {
    if (req.files?.thumbnail) {
      const thumbnail = await uploadImage(req.files.thumbnail.tempFilePath);
      update.thumbnail = {
        url: thumbnail.secure_url,
        img_id: thumbnail.public_id,
      };
      const game = await Game.findById(id);
      await deleteImage(game.thumbnail.img_id);
      await fs.unlink(req.files.thumbnail.tempFilePath);
    }

    const gameUpdate = await Game.findByIdAndUpdate(id, update, {
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

    await deleteImage(deletedGame.thumbnail.img_id);

    for (let i = 0; i < deletedGame.screenshots.length; i++) {
      const item = deletedGame.screenshots[i];
      await deleteImage(item.screenshot_id);
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
