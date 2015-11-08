var mongoose = require('mongoose');
var router = require('express').Router({ mergeParams: true });
var nconf = require('nconf');
var tesseract = require('lib/util/tesseract');

var LineItem = mongoose.model('LineItem');

var isLoggedIn = require('lib/middleware/isLoggedIn');



router.route('/')

  .get(isLoggedIn, function (req, res) {
    var receiptId = req.params.id;
    var ownerId = req.query.owner;
    LineItem.find({receipt: receipt, owner: ownerId }).lean().exec(function (err, lineItems) {
      if(err) return res.error(500, '80f41937-0245-4ca6-ae79-4ca3e3b3ee5b');
      return res.ok(lineItems);
    });

  });


module.exports = router;
