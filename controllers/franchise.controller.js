const CustomError = require("../errors");
const Franchise = require("../model/Franchise");
const { uploadImage, deleteImage } = require("../utils/cloudinary");
const getInfo = require("../utils/info");
const fs = require("fs-extra");

const getFranchise = async (req, res, next) => {
  const id = req.params.id;

  try {
    const franchise = await Franchise.findById(id);

    if (!franchise) {
      throw new CustomError.NotFoundError(`No Franchise with id : ${id}`);
    }

    res.status(200).json({ success: true, franchise });
  } catch (err) {
    next(err);
  }
};

const getAllFranchises = async (req, res, next) => {
  try {
    const count = await Franchise.count();
    const info = getInfo(count, req);

    const franchises = await Franchise.find()
      .limit(info.limit)
      .skip((info.page - 1) * info.limit);

    res.status(200).json({ success: true, info, franchises });
  } catch (err) {
    next(err);
  }
};

const createFranchise = async (req, res, next) => {
  if (!req.files?.thumbnail) {
    throw new CustomError.BadRequestError("No ile thumbnail upload");
  }

  try {
    const thumbnail = await uploadImage(req.files.thumbnail.tempFilePath);
    await fs.unlink(req.files.thumbnail.tempFilePath);

    const newFranchise = new Franchise({
      ...req.body,
      thumbnail: { url: thumbnail.secure_url, img_id: thumbnail.public_id },
    });
    const franchiseSaved = await newFranchise.save();

    res.status(201).json({ success: true, franchiseSaved });
  } catch (err) {
    next(err);
  }
};

const updateFranchise = async (req, res, next) => {
  const id = req.params.id;
  const update = req.body;

  try {
    if (req.files.thumbnail) {
      const thumbnail = await uploadImage(req.files.thumbnail.tempFilePath);
      await fs.unlink(req.files.thumbnail.tempFilePath);
      const franchise = await Franchise.findById(id);
      await deleteImage(franchise.thumbnail.img_id);

      update.thumbnail = {
        url: thumbnail.secure_url,
        img_id: thumbnail.public_id,
      };
    }

    const franchiseUpdate = await Franchise.findByIdAndUpdate(id, update, {
      new: true,
    });

    if (!franchiseUpdate) {
      throw new CustomError.NotFoundError(`No franchise with id : ${id}`);
    }

    res.status(200).json({ success: true, franchiseUpdate });
  } catch (err) {
    next(err);
  }
};

const deleteFrenchise = async (req, res, next) => {
  const id = req.params.id;

  try {
    const franchise = await Franchise.findById(id);

    if (!franchise) {
      throw new CustomError.NotFoundError(`No franchise with id : ${id}`);
    }

    await deleteImage(franchise.thumbnail.img_id);
    await franchise.remove();

    res.status(200).json({ success: true, msg: "Deleted" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getFranchise,
  getAllFranchises,
  createFranchise,
  updateFranchise,
  deleteFrenchise,
};
