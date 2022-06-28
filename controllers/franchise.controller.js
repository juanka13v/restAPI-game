const CustomError = require("../errors");
const Franchise = require("../model/Franchise");

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
    const franchises = await Franchise.find();

    res.status(200).json({ success: true, franchises });
  } catch (err) {
    next(err);
  }
};

const createFranchise = async (req, res, next) => {
  const newFranchise = new Franchise(req.body);

  try {
    const franchiseSaved = await newFranchise.save();

    res.status(201).json({ success: true, franchiseSaved });
  } catch (err) {
    next(err);
  }
};

const updateFranchise = async (req, res, next) => {
  const id = req.params.id;

  try {
    const franchiseUpdate = await Franchise.findByIdAndUpdate(id, req.body, {
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
    const franchiseDeleted = await Franchise.findByIdAndDelete(id);

    if (!franchiseDeleted) {
      throw new CustomError.NotFoundError(`No franchise with id : ${id}`);
    }

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
