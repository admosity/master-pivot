var mongoose = require('mongoose');
var router = require('express').Router({ mergeParams: true });
var nconf = require('nconf');
var tesseract = require('lib/util/tesseract');
var Receipt = mongoose.model('Receipt');



router.route('/')

  .get(function (req, res) {
    Receipt.findById(req.params.id).populate('lineItems').lean().exec(function (err, receipt) {
      if(err) return res.error(500, '181b62ca-6a75-4b61-af9e-99390399f64f');

      return res.ok(receipt);
    });
  });

module.exports = router;
