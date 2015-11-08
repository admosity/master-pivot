var mongoose = require('mongoose');
var router = require('express').Router({ mergeParams: true });
var nconf = require('nconf');
var tesseract = require('lib/util/tesseract');
var fs = require('fs');
var shortid = require('shortid');
var path = require('path');
var Receipt = mongoose.model('Receipt');


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
        for (var i = 0; i < lines.length; i++) {
          var l = lines[i];

          if(!l) {
            continue;
          }

          var match;

          if(match = /(\D+)*.*?(\d+)\s*.\s*(\d+)$/i.exec(l)) {
            newReceipt.lineItems.push(new LineItem({
              text: match[1],
              value: parseFloat(match[2] + '.' + match[3]),
              receipt: newReceipt,
            }))
            continue;
          }

          if(subtotal != null && (match = /total.*?(\d+)\s*.\s*(\d+)$/i.exec(l))) {
            total = parseFloat(match[1] + '.' + match[2]);
            break;
          }

          if(match = /subtotal.*?(\d+)\s*.\s*(\d+)$/i.exec(l)) {
            subtotal = parseFloat(match[1] + '.' + match[2]);
            continue;
          }
        }

        newReceipt.save(function (err) {
          if(err) return res.error(500, '5783a631-70b9-4f34-b9a1-40b696717450');
          return res.ok(newReceipt);
        });
      })

    });


  });


module.exports = router;
