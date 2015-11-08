var mongoose = require('mongoose');
var router = require('express').Router({
  mergeParams: true
});
var nconf = require('nconf');
var tesseract = require('lib/util/tesseract');
var Receipt = mongoose.model('Receipt');
var LineItem = mongoose.model('LineItem');
var sendTwilio = require('lib/util/twilio');

router.route('/')

.post(function (req, res) {
  var receiptId = req.params.id;

  Receipt.findByIdAndUpdate(receiptId, {status: 'resolved'}, {new: true}).populate('lineItems').lean().exec(function (err, receipt) {
    if(err) return res.error(500, '6af13e70-3409-4304-a179-2d7370465cca');
    if(!receipt) return res.error(404, 'd3765e47-68ae-42a5-99d5-2dc1467ce226');

    receipt.lineItems.each(function (l) {
      if(receipt.phoneNumber && l.phoneNumber) {
        sendTwilio(l.phoneNumber, receipt.phoneNumber, [
          'You got some squaring to do. Pay your part at: ',
          'https://masterhack-server1.herokuapp.com/receipt/',
          receipt._id,
          '?owner=',
          l.owner
        ].join(''));
      }
    })

    return res.ok(receipt);
  })
});

module.exports = router;
