const CustomError = require("../errors");
const Category = require("../model/Category");

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
    const categories = await Category.find();

    res.status(200).json({ success: true, categories });
  } catch (err) {
    next(err);
  }
};

const createCategory = async (req, res, next) => {
  const newCategory = new Category(req.body);

  try {
    const categorySaved = await newCategory.save();

    res.status(201).json({ success: true, categorySaved });
  } catch (err) {
    next(err);
  }
};

const updateCategory = async (req, res, next) => {
  const id = req.params.id;

  try {
    const categoryUpdate = await Category.findByIdAndUpdate(id, req.body, {
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
