const connectToMongo = require('./db');
const express = require('express');
var cors = require('cors');
connectToMongo();
require('dotenv').config();
const app = express();
app.use(cors())
app.use(express.json())
app.use('/api/auth', require('./routes/auth'))
app.use('/api', require('./routes/api'))
app.listen(process.env.PORT || 3001, () => {console.log(`listening at http://localhost:${process.env.PORT || 3001}`)})