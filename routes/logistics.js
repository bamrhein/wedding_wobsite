const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('logistics', { title: '.:* logistics *:.' });
});

module.exports = router;