const { model, Schema } = require("mongoose");

const categorySchema = new Schema({
  category: {
    type: String,
    required: [true, "Please provide a category"],
    trim: true,
    unique: true
  },
  description: {
    type: String,
    required: [true, "Please provide a description"],
  },
  header: {
    type: String,
    required: [true, "Please provide a header"],
  },
  games: [
    {
      type: Schema.Types.ObjectId,
      ref: "Game",
    },
  ]
});

module.exports = model("Category", categorySchema);
