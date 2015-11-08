var nconf = require('nconf');
var client = require('twilio')(nconf.get('TWILIO_SID'), nconf.get('TWILIO_SECRET'));
function sendTwilio(to, from, body){
  //Send an SMS text message
  return new Promise(function(resolve, reject) {
    client.sendMessage({to: to, from: from, body: body}, function(err, responseData) {
      if (err) {
        return reject(err);
      }
      return resolve(responseData);
    });
  });

}

module.exports = sendTwilio;
