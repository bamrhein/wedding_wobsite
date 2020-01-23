const express = require('express');
const validator = require('express-validator');
const { check, validationResult } = require('express-validator');

// const config = require('../config.json');
// const db = require('../db');

// const RSVPSchema = db.Schema({
//   fullname: { type: String, minlength: 0, maxlength: 69 },
//   phone: { type: String, minlength: 0, maxlength: 16 },
//   email: {
//     type: String,
//     minlength: 0,
//     maxlength: 69,
//     lowercase: true,
//     trim: true
//   },
//   attending: Boolean
// });

const router = express.Router();

router.get('/', (req, res) => {
    // Include all the variables to make templating simple.
  res.render('rsvp', {
    successMsg: '',
    successDisplay: 'none',
    errorMsg: '',
    errorDisplay: 'none',
    fullname: '',
    phone: '',
    email: '',
    attending: '',
    notAttending: ''
  });
});

router.post('/', [
  check('fullname', 'Please submit a valid name.').isLength({ min: 5, max: 30 }),
  check('phone', 'Please submit a valid phone number.').isLength({ min: 10, max: 16 }),
  check('email', 'Please submit a valid email address.').isEmail()
                                                        .normalizeEmail()
                                                        .isLength({min: 3, max: 50 }),
  check('attending', "Please choose whether or not you'll be attending.").notEmpty()
], (req, res) => {
  let successMsg = '';
  let errorMsg = '';
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    for (var e of errors.array()) {
      errorMsg += `<li>${e.msg}</li>\n`;
    }
  } else {
    if (req.body.attending == 'Yes') {
      successMsg = "WOOO! We can't wait to see you in Moab!";
    } else if (req.body.attending == 'No') {
      successMsg = "Sorry you can't make it. We still love you... :-/";
    }
  }

  // NOTE: Re-rendering the page in case the client has JS disabled.
  // Web 1.0, baybee!!!
  res.render('rsvp', {
    successMsg: successMsg,
    successDisplay: successMsg ? 'block' : 'none',
    errorMsg: errorMsg,
    errorDisplay: errorMsg ? 'block' : 'none',
    fullname: req.body.fullname || '',
    phone: req.body.phone || '',
    email: req.body.email || '',
    attending: req.body.attending == 'Yes' ? 'checked' : '',
    notAttending: req.body.attending == 'No' ? 'checked' : ''
  });


  //// For an AJAX version of the RSVP form in case I decide to make
  //// it behave like a modern web form at some point. Prob won't tho.

  // const errors = validationResult(req);

  // if (!errors.isEmpty()) {
  //   return res.status(422).jsonp(errors.array());
  // }

  // res.send({
  //   successMsg: successMsg,
  //   // successDisplay: 'block',
  //   fullname: req.body.fullname || '',
  //   phone: req.body.phone || '',
  //   email: req.body.email || '',
  //   attending: req.body.attending == 'Yes' ? 'checked' : '',
  //   notAttending: req.body.attending == 'No' ? 'checked' : ''
  // });
});

module.exports = router;