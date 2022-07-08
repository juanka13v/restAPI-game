const { model, Schema } = require("mongoose");

const companySchema = new Schema({
  company: {
    type: String,
    required: [true, "Please provide a company name"],
    trim: true,
    unique: true
  },
  description: {
    type: String,
    required: [true, "Please provide a description"],
  },
  thumbnail: {
    url: {type: String, required: "Please provide a url"},
    img_id: {type: String, required: "Please provide a img_id"}
  },
  foundation: {
    date: { type: Date, required: [true, "Please provide a Date"] },
    country: { type: String },
    city: { type: String },
  },
  ceo: {
    type: String
  },
  games: [
    {
      type: Schema.Types.ObjectId,
      ref: "Game",
    },
  ],
});

module.exports = model("Company", companySchema);
