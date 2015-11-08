var mongoose = require('mongoose');
var router = require('express').Router({
  mergeParams: true
});
var nconf = require('nconf');
var tesseract = require('lib/util/tesseract');
var Receipt = mongoose.model('Receipt');
var LineItem = mongoose.model('LineItem');


router.route('/')

.get(function(req, res) {
    Receipt.findById(req.params.id).populate('lineItems').lean().exec(function(err, receipt) {
      if (err) return res.error(500, '181b62ca-6a75-4b61-af9e-99390399f64f');

      return res.ok(receipt);
    });
  })
  .put(function(req, res) {
    var receipt = req.body;
    // update line item owners
    Receipt.findById(req.params.id).exec(function(err, receipt) {
      if(err) return res.error(500, '7ddfe7f7-e889-4873-8abf-cefaf8d3d17c');

      async.each(receipt.lineItems, function(lineItem, cb) {
        LineItem.findByIdAndUpdate(lineItem._id, {
          $set: {
            owner: lineItem.owner
          }
        }).lean().exec(cb);
      }, function(err) {
        if (err) {
          return res.error(500, 'ebd2f5c0-75e7-458f-bcfb-8237ad600ea9');
        }
        return res.ok();
      });

    });
  });

module.exports = router;
