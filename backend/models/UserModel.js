const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({

 username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      lowercase: true
    },
    firstname: {
      type: String,
      required: [true, "First name is required"],

      trim: true
    },
    lastname: {
      type: String,
      required: [true, "Last name is required"],

      trim: true
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    createdon:
    {
      type: Date,
      default: Date.now
    }

})

module.exports = mongoose.model("User", UserSchema)