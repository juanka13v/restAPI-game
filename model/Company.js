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
  header: {
    type: String,
    required: [true, "Please provide a header"],
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
