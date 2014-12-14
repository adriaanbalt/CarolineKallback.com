
"use strict";
/**
 * @ngdoc directive
 * @name carousel.directive:carousel
 * @restrict C
 * @description
 * Carousel directive to acess the carousel elements
 */
angular.module('project').directive('carousel', [function() {
	return {
		restrict: 'C',
		replace: false,
		controller: "CarouselController",
		link: function(scope, elem, attrs) {
			scope.currentIndex = 0;
			scope.$elem = $(elem);
			scope.$slides = $(elem).find('.list-item');
			scope.count = $(elem).find('.list-item').length;
		}
	}
}]);
