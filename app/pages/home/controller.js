"use strict";


/**
* @ngdoc controller
* @name project.page.controller:PreviewController
* @description
* 
*
* @param {Object} $scope scope of angular app
* @param {Object} $routeParams param
*/	
angular.module('carolinekallback')
	.controller('HomeController', ['$scope', '$rootScope', '$location', 'HomeService', function($scope, $rootScope, $location, HomeService) {
		
		HomeService.getAll( function( data ) {
			$scope.clients = data.clients;
			$scope.projects = data.projects;
			console.log ( '$scope.grid: ', data );
		});

	}]);
