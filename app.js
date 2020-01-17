const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

// The 'static' directory is for client-side content/styling/scripts.
app.use(express.static('static'));
app.use('/css', express.static(__dirname + '/static/css'));
app.use('/images', express.static(__dirname + '/static/images'));
app.use('/js', express.static(__dirname + '/static/js'));
app.use(bodyParser.urlencoded({ extended: false }))

app.set('view engine', 'ejs');

app.listen(3001, () => {
  console.log('listening on port 3001');
});


/**********************************************************************
 * Database functions (TODO: Move to separate file)
 *********************************************************************/



/**********************************************************************
 * Routes
 *********************************************************************/

app.get('/', (req, res) => {
	res.render('index');
});

app.get('/logistics', (req, res) => {
	res.render('logistics');
});

app.get('/rsvp', (req, res) => {
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

app.post('/rsvp', (req, res) => {
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