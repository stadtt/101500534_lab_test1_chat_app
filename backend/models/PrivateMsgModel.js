const mongoose = require("mongoose")

const PrivateSchema =  new Schema({

 from_user: {
      type: String,
      trim: true
    },
    to_user: {
      type: String,
      trim: true
    },
    message: {
      type: String,
      trim: true
    },
    date_sent: {
      type: Date,
      default: Date.now
    }

})

module.exports = mongoose.model("PrivateMsg", PrivateSchema)