
SimpleStock.Views.Header = Backbone.View.extend({
	tagName 	: $('#ssheader').attr('data-tag'),
	className 	: $('#ssheader').attr('data-class'),
	template 	: _.template($('#ssheader').html()),
	events : {
		
	},
	render : function(){
		var self = this;
		this.$el.html(this.template());
		return this.$el;
	},
});


