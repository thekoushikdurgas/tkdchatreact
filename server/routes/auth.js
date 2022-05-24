const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');
const JWT_SECRET = 'TKDP0rtf0I10';
router.post('/createuser', [
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('username', 'Enter a valid username').isLength({ min: 3 }),
  body('phone', 'Enter a valid phone').isLength({ min: 3 }),
  body('picimg', 'Enter a valid picimg').isLength({ min: 10 }),
  body('country', 'Enter a valid country').isLength({ min: 3 }),
  body('dof', 'Enter a valid dof').isLength({ min: 3 }),
  body('gender', 'Enter a valid gender').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {return res.status(400).json({ errors: errors.array() });}
  try {
    const { name,email, password,username,phone,country,dof,picimg,gender } = req.body;
    var user = await User.findOne({ email: email });
    if (user) {return res.status(400).json({ error: "Sorry a user with this email already exists" })}
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(password, salt);
    user = await User.create({name: name,password: secPass,email: email,username: username,phone: phone,country: country,status: 'offline',dof: dof,picimg: picimg,gender: gender,});
    const data = {user:{id: user.id}}
    const authtoken = jwt.sign(data, JWT_SECRET);
    res.json({authtoken});
  } catch (error) {console.error(error.message);res.status(500).send("Some Error occured");}
});
router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
  var success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {return res.status(400).json({ errors: errors.array() });}
  const { email, password } = req.body;
  try {
    var user = await User.findOne({ email });
    if (!user) {success = false;return res.status(400).json({ error: "Please try to login with correct credentials" });}
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {success = false;return res.status(400).json({ success, error: "Please try to login with correct credentials" });}
    const data = {user: {id: user.id}};
    const name = user.name;
    const username = user.username;
    const picimg = user.picimg;
    const authtoken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({ success, authtoken ,picimg,name,username})
  } catch (error) {console.error(error.message);res.status(500).send("Internal Server Error");}
});
router.post('/getuser', fetchuser,  async (req, res) => {
  try {
    var userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);  
  } catch (error) {console.error(error.message);res.status(500).send("Internal Server Error");}
})
router.post('/getusers', fetchuser,  async (req, res) => {
  try {
    const user = await User.find();
    const temp3 = await User.findById(req.user.id);
    const temp4 = temp3.contacts;
    var temp2 = [];
    for (var i = 0; i < user.length; i++) {
      if(!temp4.includes(user[i].id) && user[i].id != req.user.id){
        const temp3 = await User.findById(user[i].id);
        var temp1 = {};
        temp1.id = temp3.id;
        temp1.name = temp3.name;
        temp1.username = temp3.username;
        temp1.email = temp3.email;
        temp1.picimg = temp3.picimg;
        temp1.phone = temp3.phone;
        temp1.status = temp3.status;
        temp1.country = temp3.country;
        temp1.gender = temp3.gender;
        temp2.push(temp1);
      }
    }
    res.send(temp2);  
  } catch (error) {console.error(error.message);res.status(500).send("Internal Server Error");}
})
module.exports = router