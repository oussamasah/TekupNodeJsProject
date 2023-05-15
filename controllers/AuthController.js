const Users = require("../models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.create = async (req, res, next) => {
  console.log(req.body);
  let User = {
    fullname: req.body.fullname,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
  };

  const password = await bcrypt.hash(req.body.password, process.env.APP_SALT);
  User.password = password;

  try {
    const user = await Users.create(User);
    if (user) {
      await delete user.password;
      return res.status(201).send({
        fullname: user.fullname,
        username: user.username,
        email: user.email,
        joinedAt: user.joinedAt,
      });
    }
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).send({
        message: "User already exist",
      });
    } else {
      return res.status(403).send({
        message: error.message || "Erreur",
      });
    }
  }
};

exports.login = async (req, res) => {
  if (!req.body.username) {
    res.status(400).send({ message: "Username is required" });
    return;
  }
  if (!req.body.password) {
    res.status(400).send({ message: "Password is required" });
    return;
  }

  /****************** Check if user exists *************/
  const user = await Users.findOne({ username: req.body.username });

  if (!user) {
    return res.status(401).send({ message: "Username doesn't exist" });
  }
  /****************** Check if pass is valid *************/
  const plainTohash = await bcrypt.hash(
    req.body.password,
    process.env.APP_SALT
  );
  if (plainTohash !== user.password) {
    return res.status(400).send({ message: "Login failed" });
  }

  /****************** Generate token for user *****************/
  const token = await jwt.sign({ user }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.TOKEN_EXPIRE,
  });

  /****************Set Authorization in cookies **************** */
  res.cookie("Authorization ", token, {
    secure: true,
    httpOnly: true,
  });

  return res
    .status(200)
    .send({ message: "Connected successfuly", token: token });
};
