const mongoose = require("mongoose");
const { Schema } = mongoose;
const UserSchema = new Schema({
  name: {type: String,required: true,},
  username: {type: String,required: true,},
  email: {type: String,required: true,unique: true,},
  password: {type: String,required: true,},
  picimg: {type: String,required: true,},
  phone: {type: String,required: true,},
  country: {type: String,required: true,},
  contacts: {type: Array,required: false,},
  blockcontacts: {type: Array,required: false,},
  gender: {type: String,required: false,},
  status: {type: String,required: true,},
  contact: {type: Array,default:[]},
  dof: {type: String,required: true,},
  date: {type: Date,default: Date.now,},
});
const User = mongoose.model("user", UserSchema);
module.exports = User;
