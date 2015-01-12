"use strict";
/**
 * @ngdoc directive
 * @name pageScreen.directive:pageScreen
 * @restrict C
 * @description
 */
angular.module('carolinekallback')
	.directive('grid', [function() {
		return {
			restrict: 'C',
			replace: false,
			controller: "GridController",
			link: function($scope, elem, attrs) {
				var $grid = $(elem);
				$scope.$grid = $grid;
				// wait until angular has created the grid on the page
			}
		}
	}]);
