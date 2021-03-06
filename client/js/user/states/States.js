// modify folders in client/modules directory
// sample directory for this prefix would be client/modules/sample/
var modulePrefix = '/modules/user/';
var viewsPrefix = modulePrefix + 'views/';
var partialsPrefix = modulePrefix + 'partials/';

module.exports = [


  {
    name: 'home',
    state: {
      url: '/',
      views: {
        header: {
          templateUrl: partialsPrefix + 'header.html',
        },
        content: {
          templateUrl: viewsPrefix + 'home.html',
          controller: "HomeCtrl"
        },
      }
    }
  },

  {
    name: 'thanks',
    state: {
      url: '/thanks',
      views: {
        header: {
          templateUrl: partialsPrefix + 'header.html',
        },
        content: {
          templateUrl: viewsPrefix + 'thanks.html',
          controller: "HomeCtrl"
        },
      }
    }
  }

];
