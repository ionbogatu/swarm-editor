window.swarmesb.abstractComponentsCounter = 1;

jQuery.widget('swarmesb.abstractComponent', {

	options: {
		componentText: 'ABA',
		componentAlternativeText: 'Abstract Adapter'
	},

	_create: function(options){

		var _self = this;

		this.options = $.extend({}, this.options, options)

		var innerHtml = '<div class="icon">' +
							'<div class="icon-text">' + this.options.componentText + '</div>' +
						'</div>' +
						'<div class="icon-alternative-text">' +
							this.options.componentAlternativeText
						'</div>';

		this.element.html(innerHtml);

		var marginTop = 0;
		var compatibleNodesSelector = '';

		this.element.draggable({
			revert: "invalid",
			start: function(e) {

				marginTop = parseFloat($(this).css('margin-top'));
				$(this).addClass('component-draggable-active');

				// get all nodes the current node can link with

				var compatibleNodes = window.swarmesb.componentsConfig[$(this).data('component')].compatibleNodes;

				compatibleNodes.forEach(function(item, idx){
					compatibleNodesSelector += '[data-component="' + item + '"], ';
				});

				compatibleNodesSelector = compatibleNodesSelector.substring(0, compatibleNodesSelector.length - 2);

				$(compatibleNodesSelector).find('.drop-space').show().droppable({
					tolerance: 'pointer',
					greedy: 'true',
					classes: {
				    	"ui-droppable-active": "ui-state-active",
				        "ui-droppable-hover": "ui-state-hover"
				    },
				    drop: function( event, ui ) {

				    	var component = convertComponentToStaged(event, ui);

				    	// remove left arm
				    	component.find('.left-arm').hide();

				    	var line = $(this).siblings(".right-arm");
				    	var startPoint = line.offset();

				    	var endPoint = component.find('.arms-container').offset();

				    	transformArm(line, startPoint, {'top': event.clientY, 'left': event.clientX});

				    	id = parseInt(Object.keys(window.swarmesb.componentLinks)[Object.keys(window.swarmesb.componentLinks).length - 1]) + 1;

				    	// workaround for not overriding second attribute of the window.swarmesb.componentLinks
				    	if(!$.isEmptyObject(window.swarmesb.componentLinks[Object.keys(window.swarmesb.componentLinks).length - 1])){
				    		id++;
				    	}

				    	component.attr('data-component-id', id);

				    	var parentId = $(this).closest('.active-component').data('component-id');

				    	window.swarmesb.componentLinks[parentId] = {'componentId': id, 'line': line};
				    }
				});
			},
			drag: function(e, ui) {
				var icon = $(e.target).find('.icon-text'),
					iconCenterTop = marginTop + parseFloat($(this).innerHeight() / 2) + icon.height() / 2,
				iconCenterLeft = parseFloat(icon.css('margin-left')) + icon.width() / 2;

				ui.position = {top: e.clientY - iconCenterTop, left: e.clientX - iconCenterLeft};
			},
			stop: function(e, ui) {

				$(compatibleNodesSelector).find('.drop-space').hide();

				$(this).removeClass('component-draggable-active');
			}
		});
	},

	/*transformArm: function(line, startPoint, endPoint){

		var cathete = endPoint.top - startPoint.top;
		var hypotenuse = Math.sqrt(Math.pow(endPoint.top - startPoint.top, 2) + Math.pow(endPoint.left - startPoint.left, 2))

		var sineAlpha = cathete / hypotenuse;
		var alpha = Math.asin(sineAlpha) * 180 / Math.PI;

		line.css({
			'width': hypotenuse
		});

		line.css({
			'transform': 'rotate(' + alpha + 'deg)'
		});

		cathete = sineAlpha * hypotenuse;

		line.css({'top': parseFloat(line.css('top')) + cathete / 2});
	}*/
});