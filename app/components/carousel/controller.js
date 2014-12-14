"use strict";
	
/**
* @ngdoc controller
* @name project.carousel.controller:CarouselController
* @description
* Carousel carousel functionality for next, previous functions. initializes the various carousel slides.
*
* @param {Object} $rootScope root scope
* @param {Object} $scope scope of this element
* @param {Object} $interval interval angular function
* @param {Object} $timeout timeout angular function
*/   
angular.module('project')
     .controller('CarouselController', ['$rootScope', '$scope', '$interval', '$timeout', function($rootScope, $scope, $interval, $timeout) {

     var interval,
          list = [],
          currentSlide,
          nextSlide,
          nextIndex = 0,
          pauseTime = 4500;

     Carousel = {
          /**
          * @ngdoc function
          * @name init
          * @methodOf project.carousel.controller:CarouselController
          * @description
          * initialize the carousel by creating the slides based on the data
          */
          init: function() {
               $scope.currentIndex = 0;
               angular.forEach( $scope.$slides, function(value, key){
                    list.push( new Slide( value, key ) );
               });
               // if ( $scope.$slides.length > 1) {
               //      Carousel.autoplay();
               // }
          },

          /**
          * @ngdoc function
          * @name next
          * @methodOf project.carousel.controller:CarouselController
          * @description
          * go to the next slide.  used by the arrows in the DOM.
          */
          next : function(){
               Carousel.gotoNext ( $scope.currentIndex );
               $scope.currentIndex++;
               if ( $scope.currentIndex === $scope.count ){
                    $scope.currentIndex = 0;
               }
          },

          /**
          * @ngdoc function
          * @name previous
          * @methodOf project.carousel.controller:CarouselController
          * @description
          * go to the previous slide.  used by the arrows in the DOM.
          */
          previous : function(){
               Carousel.gotoPrevious ( $scope.currentIndex );
               $scope.currentIndex--;
               if ( $scope.currentIndex < 0 ){
                    $scope.currentIndex = ($scope.count-1);
               }                             
          },

          /**
          * @ngdoc function
          * @name gotoNext
          * @methodOf project.carousel.controller:CarouselController
          * @description
          * transitions the carousel to a specific index and updates the pagination.  used as a helper by the NEXT function
          *
          * @param {Integer} index the index to transition to
          */
          gotoNext : function( index ) {
               if ( index === ($scope.count-1) ){
                    nextIndex = 0;
               } else {
                    nextIndex = index + 1;
               }
               Carousel.pagination( index );
               $scope.currentSlide = list[ index ];
               $scope.nextSlide = list[ nextIndex ];
               $scope.currentSlide.animateOutNext();
               $scope.nextSlide.animateInNext();
          },

          /**
          * @ngdoc function
          * @name gotoPrevious
          * @methodOf project.carousel.controller:CarouselController
          * @description
          * transitions the carousel to a specific index and updates the pagination.  used as a helper by the PREVIOUS function
          *
          * @param {Integer} index the index to transition to
          */
          gotoPrevious : function( index ) {
               if ( index === 0 ){
                    nextIndex = $scope.count-1;
               } else {
                    nextIndex = index - 1;
               }
               Carousel.pagination( index );
               $scope.currentSlide = list[ index ];
               $scope.nextSlide = list[ nextIndex ];
               $scope.currentSlide.animateOutNext();
               $scope.nextSlide.animateInNext();
          },

          /**
          * @ngdoc function
          * @name autoplay
          * @methodOf project.carousel.controller:CarouselController
          * @description
          * autoplay uses the $interval function to automatically change carousel slides
          */
          autoplay : function(){
               interval = $interval( this.next, pauseTime );
          },
          
          /**
          * @ngdoc function
          * @name stop
          * @methodOf project.carousel.controller:CarouselController
          * @description
          * stops the autoplay
          */
          stop : function(){
               $interval.cancel( interval );
          }
     },

     /**
     * @ngdoc function
     * @name slide
     * @methodOf project.carousel.controller:CarouselController
     * @description
     * slide object to contain information regarding an individual slide in the carousel
     */
     Slide = function( elem, index ){
          this.$elem = $(elem);
          elem.addEventListener( 
               'webkitAnimationStart', 
          function( event ) { 
          }, false );

          var scope = this;
          elem.addEventListener( 'transitionend', function() {
               scope.$elem.removeClass('carouselOutNext').removeClass('carouselInNext');
          });
          elem.addEventListener( 'webkitAnimationEnd', function() {
               scope.$elem.removeClass('carouselOutNext').removeClass('carouselInNext');
          });
          elem.addEventListener( 'otransitionend', function() {
               scope.$elem.removeClass('carouselOutNext').removeClass('carouselInNext');
          });
     };

     Slide.prototype = {

          /**
          * @ngdoc function
          * @name animateInNext
          * @methodOf project.carousel.controller:CarouselController
          * @description
          * individual slide becomes to current slide and animates IN CSS3 transitions
          */
          animateInNext : function() {
               this.$elem.addClass('current').addClass('carouselInNext').removeClass('carouselOutNext');
          },

          /**
          * @ngdoc function
          * @name animateOutNext
          * @methodOf project.carousel.controller:CarouselController
          * @description
          * individual slide is no longer the current slide and animates OUT CSS3 transitions
          */
          animateOutNext : function() {
               this.$elem.removeClass('current').addClass('carouselOutNext').removeClass('carouselInNext');
          },

          /**
          * @ngdoc function
          * @name animateInPrevious
          * @methodOf project.carousel.controller:CarouselController
          * @description
          * NOT BEING USED -the animation is weird, reusing the Next animation instead for previous @see Carousel.gotoPrevious() 
          */
          animateInPrevious : function() {
               this.$elem.addClass('current').addClass('navInPrev');
          },

          /**
          * @ngdoc function
          * @name animateInPrevious
          * @methodOf project.carousel.controller:CarouselController
          * @description
          * NOT BEING USED -the animation is weird, reusing the Next animation instead for previous @see Carousel.gotoPrevious()
          */
          animateOutPrevious : function() {
               this.$elem.removeClass('current').addClass('navOutPrev');
          },

          /**
          * @ngdoc function
          * @name animateEnd
          * @methodOf project.carousel.controller:CarouselController
          * @description
          * after the CSS3 transition is complete, removes the classes associated
          */
          animateEnd : function() {
               this.$elem.removeClass('carouselOutNext').removeClass('carouselInNext').removeClass('navInPrev').removeClass('navOutPrev');
          }

     };

     /**
     * @ngdoc function
     * @name previousButton
     * @methodOf project.carousel.controller:CarouselController
     * @description
     * click handler for the previous button that turns off the autoplay and goes to the previous slide
     */
     $scope.previousButton = function() {
          Carousel.stop();
          Carousel.previous();
     };

     /**
     * @ngdoc function
     * @name nextButton
     * @methodOf project.carousel.controller:CarouselController
     * @description
     * click handler for the previous button that turns off the autoplay and goes to the next slide
     */
     $scope.nextButton = function() {
          Carousel.stop();
          Carousel.next();
     };

     /**
     * @ngdoc function
     * @name loadVideo
     * @methodOf project.carousel.controller:CarouselController
     * @description
     * click handler for the load video button on the video slides
     */
     $scope.loadVideo = function( videoID ) {
          // stop the carousel
          Carousel.stop(); 
          // reveal video modal
          // trigger play of video
          // $timeout( function() {
          //      if ($rootScope.VideoAPI) {
          //           $rootScope.VideoAPI.play();
          //      }
          // }, 2000 );
     };

     // initialize the HERO
     $timeout( Carousel.init, 1000 );

}]);