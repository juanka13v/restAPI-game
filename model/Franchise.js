const { model, Schema } = require("mongoose");

const franchiseSchema = new Schema({
  franchise: {
    type: String,
    required: [true, "Please provide a franchise game"],
    trim: true,
    lowercase: true,
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
  screenshots: [
    {
      type: String,
      required: [true, "Please provide one or more screenshots"],
    },
  ],
  header: {
    type: String,
    required: [true, "Please provide a header"],
  },
});

module.exports = model("Franchise", franchiseSchema);
