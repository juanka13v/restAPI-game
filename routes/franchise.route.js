const { Router } = require("express");
const router = Router();
const {
  createFranchise,
  deleteFrenchise,
  getAllFranchises,
  getFranchise,
  updateFranchise,
} = require("../controllers/franchise.controller");

router.route("/franchises").get(getAllFranchises).post(createFranchise);
router
  .route("/franchise/:id")
  .get(getFranchise)
  .put(updateFranchise)
  .delete(deleteFrenchise);

module.exports = router;
