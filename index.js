require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const gameRoute = require("./routes/game.route");
const categoryRoute = require("./routes/category.route");
const companyRoute = require("./routes/company.route");
const franchiseRoute = require("./routes/franchise.route");
const userRoute = require("./routes/user.route");

// connect to MongoDB
const connectDB = require("./db/connect");

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/v1", gameRoute);
app.use("/api/v1", categoryRoute);
app.use("/api/v1", companyRoute);
app.use("/api/v1", franchiseRoute);
app.use("/api/v1", userRoute);

app.get("/", (req, res) => {
  res.send("hOLA MUNDO");
});

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    // connectDB
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
