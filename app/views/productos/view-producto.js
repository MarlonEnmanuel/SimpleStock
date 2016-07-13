
SimpleStock.Views.Producto = Backbone.View.extend({
	tagName 	: $('#view-producto').attr('data-tag'),
	className 	: $('#view-producto').attr('data-class'),
	template 	: _.template($('#view-producto').html()),

	events : {
		'click .editar' : 'editar'
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

	editar : function(event){
		event.preventDefault();
		var url = '/gestionar/productos/editar/'+this.model.get('id');
		Backbone.history.navigate(url, {trigger: true});
	}
	
});