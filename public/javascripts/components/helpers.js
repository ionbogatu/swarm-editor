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

	}

	return copy;
}

function transformArm(line, startPoint, endPoint){

    var cathete = endPoint.top - startPoint.top;
    var hypotenuse = Math.sqrt(Math.pow(endPoint.top - startPoint.top, 2) + Math.pow(endPoint.left - startPoint.left, 2));

    var sineAlpha = cathete / hypotenuse;
    var alpha = Math.asin(sineAlpha) * 180 / Math.PI;

    console.log(alpha);

    var ratio = hypotenuse / line.width();

    line.css({
        'transform': 'rotate(' + alpha + 'deg) scaleX(' + ratio + ')'
    });
}

function getRotationDegrees(obj) {
    var matrix = obj.css("-webkit-transform") ||
    obj.css("-moz-transform")    ||
    obj.css("-ms-transform")     ||
    obj.css("-o-transform")      ||
    obj.css("transform");
    if(matrix !== 'none') {
        var values = matrix.split('(')[1].split(')')[0].split(',');
        var a = values[0];
        var b = values[1];
        var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
    } else { var angle = 0; }
    return (angle < 0) ? angle + 360 : angle;
}

function getLineWidth(obj) {
    var length = obj.width();
    var matrix = obj.css("-webkit-transform") ||
    obj.css("-moz-transform")    ||
    obj.css("-ms-transform")     ||
    obj.css("-o-transform")      ||
    obj.css("transform");
    if(matrix !== 'none') {
        var values = matrix.split('(')[1].split(')')[0].split(',');
        var a = parseFloat(values[0]);
        if(a === 0){
            length = obj.width();
        }else{
            length = a * obj.width();
        }
    }
    return length;
}