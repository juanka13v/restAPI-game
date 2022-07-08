const User = require("../model/User");
const jwt = require("jsonwebtoken");
const CustomError = require("../errors");

const signUp = async (req, res, next) => {
  const { name, email, password, role } = req.body;

  if (!/^[a-z0-9_.]+@[a-z0-9]+\.[a-z0-9_.]+$/i.test(email)) {
    throw new CustomError.BadRequestError("email must be valid");
  }

  const newUser = new User({
    name,
    email,
    password: await User.encryptPassword(password),
    role,
  });

  try {
    const savedUser = await newUser.save();

    const token = jwt.sign({ id: savedUser._id }, process.env.SECRET, {
      expiresIn: 86400,
    });

    res.status(201).json({ status: true, token });
  } catch (err) {
    next(err);
  }
};

const signIn = async (req, res, next) => {
  try {
    const userFound = await User.findOne({ email: req.body.email });

    if (!userFound) {
      throw new CustomError.NotFoundError(
        `user not found with email: ${req.body.email}`
      );
    }

    const matchPassword = await User.comparePassword(
      req.body.password,
      userFound.password
    );

    if (!matchPassword) {
      throw new CustomError.UnauthenticatedError("Invalid password");
    }

    const token = jwt.sign({ id: userFound._id }, process.env.SECRET, {
      expiresIn: 86400,
    });

    res.status(200).json({ status: true, token });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  signIn,
  signUp,
};
