angular.module('carolinekallback', ['ngRoute'])
	.config(function ($compileProvider){
	    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
	})
	.config(function ($routeProvider, $locationProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'pages/home/view.html',
				controller: 'HomeController',
				sectionName: 'home'
			})
			// .when('/:id', {
			// 	templateUrl: 'pages/project/view.html',
			// 	sectionName: 'titles'
			// })
			.when('/error', {
				templateUrl: 'pages/error/view.html',
				sectionName: 'error'
			})
			.otherwise({redirectTo: '/'});
		$locationProvider.html5Mode( true );
	});
