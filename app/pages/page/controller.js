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
	.controller('PageController', ['$scope', '$rootScope', '$location', 'pageService', function($scope, $rootScope, $location, pageService) {

		pageService.getAll( function( data ) {
			$scope.pages = data;
			checkControls( 0 );
		});
			
	}]);
