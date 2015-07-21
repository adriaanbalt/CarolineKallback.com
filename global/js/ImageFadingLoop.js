/**
 * @fileOverview TheBarbarianGroup - TheBarbarianGroup 2015
 * @author <a href="mailto:ascholvinck@barbariangroup.com">Adriaan Scholvinck</a>
 * @version 1.0
 */

// declare TheBarbarianGroup in case it has not been declared yet
window.TheBarbarianGroup = window.TheBarbarianGroup || {};

/**
 * @name TheBarbarianGroup.ImageFadingLoop
 * @namespace The public namespace and api for the TheBarbarianGroup ImageFadingLoop functionality.
 * @description The public namespace and api for the TheBarbarianGroup ImageFadingLoop functionality.   used on the landing page to create a ImageFadingLoop tool between Samsung GTheBarbarianGroup and GTheBarbarianGroup edge with other devices like an iPhone 5
 * @requires TheBarbarianGroup
 */
TheBarbarianGroup.ImageFadingLoop = (function(TheBarbarianGroup, window, undefined){
	
	var config = {
		initialized: false
	}, 
	$container,
	$images,
	tempo = 3000,
	index = 0,
	len,

	/**
	 * @name TheBarbarianGroup.ImageFadingLoop-_initialize
	 * @exports TheBarbarianGroup.ImageFadingLoop-_initialize as TheBarbarianGroup.ImageFadingLoop.initialize
	 * @function
	 * @description connects the drop down buttons to the correct specs list
	 */
	_initialize = function( $target ) {
	console.log('ImageFadingLoop initialize', $target );
		$container = $target;
		$images = $container.find('img');
		len = $images.length;
		setInterval( iterate, tempo );
	},

	iterate = function(){
		if ( index >= len ) index = 0;
		$($images[index]).fadeOut();
		index++;
		$($images[index]).fadeIn();
	};

	// public methods for this class
	return {
		initialize: _initialize,
	};

}(TheBarbarianGroup, window, undefined));