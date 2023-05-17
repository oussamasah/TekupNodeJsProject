const jwt = require("jsonwebtoken");
const Items = require("../models/Items");
const Orders = require("../models/Orders");
exports.isAuth = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).json({ error: "No credentials sent!" });
  }
  const token = req.headers.authorization;
  await jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decode) => {
    if (err) return res.status(401).send({ message: "Unauthorized Request" });
    req.user = decode.user;
    next();
  });
};
exports.hasRole = (role) => {
  return async function (req, res, next) {
    if (req.user.role.toLowerCase() === role.toLowerCase()) {
      next();
    } else {
      return res.status(401).send({ message: "User not permitted" });
    }
  };
};

exports.isOwner = async (req, res, next) => {
  if (!req.user) {
    return res.status(403).json({ error: "No credentials sent!" });
  }
  const user = req.user;
  if (req.originalUrl.indexOf("items") > -1) {
    await Items.findById({ _id: req.params.id })
      .then((item) => {
        if (item.owner == req.user._id) {
          next();
        } else {
          return res.status(401).send({ message: "User not permitted" });
        }
      })
      .catch((err) => {
        return res.status(400).send({ message: "Item not found" });
      });
  } else if (req.originalUrl.indexOf("orders") > -1) {
    await Orders.findById({ _id: req.params.id })
      .then((order) => {
        if (order.client == req.user._id) {
          next();
        } else {
          return res.status(401).send({ message: "Client not permitted" });
        }
      })
      .catch((err) => {
        return res.status(400).send({ message: "Order not found" });
      });
  } else {
    return res.status(400).send({ message: "Error" });
  }
};
