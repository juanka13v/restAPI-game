const CustomError = require("../errors");
const Company = require("../model/Company");
const { deleteImage, uploadImage } = require("../utils/cloudinary");
const fs = require("fs-extra");
const getInfo = require("../utils/info");

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
    const count = await Company.count();
    const info = getInfo(count, req);

    const companies = await Company.find()
      .limit(info.limit)
      .skip((info.page - 1) * info.limit);

    res.status(200).json({ success: true, info, companies });
  } catch (err) {
    next(err);
  }
};

const createCompany = async (req, res, next) => {
  if (!req.files?.thumbnail) {
    throw new CustomError.BadRequestError("No thumbnail upload");
  }

  try {
    const thumbnail = await uploadImage(req.files.thumbnail.tempFilePath);
    await fs.unlink(req.files.thumbnail.tempFilePath);

    const newCompany = new Company({
      ...req.body,
      foundation: {
        date: req.body.date,
        country: req.body.country,
        city: req.body.city,
      },
      thumbnail: { url: thumbnail.secure_url, img_id: thumbnail.public_id },
    });

    const savedCompany = await newCompany.save();

    res.status(201).json({ success: true, savedCompany });
  } catch (err) {
    next(err);
  }
};

const updateCompany = async (req, res, next) => {
  const id = req.params.id;
  const update = req.body;

  try {
    if (req.files?.thumbnail) {
      const thumbnail = await uploadImage(req.files.thumbnail.tempFilePath);
      await fs.unlink(req.files.thumbnail.tempFilePath);
      update.thumbnail = {
        url: thumbnail.secure_url,
        img_id: thumbnail.public_id,
      };
      const company = await Company.findById(id);
      await deleteImage(company.thumbnail.img_id);
    }

    const companyUpdated = await Company.findByIdAndUpdate(id, update, {
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
    const companyDeleted = await Company.findById(id);

    if (!companyDeleted) {
      throw new CustomError.NotFoundError(`No company with id : ${id}`);
    }

    await deleteImage(companyDeleted.thumbnail.img_id);
    await companyDeleted.remove();

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
