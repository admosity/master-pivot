var mongoose = require('mongoose');
var router = require('express').Router({ mergeParams: true });
var nconf = require('nconf');
var tesseract = require('lib/util/tesseract');

var LineItem = mongoose.model('LineItem');




router.route('/')

  .get(function (req, res) {

    var receipt = req.query.receipt;
    LineItem.find({receipt: receipt}).lean().exec(function (err, lineItems) {
      if(err) return res.error(500, '80f41937-0245-4ca6-ae79-4ca3e3b3ee5b');
      return res.ok(lineItems);
    });

  });


module.exports = router;