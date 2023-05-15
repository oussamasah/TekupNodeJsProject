const UsersController = require("../controllers/UsersController");
module.exports = (app) => {
  var router = require("express").Router();
  // Create a new User
  router.post("/create", UsersController.create);
  /*   router.get("/get/:id", backupsite.get);
  router.post("/restaurer/:id", backupsite.restaurer);
  router.delete("/delete/:id", backupsite.delete); */
  app.use("/api/v1/users", router);
};
