require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const authRoute = require("./routes/auth.route");
const gameRoute = require("./routes/game.route");
const categoryRoute = require("./routes/category.route");
const companyRoute = require("./routes/company.route");
const franchiseRoute = require("./routes/franchise.route");
const userRoute = require("./routes/user.route");
const errorHandlerMiddleware = require("./middlewares/handleErrors");

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
app.use("/api/v1", authRoute);

app.use(errorHandlerMiddleware);

app.get("/", (req, res) => {
  res.status(200).json({
    routes: {
      games: "http://localhost:3000/api/v1/games",
      single_game: "http://localhost:3000/api/v1/game/:id",
      categories: "http://localhost:3000/api/v1/categories",
      single_category: "http://localhost:3000/api/v1/category/:id",
      franchises: "http://localhost:3000/api/v1/franchises",
      single_franchise: "http://localhost:3000/api/v1/franchise/:id",
      companies: "http://localhost:3000/api/v1/companies",
      single_company: "http://localhost:3000/api/v1/company/:id",
    },
    admin_routes: {
      games: {
        create_game: {
          method: "POST",
          route: "http://localhost:3000/api/v1/games",
        },
        update_game: {
          method: "PUT",
          route: "http://localhost:3000/api/v1/game/:id",
        },
        delete_game: {
          method: "DELETE",
          route: "http://localhost:3000/api/v1/game/:id",
        },
      },
      categories: {
        create_category: {
          method: "POST",
          route: "http://localhost:3000/api/v1/categories",
        },
        update_category: {
          method: "PUT",
          route: "http://localhost:3000/api/v1/category/:id",
        },
        delete_category: {
          method: "DELETE",
          route: "http://localhost:3000/api/v1/category/:id",
        },
      },
      companies: {
        create_company: {
          method: "POST",
          route: "http://localhost:3000/api/v1/companies",
        },
        update_company: {
          method: "PUT",
          route: "http://localhost:3000/api/v1/company/:id",
        },
        delete_company: {
          method: "DELETE",
          route: "http://localhost:3000/api/v1/company/:id",
        },
      },
      franchises: {
        create_franchise: {
          method: "POST",
          route: "http://localhost:3000/api/v1/franchise",
        },
        update_franchise: {
          method: "PUT",
          route: "http://localhost:3000/api/v1/franchise/:id",
        },
        delete_franchise: {
          method: "DELETE",
          route: "http://localhost:3000/api/v1/franchise/:id",
        },
      },
    },
  });
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
