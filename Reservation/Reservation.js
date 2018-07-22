var mongoose = require('mongoose');  
var ReservationSchema = new mongoose.Schema({  
  
    email: String,
    phone: String,
    noofguests: String,
    reservationtime: String,
	comments: String
});
mongoose.model('Reservation', ReservationSchema);

module.exports = mongoose.model('Reservation');