const Company = require("../model/Company");

const getCompany = async (req, res) => {
  const id = req.params.id;
  try {
    const company = await Company.findById(id);

    res.status(400).json({ company });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find();

    res.status(200).json({ companies });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const createCompany = async (req, res) => {
  const newCompany = new Company(req.body);

  try {
    const savedCompany = await newCompany.save();

    res.status(201).json({ savedCompany });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const updateCompany = async (req, res) => {
  const id = req.params.id;
  try {
    const companyUpdated = await Company.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json({ companyUpdated });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const deleteCompany = async (req, res) => {
  const id = req.params.id;
  try {
    const companyDeleted = await Company.findByIdAndDelete(id);

    res.status(200).json({ msg: "Deleted" });
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports = {
  getCompany,
  getAllCompanies,
  createCompany,
  updateCompany,
  deleteCompany,
};
