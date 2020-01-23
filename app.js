const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
// const createError = require('http-errors');
const logger = require('morgan');
// const monk = require('monk');
const app = express();

// The 'static' directory is for client-side content/styling/scripts.
app.use(express.static('static'));
app.use('/css', express.static(path.join(__dirname, 'static/css')));
app.use('/images', express.static(path.join(__dirname, 'static/images')));
app.use('/js', express.static(path.join(__dirname, 'static/js')));

// app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

// View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Make DB accessible to routes
// app.use((req, res, next) => {
//   req.db = db;
//   next();
// });

// Routes
const indexRouter = require('./routes/index');
const rsvpRouter = require('./routes/rsvp');
const logisticsRouter = require('./routes/logistics');

app.use('/', indexRouter);
app.use('/rsvp', rsvpRouter);
app.use('/logistics', logisticsRouter);

// HTTP error handling
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// App server
app.listen(3010, '127.0.0.1', () => {
  console.log('brentandkatie.wedding listening on port 3010');
});


/**********************************************************************
 * Database functions (TODO: Move to separate file)
 *********************************************************************/