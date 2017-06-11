$.ajax({
	url: '/javascripts/components/components-config.json',
	dataType: "json",
	success: function(data){
		window.swarmesb.componentsConfig = data;
	}
});