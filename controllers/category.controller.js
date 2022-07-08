const CustomError = require("../errors");
const Category = require("../model/Category");
const { uploadImage, deleteImage } = require("../utils/cloudinary");
const fs = require("fs-extra");
const getInfo = require("../utils/info");

const getCategory = async (req, res, next) => {
  const id = req.params.id;

  try {
    const category = await Category.findById(id);

    if (!category) {
      throw new CustomError.NotFoundError(`No category with id : ${id}`);
    }

    res.status(200).json({ success: true, category });
  } catch (err) {
    next(err);
  }
};

const getAllCategories = async (req, res, next) => {
  try {
    const count = await Category.count();
    const info = getInfo(count, req);

    const categories = await Category.find()
      .limit(info.limit)
      .skip((info.page - 1) * info.limit);

    res.status(200).json({ success: true, info, categories });
  } catch (err) {
    next(err);
  }
};

const createCategory = async (req, res, next) => {
  if (!req.files?.thumbnail) {
    throw new CustomError.BadRequestError("No thumbail upload img");
  }

  try {
    const thumbnail = await uploadImage(req.files.thumbnail.tempFilePath);
    await fs.unlink(req.files.thumbnail.tempFilePath);

    const newCategory = new Category({
      ...req.body,
      thumbnail: { url: thumbnail.secure_url, img_id: thumbnail.public_id },
    });

    const categorySaved = await newCategory.save();

    res.status(201).json({ success: true, categorySaved });
  } catch (err) {
    next(err);
  }
};

const updateCategory = async (req, res, next) => {
  const id = req.params.id;
  const update = req.body;

  try {
    if (req.files?.thumbnail) {
      const category = await Category.findById(id);
      const thumbnail = await uploadImage(req.files.thumbnail.tempFilePath);
      await fs.unlink(req.files.thumbnail.tempFilePath);
      await deleteImage(category.thumbnail.img_id);

      update.thumbnail = {
        url: thumbnail.secure_url,
        img_id: thumbnail.public_id,
      };
    }

    const categoryUpdate = await Category.findByIdAndUpdate(id, update, {
      new: true,
    });

    if (!categoryUpdate) {
      throw new CustomError.NotFoundError(`No category with id : ${id}`);
    }

    res.status(200).json({ success: true, categoryUpdate });
  } catch (err) {
    next(err);
  }
};

const deleteCategory = async (req, res, next) => {
  const id = req.params.id;

  try {
    const categoryDeleted = await Category.findByIdAndDelete(id);

    if (!categoryDeleted) {
      throw new CustomError.NotFoundError(`No category with id : ${id}`);
    }

    await deleteImage(categoryDeleted.thumbnail.img_id);

    res.status(200).json({ success: true, msg: "Deleted" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getCategory,
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
