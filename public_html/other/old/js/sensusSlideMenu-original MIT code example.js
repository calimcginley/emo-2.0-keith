/**
 * main.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2014, Codrops
 * http://www.codrops.com
 */
(function() {

            var bodyEl = document.getElementById('#mapPage'),
                    content = document.querySelector( '.content-wrap' ),
                    openbtn = document.getElementById( 'open-button' ),
                    closebtn = document.getElementById( 'close-button' ),
                    isOpen = false;

	function init() {
		initEvents();
	}

	function initEvents() {
		openbtn.addEventListener( 'click', toggleMenu );
		if( closebtn ) {
			closebtn.addEventListener( 'click', toggleMenu );
		}

		// close the menu element if the target it´s not the menu element or one of its descendants..
		content.addEventListener( 'click', function(ev) {
			var target = ev.target;
			if( isOpen && target !== openbtn ) {
				toggleMenu();
			}
		} );
	}

	function toggleMenu() {
		if( isOpen ) {
			classie.remove( bodyEl, 'show-menu' );
		}
		else {
			classie.add( bodyEl, 'show-menu' );
		}
		isOpen = !isOpen;
	}
        
    init();
        
    // Closes menu and removes button id
        
    $(document).on("pagebeforehide","#mapPage",function(){ 
        toggleMenu();
        $('.mapPage_MenuBtn').removeAttr('id');
    });
          
    $(document).on("pagebeforehide","#profilePage",function(){ 
        toggleMenu();
        $('.profilePage_MenuBtn').removeAttr('id');
    });
    
    // Adds the open-button id attr
    // Adds the class to the content element
    
    $(document).on("pagebeforeshow","#mapPage",function(){ 
        $('.mapPage_MenuBtn').attr('id', 'open-button');
    });
          
    $(document).on("pagebeforeshow","#profilePage",function(){ 
        $('.profilePage_MenuBtn').attr('id', 'open-button');
    });
          
          
          
})();


