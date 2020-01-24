const config = require('./config.json');
const mongoose = require('mongoose');

// TODO: Add detection for dev vs prod environments
mongoose.connect(config.db.uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true
}).catch(err => console.log('Mongoose connection error: ' + err));

// Log connection errors
mongoose.connection.on('error',
  console.error.bind(console, 'MongoDB connection error:'));

const RSVPSchema = mongoose.Schema({
  fullname: { type: String, minlength: 5, maxlength: 30 },
  phone: { type: String, minlength: 10, maxlength: 16 },
  email: {
    type: String,
    minlength: 3,
    maxlength: 50,
    lowercase: true,
    trim: true
  },
  attending: Boolean
});

const RSVPModel = mongoose.model('rsvp', RSVPSchema);

module.exports = { mongoose, RSVPModel };