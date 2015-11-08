var module = require("./module");

module
.controller("AppCtrl", [
	"$scope",
	function($scope) {
		console.log("App Controller Start.");
	}
])
.controller("HomeCtrl", [
	"$scope",
	function($scope) {
		console.log("Home Controller Start.");
		$scope.payment = {
			user: {
				fullName: "Mike Fortuna"
			}
		}
	}
])