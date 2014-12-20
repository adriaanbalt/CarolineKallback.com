"use strict";
/**
 * @ngdoc directive
 * @name pageScreen.directive:pageScreen
 * @restrict C
 * @description
 */
angular.module('carolinekallback')
	.directive('carousel', [function() {
		return {
			restrict: 'C',
			replace: true,
			templateUrl: 'components/carousel/view.html',
			controller: "CarouselController",
			link: function($scope, elem, attrs) {
				var $carousel = $(elem);
				$scope.$carousel = $carousel;
				// wait until angular has created the carousel on the page
				setTimeout(function() {
					$scope.$slides = $carousel.find( 'li' );
				}, 500);
			}
		}
	}]);
