"use strict";

/**
 * @ngdoc service
 * @name project.service.carousel:HomeService
 * @description
 * 
 */
angular.module('carolinekallback')
	.factory('HomeService', ['$http', function($http) {

		var config = {
			method: "GET",
			url: "assets/data/data.json"
		};

		console.log ( "HOME SERVICE" );

		var HomeService = {},
			data = [];

		/**
		 * @ngdoc function
		 * @name getAll
		 * @methodOf HomeService
		 * @description
		 * 
		 */
		HomeService.getAll = function( cb ) {
			$http(config).success(function( data ) {
				data = data;
				if ( cb ) {
					cb( data );
				}
				return data;
			});
		};

		/**
		 * @ngdoc function
		 * @name getLength
		 * @methodOf HomeService
		 * @description
		 * get total number of data
		 */
		HomeService.getLength = function() {
			return data.length;
		};

		/**
		 * @ngdoc function
		 * @name getAll
		 * @methodOf HomeService
		 * @description
		 * 
		 */
		HomeService.getProjectByID = function( id ) {
			if ( data ){
				for ( var i = 0; i < data.length; i++ ){
					if ( i === id ) {
						return data[i];
					}
				}
			} else {
				return HomeService.getAll();
			}
		};

		return HomeService;
			
	}]);
