const Users = require("../models/Users");
const bcrypt = require("bcrypt");
exports.create = async (req, res) => {
  console.log(req.body);
  if (!req.body.fullname) {
    return res.status(403).send({
      message: "Fullname is required",
    });
  }
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
        data: {
          fullname: user.fullname,
          username: user.username,
          email: user.email,
          joinedAt: user.joinedAt,
        },
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
