
var sendTwilio = require('lib/util/twilio');
var router = require('express').Router({ mergeParams: true });
var nconf = require('nconf');

router.route('/')
  .get(function (req, res) {
    var who = req.query.who;

    if(who == 'Mike') {
      sendTwilio('13477394986', '13476521079', [
        'You got some squaring to do. Pay your part at: ',
        'https://masterhack-server1.herokuapp.com/'
      ].join(''))
      .then(function() {
        console.log('success');
      })
      .catch(function (err) {
        console.log(err);
      })
    } else {

      sendTwilio('2018926887', '13476521079', [
        'You got some squaring to do. Pay your part at: ',
        'https://masterhack-server1.herokuapp.com/'
      ].join(''));
    }
    res.ok();
  })

module.exports = router;
