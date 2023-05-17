const OrderssController = require("../controllers/OrdersController");
const { isAuth, hasRole, isOwner } = require("../middlewares/Middleware");
module.exports = (app) => {
  var router = require("express").Router();

  router.post("/create", isAuth, hasRole("Client"), OrderssController.create);
  router.patch(
    "/status/:id",
    isAuth,
    hasRole("Admin"),
    OrderssController.updateOrderStatus
  );
  router.patch(
    "/:id",
    isAuth,
    hasRole("Client"),
    isOwner,
    OrderssController.updateOrderItemInfo
  );

  app.use("/api/v1/Orders", router);
};
