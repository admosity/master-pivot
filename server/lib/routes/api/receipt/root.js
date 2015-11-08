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

      // setTimeout(function() {
      //   res.ok({
      //     _id: "563f6a29061eb70e00db286e",
      //     lineItems: [
      //       {
      //         "_id": "563f6a34061eb70e00db286f",
      //         "text": "SAUCE JALAPENO PEPPER HOT",
      //         "value": 4.58,
      //         "receipt": "563f6a29061eb70e00db286e",
      //         "paid": false
      //       },
      //       {
      //         "_id": "563f6a34061eb70e00db2870",
      //         "text": "SAUCE JALAPENO PEPPER HOT",
      //         "value": 2.29,
      //         "receipt": "563f6a29061eb70e00db286e",
      //         "paid": false
      //       },
      //       {
      //         "_id": "563f6a34061eb70e00db2871",
      //         "text": "SAUCE HABANERO",
      //         "value": 2.99,
      //         "receipt": "563f6a29061eb70e00db286e",
      //         "paid": false
      //       },
      //       {
      //         "_id": "563f6a34061eb70e00db2872",
      //         "text": "BEANS REFRIED BLACK BEANS",
      //         "value": 0.99,
      //         "receipt": "563f6a29061eb70e00db286e",
      //         "paid": false
      //       },
      //       {
      //         "_id": "563f6a34061eb70e00db2873",
      //         "text": "BEANS REFRIED BLACK BEANS",
      //         "value": 0.99,
      //         "receipt": "563f6a29061eb70e00db286e",
      //         "paid": false
      //       },
      //       {
      //         "_id": "563f6a34061eb70e00db2874",
      //         "text": "BEANS REFRIED BLACK BEANS",
      //         "value": 0.99,
      //         "receipt": "563f6a29061eb70e00db286e",
      //         "paid": false
      //       },
      //       {
      //         "_id": "563f6a34061eb70e00db2875",
      //         "text": "BEANS REFRIED BLACK BEANS",
      //         "value": 0.99,
      //         "receipt": "563f6a29061eb70e00db286e",
      //         "paid": false
      //       },
      //       {
      //         "_id": "563f6a34061eb70e00db2876",
      //         "text": "BEANS REFRIED BLACK BEANS",
      //         "value": 0.99,
      //         "receipt": "563f6a29061eb70e00db286e",
      //         "paid": false
      //       },
      //       {
      //         "_id": "563f6a34061eb70e00db2877",
      //         "text": "PEPPERMINT HERBAL TEA-BOX",
      //         "value": 1.79,
      //         "receipt": "563f6a29061eb70e00db286e",
      //         "paid": false
      //       },
      //       {
      //         "_id": "563f6a34061eb70e00db2878",
      //         "text": "ORGANIC CHAMOMILE TEA",
      //         "value": 2.99,
      //         "receipt": "563f6a29061eb70e00db286e",
      //         "paid": false
      //       },
      //       {
      //         "_id": "563f6a34061eb70e00db2879",
      //         "text": "TEA ORGANIC GINGER PEAR",
      //         "value": 2.99,
      //         "receipt": "563f6a29061eb70e00db286e",
      //         "paid": false
      //       }
      //     ]
      //   });


      // },2500)

      // return;
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
          console.log('ed3e37ac-f8c3-4a81-bf0c-ce6c7cc19b6f');
          if(match = /(\d+)\s{0,2}?.\s{0,2}?(\d{0,2})$/i.exec(l)) {
            var newLineItem = new LineItem({
              value: parseFloat(match[1] + '.' + match[2]),
              receipt: newReceipt,
            });
            match = /(\D+)*/i.exec(l);
            if(!match[1]) continue;
            newLineItem.text = match[1].trim();
            lineItemsToSave.push(newLineItem);
            newReceipt.lineItems.push(newLineItem);
            continue;
          }

          console.log('0f78db60-eb56-41fc-94a5-1738dea12e13');
          if(subtotal != null && (match = /^total.{0,2}?(\d+)\s{0,2}.\s{0,2}(\d{0,2})$/i.exec(l))) {
            total = parseFloat(match[1] + '.' + match[2]);
            break;
          }

          console.log('8e147a53-2e7b-4c03-af1a-a2aecc0282ab');
          if(match = /^subtotal.{0,2}?(\d+)\s{0,2}.\s{0,2}(\d{0,2})$/i.exec(l)) {
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
              // return res.ok(receipt);
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
