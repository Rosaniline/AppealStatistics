var express = require('express');
var router = express.Router();

/* GET appeal data listing. */
router.get('/list', function(req, res) {

    var db = req.db;

    db.collection('appealdata').find().toArray(function (err, items) {
        res.jsonp(items);
    });
});

module.exports = router;
