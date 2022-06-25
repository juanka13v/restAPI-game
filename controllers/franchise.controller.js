const Franchise = require("../model/Franchise");

const getFranchise = async (req, res) => {
  const id = req.params.id;

  try {
    const franchise = await Franchise.findById(id);

    res.status(200).json({ franchise });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const getAllFranchises = async (req, res) => {
  try {
    const franchises = await Franchise.find();

    res.status(200).json({ franchises });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const createFranchise = async (req, res) => {
  const newFranchise = new Franchise(req.body);

  try {
    const franchiseSaved = await newFranchise.save();

    res.status(201).json({ franchiseSaved });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const updateFranchise = async (req, res) => {
  const id = req.params.id;

  try {
    const franchiseUpdate = await Franchise.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json({ franchiseUpdate });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const deleteFrenchise = async (req, res) => {
  const id = req.params.id;

  try {
    const franchiseDeleted = await Franchise.findByIdAndDelete(id);

    res.status(200).json({ msg: "Deleted" });
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports = {
  getFranchise,
  getAllFranchises,
  createFranchise,
  updateFranchise,
  deleteFrenchise,
};
