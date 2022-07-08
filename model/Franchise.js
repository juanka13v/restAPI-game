const { model, Schema } = require("mongoose");

const franchiseSchema = new Schema({
  franchise: {
    type: String,
    required: [true, "Please provide a franchise game"],
    trim: true,
    lowercase: true,
    unique: true,
  },
  description: {
    type: String,
    required: [true, "Please provide a description"],
  },
  games: [
    {
      type: Schema.Types.ObjectId,
      ref: "Game",
    },
  ],
  thumbnail: {
    url: { type: String, required: [true, "Please provide a url thumbnail"] },
    img_id: {
      type: String,
      required: [true, "Please provide a img_id thumbnail"],
    },
  },
});

module.exports = model("Franchise", franchiseSchema);
