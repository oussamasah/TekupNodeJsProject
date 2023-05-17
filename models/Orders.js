var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var OrderSchema = new Schema({
  date: {
    type: Date,
    required: [true, "Create date is required"],
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["Pending", "Success", "Failed"],
    required: [true, "Status is required"],
    default: "Pending",
  },
  client: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  ItemOrder: [
    {
      item: {
        ref: "Items",
        type: Schema.Types.ObjectId,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: [1, "Quantity Must be at least 1"],
      },
    },
  ],
});

module.exports = mongoose.model("Orders", OrderSchema);
