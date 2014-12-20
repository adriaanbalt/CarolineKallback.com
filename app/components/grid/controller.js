"use strict";
	
/**
* @ngdoc controller
* @name project.grid.controller:GridController
* @description
* Grid grid functionality for next, previous functions. initializes the various grid slides.
*
* @param {Object} $rootScope root scope
* @param {Object} $scope scope of this element
* @param {Object} $timeout timeout angular function
*/   
angular.module('carolinekallback')
     .controller('GridController', ['$rootScope', '$scope', '$interval', '$timeout', function($rootScope, $scope, $interval, $timeout) {

     var interval;

     Grid = {
          /**
          * @ngdoc function
          * @name init
          * @methodOf project.grid.controller:GridController
          * @description
          * initialize the grid by creating the slides based on the data
          */
          init: function() {
          },

          /**
          * @ngdoc function
          * @name resize
          * @methodOf project.grid.controller:GridController
          * @description
          * resize the grid containers
          */
          resize: function() {
          }
     };

     // initialize the HERO
     $timeout( Grid.init, 1000 );

}]);