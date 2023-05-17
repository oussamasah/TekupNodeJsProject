const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Database Connection
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((data) => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

//CORS RESTRICTION
var corsOptions = {
  origin: true,
  origin: true,
  credentials: true,
  exposedHeaders: ["Set-Cookie"],
};
app.use(cors(corsOptions));

//APP ROUTES
app.get("/", (req, res) => {
  res.json({ message: "Welcome to TEKUP PROJECT application." });
});
require("./routers/AuthRouter")(app);
require("./routers/ItemsRouter")(app);
require("./routers/OrdersRouter")(app);
// SERVER SETUP AND EXECUTION
app.listen(process.env.APP_PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running, and App is listening on port " +
        process.env.APP_PORT
    );
  else console.log("Error occurred, server can't start", error);
});
