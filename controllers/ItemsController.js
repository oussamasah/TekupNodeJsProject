const Items = require("../models/Items");

exports.create = async (req, res) => {
  console.log(req.body);
  return;
  let Item = {
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    image: req.files["image"],
    quantity: req.body.quantity,
    owner: req.user._id,
  };

  try {
    const item = await Users.create(Item);
    if (item) {
      return res.status(201).send({
        item: item,
      });
    }
  } catch (error) {
    return res.status(403).send({
      message: error.message || "Erreur",
    });
  }
};
