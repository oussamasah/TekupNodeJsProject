const Items = require("../models/Items");

exports.create = async (req, res) => {
  console.log(req.user._id);
  let Item = {
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    image: req.files ? req.files["image"] : null,
    quantity: req.body.quantity,
    owner: req.user._id,
  };

  try {
    const item = await Items.create(Item);
    if (item) {
      return res.status(201).send(item);
    }
  } catch (error) {
    console.log(error);
    return res.status(403).send({
      message: error.message || "Erreur",
    });
  }
};

exports.getById = async (req, res) => {
  let id = null;
  if (req.query.q) {
    id = req.query.q;
  }
  if (req.params.id) {
    id = req.params.id;
  }
  if (!id) {
    return res.status(400).send({
      message: "Id not found",
    });
  }
  await Items.findById({ _id: id })
    .then((item) => {
      return res.status(200).send(item);
    })
    .catch((err) => {
      return res.status(400).send({
        message: "Item not found",
      });
    });
};

exports.updateItemById = async (req, res) => {
  const data = req.body;

  try {
    let newItem = await Items.findOneAndUpdate({ _id: req.params.id }, data, {
      new: true,
    });
    if (newItem) {
      return res.status(203).json({
        data: newItem,
        message: "Item updated",
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

exports.deleteItemById = async (req, res) => {
  try {
    await Items.findOneAndDelete({ _id: req.params.id })
      .then((doc) => {
        if (doc) {
          return res.status(203).json({
            data: doc,
            message: "Item Deleted",
          });
        }
      })
      .catch((err) => {
        if (doc) {
          return res.status(403).json({
            data: doc,
            message: err.message,
          });
        }
      });
  } catch (error) {
    return res.status(400).json({
      message: "Delete failed",
    });
  }
};
