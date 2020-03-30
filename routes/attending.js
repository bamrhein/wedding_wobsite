const express = require('express');
const router = express.Router();

const config = require('../config.json');
const { mongoose, RSVPModel } = require('../db');
const logging = require('../logging.js');


router.get('/', (req, res) => {
  res.render('_attending', { title: '.:* attending *:.', friends: [] });
});

router.post('/', async (req, res) => {
  if (req.body.code != config._attending) {
    res.render('_attending', { title: '.:* attending *:.', friends: [] });
    // Return early to avoid doing a db query.
    return;
  }

  const friends = await RSVPModel.find({}, (err, docs) => {
    if (err) {
      logging.error.error(err.message);
      return [];
    }
    return docs;
  });

  res.render('_attending', { friends: friends });
});

module.exports = router;