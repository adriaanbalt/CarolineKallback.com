"use strict";
	
/**
* @ngdoc controller
* @name project.header.controller:HeaderController
* @description
* Header header functionality for next, previous functions. initializes the various header slides.
*
* @param {Object} $rootScope root scope
* @param {Object} $scope scope of this element
* @param {Object} $timeout timeout angular function
*/   
angular.module('carolinekallback')
     .controller('HeaderController', ['$rootScope', '$scope', '$timeout', function($rootScope, $scope, $timeout) {

     Header = {
          /**
          * @ngdoc function
          * @name init
          * @methodOf project.header.controller:HeaderController
          * @description
          * initialize the header by creating the slides based on the data
          */
          init: function() {
               
          }
     }

     // initialize the HERO
     $timeout( Header.init, 1000 );

}]);