const mongoose = require("mongoose");
const { Schema } = mongoose;
const Schemamodel = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  contactid: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  star1: { type: Boolean, default: false },
  star2: { type: Boolean, default: false },
  message: { type: String, required: true },
  updated_at: { type: Date, default: Date.now },
});
module.exports = mongoose.model("tkdchat", Schemamodel);