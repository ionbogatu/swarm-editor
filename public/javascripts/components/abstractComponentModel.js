$.widget('ns.plugin', {

	// Default options:
	options: {
		param1: "foo",
		param2: "bar",
		param3: "baz"
	},

	_create: function(){
		// Options are already merged and stored in this.options
		// Plugin logic goes here
	}
});

$.widget('custom.progressbar', {

	// Default options

	options: {
		value: 0
	},

	_create: function(){
		var progress = this.options.value + '%';
		this.element.addClass('progressbar').text(progress);
	},

	// Create o public method
	/*value: function( value ){

		// No value passed, act as getter
		if(value === undefined){

			return this.options.value;
		}

		// Value passed, act as setter
		this.options.value = this._constrain(value);
		var progress = this.options.value + '%';
		this.element.text(progress);
	},*/

	_setOption: function(key, value){

		if(key === 'value'){
			value = this._constrain(value);
		}
		this._super(key, value);
	},

	_setOptions: function(options){

		this._super(options);
		this.refresh();
	},

	refresh: function(){

		var progress = this.options.value + '%';
		this.element.text(progress);

		if(this.options.value == 100){
			this._trigger("complete", null, {value: 100});
		}
	},

	// Create a private method
	_constrain: function(value){

		if(value > 100){
			value = 100;
		}

		if(value < 0){
			value = 0;
		}

		return value;
	},

	_destroy: function(){

		this.element.removeClass('progressbar').text('');
	}
});

var bar = $("<div></div>").appendTo('body').progressbar({
	complete: function(event, data){

		alert('Callbacks are great!');
	}
}).bind('progressbarcomplete', function(event, data){

	alert('Events bubble and support many handlers for extreme flexibility.');
	alert('The progressbar value is: ' + data.value);
});
 
// Update the value.
bar.progressbar('option', 'value', 100);

var barCopy = bar.data('custom-progressbar');

barCopy.option('value', 50);

alert(barCopy.options.value);

$.custom.progressbar.prototype.reset = function(){

	this._setOption('value', 0);
};