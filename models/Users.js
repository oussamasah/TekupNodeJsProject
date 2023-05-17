var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var UserSchema = new Schema({
  fullname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: [true, "Username already taken"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email already used"],
    trim: true,
    lowercase: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: "Please enter a valid email",
    },
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    min: [6, "Must be at least 6 chars"],
  },
  role: {
    type: String,
    enum: ["Admin", "Owner", "Client"],
    required: [true, "Role is required"],
    default: "Client",
  },
  joinedAt: {
    type: Date,
    required: [true, "Create date is required"],
    default: Date.now,
  },
  isActive: {
    type: Boolean,
    required: true,
    default: false,
  },
});
UserSchema.index(
  {
    username: 1,
    email: 1,
  },
  {
    unique: true,
  }
);
module.exports = mongoose.model("Users", UserSchema);
