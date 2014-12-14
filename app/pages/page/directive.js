"use strict";
/**
 * @ngdoc directive
 * @name pageScreen.directive:pageScreen
 * @restrict C
 * @description
 */
angular.module('project')
	.directive('pageScreen', [function() {
		return {
			restrict: 'ECA',
			replace: false,
			controller: "PageController",
			link: function($scope, elem, attrs) {
				var $carousel = $(elem).find( '.carousel' ),
					$instructions = $(elem).find( '.instructions' ),
					$selection = $(elem).find( '.selection' );
					
					$scope.$carousel = $carousel;

				// wait until angular has created the carousel on the page
				setTimeout(function() {
					$instructions.addClass('hidden');
					$selection.removeClass('hidden');
					$carousel.slick({
						centerMode: true,
						centerPadding: '0px',
						slidesToShow: 1,
						responsive: false,
						arrows: false,
						speed: 600,
						infinite: false
					});
				}, 1500);
			}
		}
	}]);
