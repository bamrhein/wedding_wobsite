const express = require('express');
const router = express.Router();

const validator = require('express-validator');
const { check, validationResult } = require('express-validator');

const { mongoose, RSVPModel } = require('../db');
const logging = require('../logging.js');

// Some helper functions

function getSuccessMsg(fields) {
  if (fields.attending) {
    return "WOOO! We can't wait to see you in Moab!";
  }
  return "Sorry you can't make it. We still love you... :-/";
}

function getErrorMsg(errors) {
  if (errors.isEmpty()) { return ''; }

  var errorMsg = '';
  for (var e of errors.array()) {
    errorMsg += `<li>${e.msg}</li>\n`;
  }
  return errorMsg;
}


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
  check('fullname', "Is that really your name?").isLength({ min: 5, max: 30 }),
  check('phone', "Doesn't quack like a phone number...").isLength({ min: 10, max: 16 }),
  check('email', "That can't be your email address. Do better.").isEmail()
                                                        .isLength({min: 3, max: 50 }),
  check('attending', "Tell us whether you'll be there or not!!").notEmpty()
], async (req, res) => {
  // Laffo if you use caps in your email address.
  req.body.email = req.body.email.toLowerCase();

  // Set 'attending' to a boolean value.
  req.body.attending = req.body.attending == 'yes';

  // Log the RSVP post body
  logging.rsvp.info(JSON.stringify(req.body));

  const errors = validationResult(req);
  let errorMsg = getErrorMsg(errors);
  let successMsg = getSuccessMsg(req.body);

  // Check for an existing document that matches the email address.
  // If found, update the document.
  // If not, create a new document.
  const doc = await RSVPModel.findOne({ email: req.body.email }, (err, doc) => {
    if (err) {
      errorMsg += err;
      return null;
    }

    // If a match was found...
    if (doc) {
      let updated = false;

      // Compare/update the document's values with the form data.
      for (var k in req.body) {
        if (doc[k] != req.body[k]) {
          doc[k] = req.body[k];
          updated = true;
        }
      }

      if (updated) { doc.save(); }

      return doc;
    }

    // If no matching documents were found, return a new one.
    // return new RSVPModel(req.body).save();
    return RSVPModel.create(req.body);
  });

  // NOTE: Re-rendering the page in case the client has JS disabled.
  // Web 1.0, baybee!!!
  res.render('rsvp', {
    successMsg: successMsg,
    successDisplay: successMsg && !errorMsg ? 'block' : 'none',
    errorMsg: errorMsg,
    errorDisplay: errorMsg ? 'block' : 'none',
    fullname: req.body.fullname || '',
    phone: req.body.phone || '',
    email: req.body.email || '',
    attending: req.body.attending ? 'checked' : '',
    notAttending: req.body.attending ? '' : 'checked'
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
  //   attending: req.body.attending == 'yes' ? 'checked' : '',
  //   notAttending: req.body.attending == 'no' ? 'checked' : ''
  // });
});

module.exports = router;