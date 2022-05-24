const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://tkdchat:IEz2GhhtMjosLora@tkdchat.fwet5.mongodb.net/tkdchat"
const connectToMongo = ()=>{mongoose.connect(mongoURI, ()=>{console.log("Connected to Mongo Successfully");})}
module.exports = connectToMongo;