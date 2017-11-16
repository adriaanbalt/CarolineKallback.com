(function($) {
   
    $.slideshow = function( e, data ) {
        
        var root = this;
        root.settings = {
            autoplay: false,
            delay: 5000 // until the nxt image autoplay
        }
        container = root.e = e;
        root.index = 0;
        
        // private
        var init = function() {
            console.log( e );
            root.index = 0;
            

            container.find('.next').click( function() {
               gotoNext(); 
            });
            container.find('.previous').click( function() {
               gotoNext(); 
            });
            console.log ( container );

            root.len = container.find('.image').length;
            for ( var i=0; i < root.len; i++ ) {
                container.find('.image:eq(' + i + ')').load( function() {
                   $(this).show(); 
                });
                container.find('.image:eq(' + i + ')').click( function() {
                    gotoNext(); 
                });
                if ( i != 0 ) {
                    container.find('.image:eq(' + i + ')').hide();
                }
            }

            start();

        }

        var start = function() {
            root.setItem(0);
        }

        var animationComplete = function() {
            if (autoplay) {
                  container.delay( root.settings.delay ).queue( function() { 
                      gotoNext();
                      $(this).dequeue(); 
                  });
            }
        }

        var gotoNext = function() {
            container.find( '.image:eq(' + root.index + ')' ).hide();
            root.setItem ( root.index+1 );
        }
        var gotoPrev = function() {
            container.find( '.image:eq(' + root.index + ')' ).hide();
            root.setItem ( root.index-1 );
        }

        // public to go to the next item if you wanted to call it from something else like a button
        root.setItem = function(index) {

            if (index > root.len - 1) {
                index = 0;
            }

            if ( index < 0 ) {
                index = root.len - 1;
            }

            root.index = index;
            
            container.find( '.image:eq(' + index + ')' ).show();
            console.log ( index );
        }

        init();
    }
})(jQuery);


$(document).ready(function() {
    if ( $('.imageviewer').length > 0) var slideshow = new $.slideshow(  $('.imageviewer') );
});