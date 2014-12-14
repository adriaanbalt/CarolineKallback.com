"use strict";

/**
 * @ngdoc service
 * @name project.service.pages:pages
 * @description
 * 
 */
angular.module('project')
	.factory('pageService', ['$http', function($http) {

		var config = {
			method: "GET",
			url: "data/data.json"
		};

		var pageService = {},
			pages = [];

		/**
		 * @ngdoc function
		 * @name getAll
		 * @methodOf pageService
		 * @description
		 * 
		 */
		pageService.getAll = function( cb ) {
			$http(config).success(function( data ) {
				pages = data;
				if ( cb ) {
					cb( data );
				}
				return data;
			});
		};

		/**
		 * @ngdoc function
		 * @name getLength
		 * @methodOf pageService
		 * @description
		 * get total number of pages
		 */
		pageService.getLength = function() {
			return pages.length;
		};

		/**
		 * @ngdoc function
		 * @name getAll
		 * @methodOf pageService
		 * @description
		 * 
		 */
		pageService.getPageByID = function( id ) {
			if ( pages ){
				for ( var i = 0; i < pages.length; i++ ){
					if ( i === id ) {
						return pages[i];
					}
				}
			} else {
				return pageService.getAll();
			}
		};

		return pageService;
			
	}]);
