const Orders = require("../models/Orders");
const Items = require("../models/Items");
exports.create = async (req, res) => {
  let total = 0;
  try {
    if (
      req.body.items &&
      Array.isArray(req.body.items) &&
      req.body.items.length > 0
    ) {
      await Promise.all(
        req.body.items.map(async (orderitem) => {
          await Items.findById({ _id: orderitem.item }).then((it) => {
            total += it.price * orderitem.quantity;
          });
        })
      );
    } else {
      return res.status(403).send({
        message: "Order messing Items",
      });
    }
  } catch (error) {
    return res.status(403).send({
      message: error.message,
    });
  }

  let Order = {
    client: req.user._id,
    ItemOrder: req.body.items,
    total: total,
  };

  try {
    const ord = await Orders.create(Order);
    if (ord) {
      return res.status(201).send(ord);
    }
  } catch (error) {
    return res.status(403).send({
      message: error.message || "Erreur",
    });
  }
};

exports.updateOrderStatus = async (req, res) => {
  const status = req.body.status;

  try {
    let newOrder = await Orders.findOneAndUpdate(
      { _id: req.params.id },
      { status: status },
      {
        new: true,
      }
    );
    if (newOrder) {
      return res.status(203).json({
        data: newOrder,
        message: "Order updated",
      });
    } else {
      return res.status(400).json({
        message: "Update failed",
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: "Update failed",
    });
  }
};

exports.updateOrderItemInfo = async (req, res) => {
  let total = 0;
  try {
    if (
      req.body.items &&
      Array.isArray(req.body.items) &&
      req.body.items.length > 0
    ) {
      await Promise.all(
        req.body.items.map(async (orderitem) => {
          await Items.findById({ _id: orderitem.item }).then((it) => {
            total += it.price * orderitem.quantity;
          });
        })
      );
    } else {
      return res.status(403).send({
        message: "Order messing Items",
      });
    }
  } catch (error) {
    return res.status(403).send({
      message: error.message,
    });
  }
  let Order = {
    ItemOrder: req.body.items,
    total: total,
  };

  try {
    let newOrder = await Orders.findOneAndUpdate(
      { _id: req.params.id },
      Order,
      {
        new: true,
      }
    );
    if (newOrder) {
      return res.status(203).json({
        data: newOrder,
        message: "Order updated",
      });
    } else {
      return res.status(400).json({
        message: "Update failed",
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: "Update failed",
    });
  }
};
