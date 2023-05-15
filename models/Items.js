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
  },
  description: {
    type: String,
  },
  image: {
    type: { data: Buffer, contentType: String },
    required: [true, "Image is required"],
  },
  quantity: {
    type: Number,
    required: [true, "Image is required"],
  },
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

module.exports = mongoose.model("Items", ItemSchema);
