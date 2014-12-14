angular.module('project', ['ngRoute'])
	.config(function ($compileProvider){
	    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
	})
	.config(function ($routeProvider, $locationProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'js/start/view.html',
				sectionName: "start"
			})
			.when('/start', {
				templateUrl: 'js/start/view.html',
				sectionName: "start"
			})
			.when('/titles', {
				templateUrl: 'js/title/view.html',
				sectionName: "titles"
			})
			.when('/title', {
				templateUrl: 'js/title/view.html',
				sectionName: "titles"
			})
			.when('/record', {
				templateUrl: 'js/record/view.html',
				sectionName: "record"
			})
			.when('/finish', {
				templateUrl: 'js/finish/view.html',
				sectionName: "finish"
			})
			.when('/montage', {
				templateUrl: 'js/montage/view.html',
				sectionName: "montage"
			})
			.when('/preview/:id', {
				templateUrl: 'js/preview/view.html',
				sectionName: "preview"
			})
			.when('/error', {
				templateUrl: 'js/error/view.html',
				sectionName: "error"
			})
			.otherwise({redirectTo: '/'});
	});
