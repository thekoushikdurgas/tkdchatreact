const mongoose = require("mongoose");
const { Schema } = mongoose;
const Schemamodel = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  ccode: { type: String, required: true },
  value: { type: String, required: true },
  name: { type: String, required: true },
  mcode: { type: String, required: true },
  continents: { type: String, required: true },
  updated_at: { type: Date, default: Date.now },
});
module.exports = mongoose.model("country", Schemamodel);