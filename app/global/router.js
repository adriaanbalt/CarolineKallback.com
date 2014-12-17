angular.module('carolinekallback', ['ngRoute'])
	.config(function ($compileProvider){
	    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
	})
	.config(function ($routeProvider, $locationProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'js/home/view.html',
				sectionName: "start"
			})
			.when('/:id', {
				templateUrl: 'js/project/view.html',
				sectionName: "titles"
			})
			.when('/error', {
				templateUrl: 'js/error/view.html',
				sectionName: "error"
			})
			.otherwise({redirectTo: '/'});
	});
