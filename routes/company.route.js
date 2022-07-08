const { Router } = require("express");
const router = Router();
const fileUpload = require("express-fileupload");
const {
  createCompany,
  deleteCompany,
  getAllCompanies,
  getCompany,
  updateCompany,
} = require("../controllers/company.controller");

router.route("/companies").get(getAllCompanies);

router.post(
  "/companies",
  fileUpload({ useTempFiles: true, tempFileDir: "./uploads" }),
  createCompany
);

router.put(
  "/company/:id",
  fileUpload({ useTempFiles: true, tempFileDir: "./uploads" }),
  updateCompany
);
router.delete(
  "/company/:id",
  fileUpload({ useTempFiles: true, tempFileDir: "./uploads" }),
  deleteCompany
);

router.route("/company/:id").get(getCompany);

module.exports = router;
