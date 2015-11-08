var mongoose = require('mongoose');
var shortid = require('shortid');
var nconf = require('nconf');
var isLoggedIn = require('lib/middleware/isLoggedIn');
var Simplify = require("simplify-commerce");

client = Simplify.getClient({
  publicKey: nconf.get('SIMPLIFY_COMMERCE_PUBLIC'),
  privateKey: nconf.get('SIMPLIFY_COMMERCE_PRIVATE')
});


function processPayment(token, amount, description, cb){
  //Multiply amount by 100 since 1000 = $10
  var referenceId = shortid.generate();
  return new Promise(function(resolve, reject) {

    client.payment.create({
      amount : amount * 100,
      token : token,
      description : description,
      reference : referenceId,
      currency : "USD"
    }, function(errData, data){
      if(errData){
        return reject(errData);
      }
      if(!data.paymentStatus) {
        return reject();
      }

      return resolve(referenceId);
    });
  });
}

// var token = req.body.token;
// var amount = req.body.amount;

// if(amount < 1){
//   //Minimum requirement is $1
//   return res.error();
// }
// processPayment(token, amount, referenceId, function(err, payment){
//   res.ok("test is ok!", err, payment);
// })

module.exports = processPayment;
