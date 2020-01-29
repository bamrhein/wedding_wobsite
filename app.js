const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
// const createError = require('http-errors');
const rfs = require('rotating-file-stream');

const app = express();


// The 'static' directory is for client-side content/styling/scripts.
app.use(express.static('static'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());


// View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// Routes
const indexRouter = require('./routes/index');
const rsvpRouter = require('./routes/rsvp');
const logisticsRouter = require('./routes/logistics');
const attendingRouter = require('./routes/attending');

app.use('/', indexRouter);
app.use('/rsvp', rsvpRouter);
app.use('/logistics', logisticsRouter);
app.use('/_attending', attendingRouter);


// HTTP error handling
// app.use(function(req, res, next) {
//   next(createError(404));
// });


// App server
app.listen(3010, '127.0.0.1', () => {
  console.log('brentandkatie.wedding listening on port 3010');
});


module.exports = app;