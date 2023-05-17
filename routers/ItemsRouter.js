const ItemsController = require("../controllers/ItemsController");
const { isAuth, hasRole, isOwner } = require("../middlewares/Middleware");
module.exports = (app) => {
  var router = require("express").Router();

  router.post("/create", isAuth, ItemsController.create);
  router.get("/", ItemsController.getById);
  router.get("/:id", ItemsController.getById);
  router.put("/:id", isAuth, isOwner, ItemsController.updateItemById);
  router.delete("/:id", isAuth, isOwner, ItemsController.deleteItemById);

  app.use("/api/v1/items", router);
};
