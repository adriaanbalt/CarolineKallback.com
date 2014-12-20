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
			replace: true,
			templateUrl: 'components/grid/view.html',
			controller: "CarouselController",
			link: function($scope, elem, attrs) {
				var $grid = $(elem);
				$scope.$grid = $grid;
				// wait until angular has created the grid on the page
				setTimeout(function() {
					$scope.$slides = $grid.find( 'li' );
				}, 500);
			}
		}
	}]);
