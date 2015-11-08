var mongoose = require('mongoose');
var router = require('express').Router({ mergeParams: true });
var nconf = require('nconf');
var tesseract = require('lib/util/tesseract');
var fs = require('fs');
var shortid = require('shortid');
var path = require('path');
var Receipt = mongoose.model('Receipt');
var LineItem = mongoose.model('LineItem');
var async = require('async');


console.log(path.resolve(global.rootDir + '/uploads/' + 'loolo' + '.jpg'));

router.route('/')

  .post(function (req, res) {
    console.log(req.body.image);
    var file = new Buffer(req.body.image.toString(), 'base64');;
    var newReceipt = new Receipt({
    });

    var fileName = path.resolve(global.rootDir + '/uploads/' + newReceipt._id + '.jpg');
    fs.writeFile(fileName, file, function (err) {
      if(err) return res.error(500, '2f21b3c8-5dbb-4048-a800-4e23dd1410fa');

      tesseract(fileName)
      .then(function(result) {

        var lines = result.split("\n");
        var subtotal;
        var total;
        var lineItemsToSave = [];
        for (var i = 0; i < lines.length; i++) {
          var l = lines[i];

          if(!l) {
            continue;
          }

          console.log('WHAT THE FUCKKKKK');
          console.log(l);

          var match;

          if(match = /(\D+)*.{0,2}?(\d+)\s{0,2}.\s{0,2}(\d{0,2})$/i.exec(l)) {
            if(!match[1]) continue;
            var newLineItem = new LineItem({
              text: match[1].trim(),
              value: parseFloat(match[2] + '.' + match[3]),
              receipt: newReceipt,
            });
            lineItemsToSave.push(newLineItem);
            newReceipt.lineItems.push(newLineItem);
            continue;
          }

          if(subtotal != null && (match = /total.{0,2}?(\d+)\s{0,2}.\s{0,2}(\d{0,2})$/i.exec(l))) {
            total = parseFloat(match[1] + '.' + match[2]);
            break;
          }

          if(match = /subtotal.{0,2}?(\d+)\s{0,2}.\s{0,2}(\d{0,2})$/i.exec(l)) {
            subtotal = parseFloat(match[1] + '.' + match[2]);
            continue;
          }
        }

        async.each(lineItemsToSave, function (lineItem, cb) {
          lineItem.save(cb);
        }, function (err) {
          console.log(err);
          if(err) return res.error(500, 'e45707a8-47e4-4c88-862e-ab6acfe209f8');
          newReceipt.save(function (err) {
            if(err) return res.error(500, '5783a631-70b9-4f34-b9a1-40b696717450');
            newReceipt.populate('lineItems', function (err, receipt) {
              return res.ok(receipt);
            })
          });
        })


      })
      .catch(function (err) {
        console.log(err);
        return res.error(500, '96dadda8-f5e0-434a-ae44-a1b7a004fa86');
      })

    });


  });


module.exports = router;
