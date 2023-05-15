const AuthController = require("../controllers/AuthController");
const { isAuth, hasRole } = require("../middlewares/Middleware");
module.exports = (app) => {
  var router = require("express").Router();
  // Create a new User
  router.post("/signup", isAuth, hasRole("admin"), AuthController.create);
  router.post("/login", AuthController.login);
  app.use("/api/v1/auth", router);
};
