const express = require('express');
const router = express.Router();

const { mongoose, RSVPModel } = require('../db');
const logging = require('../logging.js');


router.get('/', (req, res) => {
  res.render('_attending');
});

router.post('/', async (req, res) => {
  if (req.body.code != config._attending) {
    return [];
  }

  const docs = await RSVPModel.find({}, (err, doc) => {
    if (err) {
      logging.error.error(err.message);
      return [];
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

    // No matching documents were found.
    return [];
  });

  res.render('_attending', { docs: docs });
});

module.exports = router;