var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Appeal Statistics' });
});

/* GET New User page. */
router.get('/newuser', function(req, res) {
    res.render('newuser', { title: 'Add New User' });
});

/* GET Remove User page. */
router.get('/removeuser', function(req, res) {
    res.render('removeuser', { title: 'Remove User' });
});

/* GET Update User page. */
router.get('/updateuser', function(req, res) {
    res.render('updateuser', { title: 'Update User' });
});

/* POST to Add User Service */
router.post('/adduser', function(req, res) {


    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var userName = req.body.username;
    var userEmail = req.body.useremail;

    // Set our collection
    var collection = db.get('usercollection');

    // Submit to the DB
    collection.insert({
        "username" : userName,
        "email" : userEmail
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // If it worked, set the header so the address bar doesn't still say /adduser
            res.location("userlist");
            // And forward to success page
            res.redirect("userlist");
        }
    });
});

/* POST to Update User Service */
router.post('/reviseuser', function(req, res) {


    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var userName = req.body.username;
    var userEmail = req.body.useremail;

    // Set our collection
    var collection = db.get('usercollection');

    // Submit to the DB
    collection.update(
    { "username" : userName },  	// query
    { $set:{"email" : userEmail }},	// partial update
    function (err, doc) {
        if (err) {
            console.log("User removed failed.");
            throw err;
        }
        console.log("User removed successfully");

        res.location("userlist");
	    // And forward to success page
	    res.redirect("userlist");
    });
});

/* POST to Add User Service */
router.post('/deleteuser', function(req, res) {

     // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var userName = req.body.username;
    var userEmail = req.body.useremail;

    // Set our collection
    var collection = db.get('usercollection');

    // Submit to the DB
    collection.remove({
        "username" : userName,
        "email" : userEmail
    }, function (err, result) {
		if (err) {
            console.log("User removed failed.");
            throw err;
        }
        console.log("User removed successfully");

        res.location("userlist");
	    // And forward to success page
	    res.redirect("userlist");

    });

    
});

module.exports = router;
