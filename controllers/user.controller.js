const CustomError = require('../errors')
const User = require("../model/User");

const getUser = async (req, res, next) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id);

    if(!user) {
      throw new CustomError.NotFoundError(`No user with id : ${id}`) 
    }

    res.status(200).json({ success:true, user });
  } catch (err) {
    next(err)
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(200).json({ success:true, users });
  } catch (err) {
    next(err)
  }
};

const createUser = async (req, res, next) => {
  const newUser = new User(req.body);

  try {
    const userSaved = await newUser.save();

    res.status(200).json({ success:true, userSaved });
  } catch (err) {
    next(err)
  }
};

const updateUser = async (req, res, next) => {
  const id = req.params.id;

  try {
    const userUpdated = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if(!userUpdated) {
      throw new CustomError.NotFoundError(`No user with id : ${id}`)
    }

    res.status(200).json({ success:true, userUpdated });
  } catch (err) {
    next(err)
  }
};

const deleteUser = async (req, res, next) => {
  const id = req.params.id;

  try {
    const userDeleted = await User.findByIdAndDelete(id);

    if(!userDeleted) {
      throw new CustomError.NotFoundError(`No user with id : ${id}`)
    }

    res.status(200).json({ success:true, msg: "Deleted" });
  } catch (err) {
    next(err)
  }
};

module.exports = {
  getUser,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
};
