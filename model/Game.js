const { model, Schema } = require("mongoose");

const gameSchema = new Schema({
  title: {
    type: String,
    unique: true,
    required: [true, "Please provide a realease date"],
  },
  thumbnail: {
    type: String,
    required: [true, "Please provide a thumbnail"],
  },
  description: {
    type: String,
    required: [true, "Please provide a description"],
  },
  genre: {
    type: String,
    required: [true, "Please provide a genre"],
    lowercase: true,
    trim: true,
  },
  publisher: {
    type: String,
    required: [true, "Please provide a publisher"],
  },
  release_date: {
    type: Date,
    lowercase: true,
    required: [true, "Please provide a realease date"],
  },
  platform: [
    {
      type: String,
      required: [true, "Please provide a Platform"],
      lowercase: true,
    },
  ],
  franchise: {
    type: String,
    default: "any",
  },
  developer: {
    type: String,
    required: [true, "Please provide a developer"],
  },
  minimum_system_requirements: {
    os: { type: String, default: "any" },
    processor: { type: String, default: "any" },
    graphics: { type: String, default: "any" },
    storage: { type: String, default: "any" },
  },
  screenshots: [
    {
      type: String,
      required: [true, "Please provide one o more screenshots"],
    },
  ],
});

module.exports = model("Game", gameSchema);
