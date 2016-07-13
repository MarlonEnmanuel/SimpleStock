
SimpleStock.Views.Footer = Backbone.View.extend({
	tagName 	: $('#ssfooter').attr('data-tag'),
	className 	: $('#ssfooter').attr('data-class'),
	template 	: _.template($('#ssfooter').html()),
	render : function(){
		var self = this;
		this.$el.html(this.template());
		return this.$el;
	},
});
