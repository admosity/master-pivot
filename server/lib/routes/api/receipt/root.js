var mongoose = require('mongoose');
var router = require('express').Router({ mergeParams: true });
var nconf = require('nconf');
var tesseract = require('lib/util/tesseract');
var fs = require('fs');
var shortid = require('shortid');
var path = require('path');

console.log(path.resolve(global.rootDir + '/uploads/' + 'loolo' + '.jpg'));

router.route('/')

  .post(function (req, res) {

    var file = new Buffer(req.body.image, 'base64');;
    var newReceipt = new Receipt({

    });
    var fileName = path.resolve(global.rootDir + '/uploads/' + newReceipt._id + '.jpg');
    fs.writeFile(fileName, file, function (err) {
      if(err) return res.error(500, '2f21b3c8-5dbb-4048-a800-4e23dd1410fa');

      tesseract(fileName)
      .then(function(result) {

        console.log(arguments);
        console.log('cc55adcc-b671-46f8-9f5f-d375f1fbd5de');
        return res.ok();
      })

    });


  });


module.exports = router;
