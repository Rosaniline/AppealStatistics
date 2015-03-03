var express = require('express');
var router = express.Router();

/* GET appeal data listing. */
router.get('/list', function(req, res) {

    var db = req.db;

    db.collection('appealdata').find().toArray(function (err, items) {
        res.jsonp(items);
    });
});

/* POST to Add Appeal Service */
router.post('/addappeal', function(req, res) {

	console.log(req.body);

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes

    var issueDate = req.body.issueDate.split(' / ');
    var appellant = req.body.appellant;
    var respondent = req.body.respondent;
    var confDate = req.body.confDate.split(' / ');
    var confTime = req.body.confTime;
    var officer = req.body.officer;
    var inCharge = req.body.inCharge;
    var result = req.body.result;

    // Submit to the DB
    db.collection('appealdata').insert({
		'IssueYear': issueDate[0],
		'IssueMonth': issueDate[1],
		'IssueDay': issueDate[2],
		'Appellant': appellant,
		'Respondent': respondent,
		'ConfYear': confDate[0],
		'ConfMonth': confDate[1],
		'ConfDay': confDate[2],
		'ConfTime': confTime,
		'Officer': officer,
		'InCharge': inCharge,
		'Result': result
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {

        	console.log("Appeal added successfully");
            // If it worked, set the header so the address bar doesn't still say /adduser
            res.location("/");
            // And forward to success page
            res.redirect("/");
        }
    });

});

module.exports = router;
