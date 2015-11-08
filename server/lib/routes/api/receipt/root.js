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

        if(!result) {

        }
        console.log(result);
        console.log('cc55adcc-b671-46f8-9f5f-d375f1fbd5de');
        return res.json([
          { text: "Test Image 1", value: 2.50 },
          { text: "Test Image 2", value: 12.50 },
          { text: "Test Image 3", value: 20.50 },
        ]);
      })

    });


  });


module.exports = router;
