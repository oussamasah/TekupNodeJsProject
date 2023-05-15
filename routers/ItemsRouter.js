const ItemsController = require("../controllers/ItemsController");
const { isAuth, hasRole } = require("../middlewares/Middleware");
module.exports = (app) => {
  var router = require("express").Router();
  // Create a new User
  router.post("/create", isAuth, ItemsController.create);
  /*   router.get("/get/:id", backupsite.get);
  router.post("/restaurer/:id", backupsite.restaurer);
  router.delete("/delete/:id", backupsite.delete); */
  app.use("/api/v1/items", router);
};
