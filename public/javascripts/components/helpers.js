function convertComponentToStaged(event, ui){

	if($(ui.draggable[0]).hasClass('component')){ // component added
	    		
		$( '.canvas-wrapper' ).addClass( "ui-state-highlight" );

        // clone element and put it on canvas

        var copy = $(ui.draggable[0]).clone(false);

        copy.removeClass('component').addClass('active-component');
        copy.appendTo('.canvas-wrapper');

        var canvasOffset = $('.canvas-wrapper').offset();
        var canvasLeftOffset = canvasOffset.left;
        var canvasTopOffset = canvasOffset.top;

        var	iconHalfWidth = Math.max(copy.width(), copy.find('.icon-text').width()) / 2,
        	iconCenterX = event.clientX - canvasLeftOffset - iconHalfWidth;
        var iconHalfHeight = copy.find('.icon-text').height() / 2,
        	iconTopMargin = parseFloat(copy.find('.icon-text').css('margin-top')),
        	iconCenterY = event.clientY - canvasTopOffset - iconHalfHeight - iconTopMargin;

        copy.find('.icon-alternative-text').css('opacity', 0);

        copy.css({
        	'left': iconCenterX,
        	'top': iconCenterY
        });

        copy.stagedAbstractComponent();

    	// return element to its initial position

    	$(ui.draggable[0]).removeAttr('style');

	}else{ // component moved
		console.log('moved');
	}

	return copy;
}