// grab the mongoose module
var mongoose = require('mongoose');

var donorSchema = new mongoose.Schema({
		first_name	   : { type: String },
		last_name 	   : { type: String },
    contact_number : String,
    email          : String,
		blood_group    : String,
    ip_address     : String,
    unique_slug    : String,
    location       : {
      address   : String,
      latitude  : Number,
      longitude : Number
    }
});

// define our Donor model
module.exports = mongoose.model('Donor', donorSchema);
