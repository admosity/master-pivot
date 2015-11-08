var mongoose = require('mongoose');
var router = require('express').Router({ mergeParams: true });
var nconf = require('nconf');
var tesseract = require('lib/util/tesseract');

console.log(nconf.get('upload'));
router.route('/')

  .post(global.fuckyou.single('image'), function (req, res) {

    var file = req.file;
    var fileName = file.path;

    tesseract(fileName)
    .then(function() {
      console.log(arguments);
      console.log('cc55adcc-b671-46f8-9f5f-d375f1fbd5de');
      return res.ok();
    })

  });


module.exports = router;
