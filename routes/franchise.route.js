const { Router } = require("express");
const fileUpload = require("express-fileupload");
const router = Router();
const {
  createFranchise,
  deleteFrenchise,
  getAllFranchises,
  getFranchise,
  updateFranchise,
} = require("../controllers/franchise.controller");

router.route("/franchises").get(getAllFranchises);

router.post(
  "/franchises",
  fileUpload({ useTempFiles: true, tempFileDir: "./uploads" }),
  createFranchise
);
router.put(
  "/franchise/:id",
  fileUpload({ useTempFiles: true, tempFileDir: "./uploads" }),
  updateFranchise
);

router.route("/franchise/:id").get(getFranchise).delete(deleteFrenchise);

module.exports = router;
