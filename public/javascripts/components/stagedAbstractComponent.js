jQuery.widget('swarmesb.stagedAbstractComponent', {

	options: {
		id: Object.keys(window.swarmesb.componentLinks).length
	},

	_create: function(options){

		var _self = this;

		this.options = $.extend({}, this.options, options);
		this.element.addClass('swarmesb-staged-component');

		if(this.element.hasClass('entry-component')){

			// logic for entry component

			var rightArm = '<div class="right-arm"></div>' +
				'<div class="drop-space"></div>';

			this.element.html('Entry<br/>Point' + rightArm);

			return; // halt execution for entry component
		}

		this.element.draggable({
			containment: ".canvas-wrapper",
			scroll: true,
			handle: ".visual-handlers-wrapper",
			drag: function(event, ui){

				var componentId = parseInt(ui.helper.data('component-id')),
					property;

				for(property in window.swarmesb.componentLinks){

					if(window.swarmesb.componentLinks[property].componentId === componentId){

						var line = window.swarmesb.componentLinks[property].line;
						var startPoint = line.offset();
						var rotationDegrees = getRotationDegrees(line) % 360;

						if(rotationDegrees > 180){
							startPoint.top = startPoint.top + Math.abs(Math.sin(rotationDegrees * Math.PI / 180) * getLineWidth(line));
						}

				    	var endPoint = ui.helper.find('.arms-container').offset();

						transformArm(line, startPoint, endPoint);
					}
				}

				var outgoingLine = window.swarmesb.componentLinks[componentId].line;

				var startPoint = ui.helper.find('.arms-container').offset();

				var endPoint = $('.active-component[data-component-id="' + window.swarmesb.componentLinks[componentId].componentId + '"]').find('.arms-container').offset();

				transformArm(outgoingLine, startPoint, endPoint);
			}
		});

		// add visual handlers

		var handlersHtml = '<div class="visual-handlers-wrapper">' +
			'<div class="visual-close-handler">x</div>' +
		'</div>' +
		'<div class="arms-container">' +
			'<div class="left-arm"></div>' +
			'<div class="right-arm"></div>' +
			'<div class="drop-space"></div>' +
		'</div>';

		$(handlersHtml).insertAfter(this.element.find('.icon'));

		// adjust arms-container to the center of the icon

		var iconCenter = this.element.width() / 2 - 20;
		this.element.find('.arms-container').css({'left': iconCenter + 'px'});

		// event handlers

		this._on(this.element.find('.icon-text'), {
			mouseenter: "showVisualHandlers"
		});

		this._on(this.element, {
			mouseleave: "hideVisualHandlers"
		});

		$(this.element).find('.visual-close-handler').on('click', function(e, ui){
			$(this).parent().parent().remove();
		});
	},

	showVisualHandlers: function(e){

		var component = $(e.currentTarget).parent().parent();
		component.find('.icon-alternative-text').css({'opacity': '0.3'});
		component.find('.visual-handlers-wrapper').css({'z-index': '200'}).animate({
			'width': '110px',
			'height': '110px',
			'top': '-6px'
		}, 100);
		component.find('.visual-handlers-wrapper').hover(function(){

		}, function(){

		});
	},

	hideVisualHandlers: function(e){

		var component = $(e.currentTarget);
		component.find('.icon-alternative-text').css({'opacity': '0'});
		component.find('.visual-handlers-wrapper').css({'z-index': '1'}).animate({
			'width': '0',
			'height': '0',
			'top': '30px'
		}, 100);
	}
});