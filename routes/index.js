const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', { title: '~ B & K ~' });
});

module.exports = router;