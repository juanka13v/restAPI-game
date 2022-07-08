const { model, Schema } = require("mongoose");

const categorySchema = new Schema({
  category: {
    type: String,
    required: [true, "Please provide a category"],
    trim: true,
    unique: true,
  },
  description: {
    type: String,
    required: [true, "Please provide a description"],
  },
  thumbnail: {
    url: { type: String, required: [true, "Please provide a img_url"] },
    img_id: { type: String, required: [true, "Please provide a img_id"] },
  },
  games: [
    {
      type: Schema.Types.ObjectId,
      ref: "Game",
    },
  ],
});

module.exports = model("Category", categorySchema);
