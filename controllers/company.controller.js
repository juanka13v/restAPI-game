const CustomError = require("../errors");
const Company = require("../model/Company");

const getCompany = async (req, res, next) => {
  const id = req.params.id;
  try {
    const company = await Company.findById(id);

    if (!company) {
      throw new CustomError.NotFoundError(`No company with id : ${id}`);
    }

    res.status(400).json({ success: true, company });
  } catch (err) {
    next(err);
  }
};

const getAllCompanies = async (req, res, next) => {
  try {
    const companies = await Company.find();

    res.status(200).json({ success: true, companies });
  } catch (err) {
    next(err);
  }
};

const createCompany = async (req, res, next) => {
  const newCompany = new Company(req.body);

  try {
    const savedCompany = await newCompany.save();

    res.status(201).json({ success: true, savedCompany });
  } catch (err) {
    next(err);
  }
};

const updateCompany = async (req, res, next) => {
  const id = req.params.id;
  try {
    const companyUpdated = await Company.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!companyUpdated) {
      throw new CustomError(`No company with id : ${id}`);
    }

    res.status(200).json({ success: true, companyUpdated });
  } catch (err) {
    next(err);
  }
};

const deleteCompany = async (req, res, next) => {
  const id = req.params.id;
  try {
    const companyDeleted = await Company.findByIdAndDelete(id);

    if (!companyDeleted) {
      throw new CustomError.NotFoundError(`No company with id : ${id}`);
    }

    res.status(200).json({ success: true, msg: "Deleted" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getCompany,
  getAllCompanies,
  createCompany,
  updateCompany,
  deleteCompany,
};
