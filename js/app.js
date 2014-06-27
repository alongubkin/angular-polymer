angular.module('angularPolymer', ['ui.router'])
	.config(function ($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('main', {
				url: '/',
				templateUrl: 'templates/main.html',
				controller: 'MainCtrl'
			});
			
		$urlRouterProvider.otherwise('/');
	})
	.controller('MainCtrl', function ($scope) {
		$scope.showAlert = function () {
			console.log("test");
		};
	});