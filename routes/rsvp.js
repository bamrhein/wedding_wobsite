const express = require('express');
const router = express.Router();
const config = require('../config.json');
const db = require('../db');

const RSVPSchema = db.Schema({
  fullname: { type: String, minlength: 0, maxlength: 69 },
  phone: { type: String, minlength: 0, maxlength: 16 },
  email: {
    type: String,
    minlength: 0,
    maxlength: 69,
    lowercase: true,
    trim: true
  },
  coming: Boolean
});

router.get('/', (req, res) => {
    // Include all the variables to make templating simple.
  res.render('rsvp', {
    message: '',
    display: 'none',
    fullname: '',
    phone: '',
    email: '',
    coming: '',
    notComing: ''
  });
});

router.post('/', (req, res) => {
  // await insertThing(req.body);
  // console.log(req.body);

  let message = '';

  if (req.body.coming == 'Yes') {
    message = "WOOO! We can't wait to see you in Moab!";
  } else if (req.body.coming == 'No') {
    message = "Sorry you can't make it. We still love you... :-/";
  }

  res.render('rsvp', {
    message: message,
    display: 'block',
    fullname: req.body.fullname || '',
    phone: req.body.phone || '',
    email: req.body.email || '',
    coming: req.body.coming == 'Yes' ? 'checked' : '',
    notComing: req.body.coming == 'No' ? 'checked' : ''
  });
});

module.exports = router;