const Category = require("../model/Category");

const getCategory = async (req, res) => {
  const id = req.params.id;

  try {
    const category = await Category.findById(id);

    res.status(200).json({ category });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();

    res.status(200).json({ categories });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const createCategory = async (req, res) => {
  const newCategory = new Category(req.body);

  try {
    const categorySaved = await newCategory.save();

    res.status(200).json({ categorySaved });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const updateCategory = async (req, res) => {
  const id = req.params.id;

  try {
    const categoryUpdate = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json({ categoryUpdate });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const deleteCategory = async (req, res) => {
  const id = req.params.id;

  try {
    const categoryDeleted = await Category.findByIdAndDelete(id);

    res.status(200).json({ msg: "Deleted" });
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports = {
  getCategory,
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
