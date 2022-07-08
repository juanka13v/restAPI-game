const { Router } = require("express");
const router = Router();
const fileUpload = require('express-fileupload')
const {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategory,
  updateCategory,
} = require("../controllers/category.controller");

router.route("/categories").get(getAllCategories);

router.post(
  "/categories",
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./uploads",
  }),
  createCategory
);

router.put('/category/:id', fileUpload({useTempFiles: true, tempFileDir: './uploads'}), updateCategory)

router
  .route("/category/:id")
  .get(getCategory)
  .delete(deleteCategory);

module.exports = router;
