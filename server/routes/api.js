const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const country = require('../models/country');
const User = require('../models/User');
const tkdchat = require('../models/tkdchat');
const { body, validationResult } = require('express-validator');

router.get('/contact', fetchuser, async (req, res) => {
  try {
    const temp3 = await User.findById(req.user.id);
    var temp = temp3.contacts;
    var temp2 = [];
    for (var i = 0; i < temp.length; i++) {
      const temp3 = await User.findById(temp[i]);
      var temp1 = {};
      temp1.id = temp3.id;
      temp1.name = temp3.name;
      temp1.username = temp3.username;
      temp1.email = temp3.email;
      temp1.picimg = temp3.picimg;
      temp1.phone = temp3.phone;
      temp1.status = temp3.status;
      temp1.country = temp3.country;
      temp1.last = 'ABC';
      temp2.push(temp1);
    }
    res.json(temp2);
  }
  catch (error) { console.error(error.message); res.status(500).send("Internal Server Error"); }
});
router.post("/addcontact", fetchuser, async (req, res) => {
  try {
    const contactid = req.header("contactid");
    const temp3 = await User.findById(req.user.id);
    var temp2 = temp3.contacts;
    temp2.push(contactid);
    const temp = await User.findById(req.user.id);
    temp.contacts = temp2;
    await temp.save();
    res.json({ success: true });
  } catch (error) { console.error(error.message); res.json({ success: false }); }
}
);
router.post("/tkdchat", fetchuser, async (req, res) => {
  try {
    const contactid = req.header("contactid");
    const message = req.header("message");
    const errors = validationResult(req);
    if (!errors.isEmpty()) { return res.status(400).json({ errors: errors.array() }); }
    const temp = new tkdchat({ user: req.user.id, contactid, message });
    const savedtemp = await temp.save();
    res.json(savedtemp);
  } catch (error) { console.error(error.message); res.status(500).send("Internal Server Error"); }
}
);

router.get('/chat', fetchuser, async (req, res) => {
  try {
    const temp = await tkdchat.find().and([{ $or: [{ user: req.user.id }, { contactid: req.user.id }] },]);
    var temp2 = [];
    for (var i = 0; i < temp.length; i++) {
      const temp3 = await User.findById(temp[i].user);
      var temp1 = {};
      temp1.type = temp3.id === req.user.id ? 'sent' : 'replies';
      temp1.message = temp[i].message;
      temp1.contactid = temp3.id === req.user.id ? temp[i].contactid : temp3.id;
      temp1.star = temp[i].star;
      temp1.date = formatDate(temp[i].updated_at, "d/MMM/yyyy");
      temp1.time = formatDate(temp[i].updated_at, "h:mmtt");
      temp2.push(temp1);
    }
    res.json(temp2);
  }
  catch (error) { console.error(error.message); res.status(500).send("Internal Server Error"); }
});

function formatDate(date, format, utc) {
  var MMMM = ["\x00", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var MMM = ["\x01", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var dddd = ["\x02", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var ddd = ["\x03", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  function ii(i, len) {
    var s = i + "";
    len = len || 2;
    while (s.length < len) s = "0" + s;
    return s;
  }
  var y = utc ? date.getUTCFullYear() : date.getFullYear();
  format = format.replace(/(^|[^\\])yyyy+/g, "$1" + y);
  format = format.replace(/(^|[^\\])yy/g, "$1" + y.toString().substr(2, 2));
  format = format.replace(/(^|[^\\])y/g, "$1" + y);
  var M = (utc ? date.getUTCMonth() : date.getMonth()) + 1;
  format = format.replace(/(^|[^\\])MMMM+/g, "$1" + MMMM[0]);
  format = format.replace(/(^|[^\\])MMM/g, "$1" + MMM[0]);
  format = format.replace(/(^|[^\\])MM/g, "$1" + ii(M));
  format = format.replace(/(^|[^\\])M/g, "$1" + M);
  var d = utc ? date.getUTCDate() : date.getDate();
  format = format.replace(/(^|[^\\])dddd+/g, "$1" + dddd[0]);
  format = format.replace(/(^|[^\\])ddd/g, "$1" + ddd[0]);
  format = format.replace(/(^|[^\\])dd/g, "$1" + ii(d));
  format = format.replace(/(^|[^\\])d/g, "$1" + d);
  var H = utc ? date.getUTCHours() : date.getHours();
  format = format.replace(/(^|[^\\])HH+/g, "$1" + ii(H));
  format = format.replace(/(^|[^\\])H/g, "$1" + H);
  var h = H > 12 ? H - 12 : H == 0 ? 12 : H;
  format = format.replace(/(^|[^\\])hh+/g, "$1" + ii(h));
  format = format.replace(/(^|[^\\])h/g, "$1" + h);
  var m = utc ? date.getUTCMinutes() : date.getMinutes();
  format = format.replace(/(^|[^\\])mm+/g, "$1" + ii(m));
  format = format.replace(/(^|[^\\])m/g, "$1" + m);
  var s = utc ? date.getUTCSeconds() : date.getSeconds();
  format = format.replace(/(^|[^\\])ss+/g, "$1" + ii(s));
  format = format.replace(/(^|[^\\])s/g, "$1" + s);
  var f = utc ? date.getUTCMilliseconds() : date.getMilliseconds();
  format = format.replace(/(^|[^\\])fff+/g, "$1" + ii(f, 3));
  f = Math.round(f / 10);
  format = format.replace(/(^|[^\\])ff/g, "$1" + ii(f));
  f = Math.round(f / 10);
  format = format.replace(/(^|[^\\])f/g, "$1" + f);
  var T = H < 12 ? "AM" : "PM";
  format = format.replace(/(^|[^\\])TT+/g, "$1" + T);
  format = format.replace(/(^|[^\\])T/g, "$1" + T.charAt(0));
  var t = T.toLowerCase();
  format = format.replace(/(^|[^\\])tt+/g, "$1" + t);
  format = format.replace(/(^|[^\\])t/g, "$1" + t.charAt(0));
  var tz = -date.getTimezoneOffset();
  var K = utc || !tz ? "Z" : tz > 0 ? "+" : "-";
  if (!utc) {
    tz = Math.abs(tz);
    var tzHrs = Math.floor(tz / 60);
    var tzMin = tz % 60;
    K += ii(tzHrs) + ":" + ii(tzMin);
  }
  format = format.replace(/(^|[^\\])K/g, "$1" + K);
  var day = (utc ? date.getUTCDay() : date.getDay()) + 1;
  format = format.replace(new RegExp(dddd[0], "g"), dddd[day]);
  format = format.replace(new RegExp(ddd[0], "g"), ddd[day]);
  format = format.replace(new RegExp(MMMM[0], "g"), MMMM[M]);
  format = format.replace(new RegExp(MMM[0], "g"), MMM[M]);
  format = format.replace(/\\(.)/g, "$1");
  return format;
};
module.exports = router