jQuery(document).ready(function($){

	function updateSidebar(){

		var sidebar = $('.sidebar');
		var sidebarWrapper = $('.sidebar-wrapper');
		var scrollBarContainer = $('.scroll-bar-container');

		if(sidebar.height() <= sidebarWrapper.height()){
			scrollBarContainer.hide();
			scrollBarContainer.find('.scroll-bar').css({'top': '0'});
			sidebar.animate({'width': '100%', 'top': '0'}, 200);
		}else{
			var scrollBarHeight = sidebarWrapper.height() / sidebar.height();

			var scrollBar = scrollBarContainer.find('.scroll-bar')

			scrollBar.css('height', (scrollBarHeight * scrollBarContainer.height()) + 'px');

			if(scrollBar.position().top + scrollBar.height() > scrollBarContainer.height()){
				scrollBar.css('top', (scrollBarContainer.height() - scrollBar.height()) + 'px');
				console.log(parseInt(scrollBar.css('top')));
				sidebar.animate({'top': -((parseInt(scrollBar.css('top')) * sidebar.height()) / sidebarWrapper.height()) + 'px'}, 650);
			}

			sidebar.animate({'width': '96%'}, 200, function(){
				scrollBarContainer.show();
			});
		}
	}

	function updateSidebarPosition(ui){

		var sidebar = $('.sidebar');
		var sidebarWrapper = $('.sidebar-wrapper');
		var scrollBarContainer = $('.scroll-bar-container');
		var delta = ((ui.offset.top - scrollBarContainer.offset().top) / scrollBarContainer.height()) * sidebar.height();
		
		sidebar.css('top', (-delta) + 'px');
	}

	var sidebar = $('.sidebar');
	sidebar.accordion({
		heightStyle: "content",
		collapsible: true,
		activate: function(){

			updateSidebar();
		}
	});

	var searchFormBg = $('#search-form-bg');

	$('.button-mask').hover(function(){
		searchFormBg.attr('src', '/images/search-form-bg-hover.png');
	}, function(){
		searchFormBg.attr('src', '/images/search-form-bg.png');
	});

	updateSidebar();

	var scrollBar = $('.scroll-bar');

	scrollBar.draggable({
		containment: '.scroll-bar-container',
		drag: function(event, ui){
			updateSidebarPosition(ui);
		}
	});

	if(window.swarmesb.componentsConfig === undefined){
		$.ajax({
			url: '/javascripts/components/components-config.json',
			dataType: "json",
			success: function(data){

				window.swarmesb.componentsConfig = data;

				var components = $('.component');

				components.each(function(index, elem){

					var componentType = $(elem).data('component');

					if(data[componentType] !== undefined){
						$(elem).abstractComponent(data[componentType]);
					}else{
						$(elem).abstractComponent();
					}
				});

				// initialize entry point

				$('.entry-component').stagedAbstractComponent();
			}
		});
	}else{
		var components = $('.component');

		var componentsConfig = window.swarmesb.componentsConfig;

		components.each(function(index, elem){

			var componentType = $(elem).data('component');

			if(componentsConfig[componentType] !== undefined){
				$(elem).abstractComponent(componentsConfig[componentType]);
			}else{
				$(elem).abstractComponent();
			}
		});

		// initialize entry point

		$('.entry-component').stagedAbstractComponent();
	}

	$( ".canvas-wrapper" ).droppable({
    	classes: {
	    	"ui-droppable-active": "ui-state-active",
	        "ui-droppable-hover": "ui-state-hover"
	    },
	    drop: function( event, ui ) {

	    	convertComponentToStaged(event, ui);
      	}
    });
});