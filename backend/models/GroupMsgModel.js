const mongoose = require("mongoose")

const GroupSchema =  new Schema({

 from_user: {
      type: String,
      trim: true
    },
    room: {
      type: String,
      trim: true,
      lowercase: true
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

module.exports = mongoose.model("GroupMsg", GroupSchema)