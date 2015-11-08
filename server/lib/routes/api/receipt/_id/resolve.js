var mongoose = require('mongoose');
var router = require('express').Router({
  mergeParams: true
});
var nconf = require('nconf');
var tesseract = require('lib/util/tesseract');
var Receipt = mongoose.model('Receipt');
var LineItem = mongoose.model('LineItem');


router.route('/')

.post(function (req, res) {
  var receiptId = req.params.id;

  Receipt.findByIdAndUpdate(receiptId, {status: 'resolved'}, {new: true}).lean().exec(function (err, receipt) {
    if(err) return res.error(500, '6af13e70-3409-4304-a179-2d7370465cca');
    if(!receipt) return res.error(404, 'd3765e47-68ae-42a5-99d5-2dc1467ce226');

    // TODO: contact twilios
    
    return res.ok(receipt);
  })
});

module.exports = router;
