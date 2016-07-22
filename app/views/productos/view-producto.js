
SimpleStock.Views.Producto = Backbone.View.extend({
	tagName 	: $('#view-producto').attr('data-tag'),
	className 	: $('#view-producto').attr('data-class'),
	template 	: _.template($('#view-producto').html()),

	events : {
		'click .editar' : 'editar',
		'click .eliminar' : 'eliminar',
	},

	initialize : function(){
		var self = this;
		self.model.on('sync', function(){
			self.render();
		});
		self.model.on('destroy', function(){
			self.remove();
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
	},

	eliminar : function(event){
		event.preventDefault();
		if(confirm('¿Seguro que desea eliminar el producto?')){
			this.model.destroy({
				wait : true,
				success : function(){
					Materialize.toast('Producto eliminado', 4000);
				},
				error : function(xhr, st){
					Materialize.toast(st.responseText, 5000);
				},
			});
		}
	}
	
});