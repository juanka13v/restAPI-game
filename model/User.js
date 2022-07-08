const { model, Schema } = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide a email"],
    trim: true,
    unique: true,
  },
  games: [
    {
      type: Schema.Types.ObjectId,
      ref: "Game",
    },
  ],
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

userSchema.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

userSchema.statics.comparePassword = async (password, receivedPassword) => {
  return await bcrypt.compare(password, receivedPassword);
};

module.exports = model("User", userSchema);
