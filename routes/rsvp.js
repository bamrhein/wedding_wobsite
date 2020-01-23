const express = require('express');
const router = express.Router();

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

router.post('/rsvp', (req, res) => {
  const data = req.body;
  let message = '';

  // await insertPerson(data);
  console.log(req.body);

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