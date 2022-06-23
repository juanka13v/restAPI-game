const { Router } = require("express");
const router = Router();
const {
  createCompany,
  deleteCompany,
  getAllCompanies,
  getCompany,
  updateCompany,
} = require("../controllers/company.controller");

router.route("/companies").get(getAllCompanies).post(createCompany);
router
  .route("/company/:id")
  .get(getCompany)
  .put(updateCompany)
  .delete(deleteCompany);

module.exports = router;
