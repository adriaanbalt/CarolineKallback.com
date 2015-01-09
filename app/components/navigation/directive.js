"use strict";
/**
 * @ngdoc directive
 * @name pageScreen.directive:pageScreen
 * @restrict C
 * @description
 */
angular.module('carolinekallback')
	.directive('navigation', [function() {
		return {
			restrict: 'C',
			replace: true,
			templateUrl: 'components/navigation/view.html',
			link: function($scope, elem, attrs) {
			}
		}
	}]);
