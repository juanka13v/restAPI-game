const User = require("../model/User");

const getUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id);

    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({ users });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const createUser = async (req, res) => {
  const newUser = new User(req.body);

  try {
    const userSaved = await newUser.save();

    res.status(200).json({ userSaved });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const updateUser = async (req, res) => {
  const id = req.params.id;

  try {
    const userUpdated = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json({ userUpdated });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    const userDeleted = await User.findByIdAndDelete(id);

    res.status(200).json({ msg: "Deleted" });
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports = {
  getUser,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
};
