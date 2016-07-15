
SimpleStock.Views.Entrysal = Backbone.View.extend({
	tagName 	: $('#view-entrysal').attr('data-tag'),
	className 	: $('#view-entrysal').attr('data-class'),
	template 	: _.template($('#view-entrysal').html()),

	events : {
		'click .apunte' : 'apunte',
	},

	initialize : function(){
		var self = this;
		self.model.on('sync', function(){
			self.render();
		});
	},

	render : function(){
		this.$el.html(this.template(this.model.toJSON()));
		return this.$el;
	},

	apunte : function(){
		Materialize.toast(this.model.get('apunte'), 5000);
	},
	
});