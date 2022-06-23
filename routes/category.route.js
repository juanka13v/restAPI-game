const { Router } = require("express");
const router = Router();
const {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategory,
  updateCategory,
} = require("../controllers/category.controller");

router.route("/categories").get(getAllCategories).post(createCategory);
router
  .route("/category/:id")
  .get(getCategory)
  .put(updateCategory)
  .delete(deleteCategory);

module.exports = router;
