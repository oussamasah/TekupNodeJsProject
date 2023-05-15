const jwt = require("jsonwebtoken");
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
    if (!req.headers.authorization) {
      return res.status(403).json({ error: "No credentials sent!" });
    }
    const token = req.headers.authorization;
    await jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decode) => {
      if (err) return res.status(401).send({ message: "Unauthorized Request" });

      if (decode.user.role.toLowerCase() === role.toLowerCase()) {
        next();
      } else {
        return res.status(401).send({ message: "User not permitted" });
      }
    });
  };
};

exports.isOwner = (id) => {
  return async function (req, res, next) {
    if (!req.headers.authorization) {
      return res.status(403).json({ error: "No credentials sent!" });
    }
    const token = req.headers.authorization;
    await jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decode) => {
      if (err) return res.status(401).send({ message: "Unauthorized Request" });

      if (decode.user._id === id) {
        next();
      } else {
        return res.status(401).send({ message: "User not permitted" });
      }
    });
  };
};
