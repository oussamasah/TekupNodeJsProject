var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ItemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    min: [5, "Price Must be at least 5DT"],
  },
  description: {
    type: String,
  },
  image: {
    type: { data: Buffer, contentType: String },
  },
  quantity: {
    type: Number,
    required: [true, "Quantity is required"],
    min: [5, "Quantity Must be at least 1"],
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
});

module.exports = mongoose.model("Items", ItemSchema);
