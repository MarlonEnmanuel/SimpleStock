
SimpleStock.Views.Categoria = Backbone.View.extend({
	tagName 	: $('#view-categoria').attr('data-tag'),
	className 	: $('#view-categoria').attr('data-class'),
	template 	: _.template($('#view-categoria').html()),

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
		var url = '/gestionar/categorias/editar/'+this.model.get('id');
		Backbone.history.navigate(url, {trigger: true});
	}
	
});