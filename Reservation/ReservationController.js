var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');


router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var Reservation = require('./Reservation');


//INSERTS RESERVATION INTO DATABASE
router.post('/setReservationDetails',function (req, res) {
	console.log("i am reching here"+JSON.stringify(req.body));
    Reservation.create({
            email: req.body.email,
			phone: req.body.phone,
			noofguests: req.body.noofguests,
			reservationtime: req.body.reservationtime,
			comments: req.body.comments,
			
        }, 
        function (err) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send({"msg":"Successfully inserted"});
        });
});

// RETURNS ALL THE RESERVATION IN THE DATABASE
router.get('/findAllReservations',function (req, res) {
	  Reservation.find({},function (err,Reservation) {
        if (err) return res.status(500).send("There was a problem finding the reservation.");
        res.status(200).send(Reservation);
    }).sort('-date').exec(function(err, docs) { 
		console.log("error");
	});
});



// DELETES A RESERVATION FROM THE DATABASE
router.get('/deleteReservation/:phone', function (req, res) {
	
    Reservation.findOneAndRemove(req.params.phone, function (err, Reservation) {
        if (err) return res.status(500).send("There was a problem deleting the book.");
        res.status(200).send("Reservation with : "+ Reservation.phone +" was deleted.");
    });
});

// UPDATES A SINGLE Reservation IN THE DATABASE
router.put('/updateReservation/:mobile',  function (req, res) {
	console.log("i am called"+req.params.mobile+"body"+JSON.stringify(req.body));
    Reservation.findOneAndUpdate(req.params.mobile, req.body, {new: true}, function (err, Reservation) {
        if (err) return res.status(500).send("There was a problem updating the book.");
        res.status(200).send(Reservation);
    });
});


module.exports = router;