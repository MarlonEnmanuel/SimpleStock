
SimpleStock.Views.Productos = Backbone.View.extend({
	tagName 	: $('#page-productos').attr('data-tag'),
	className 	: $('#page-productos').attr('data-class'),
	template 	: _.template($('#page-productos').html()),

	events : {
		'click .crear' : 'crear'
	},

	initialize : function(){
		var self = this;

		this.editer = new SimpleStock.Views.EditProducto();

		app.views.main.add(this);

		app.routers.gestionar.on('route:productos', function(){
			app.views.main.show(self);
			app.views.header.setTitle('Productos');
			self.loadTable();
		});

		app.routers.gestionar.on('route:productoNuevo', function(){
			self.editer.render();
		});

		app.routers.gestionar.on('route:productoEditar', function(){
			var model = app.collections.productos.get(self.editId);
			if(model){
				self.editer.render(model);
			}else{
				Backbone.history.navigate('/gestionar/productos');
				Materialize.toast('El producto no existe', 4000);
			}
		});
	},

	render : function(){
		this.$el.html(this.template());
		this.$el.append(this.editer.$el);
		return this.$el;
	},

	crear : function(event){
		event.preventDefault();
		Backbone.history.navigate('/gestionar/productos/nuevo', {trigger:true});
	},

	loadTable : function(){
		var self = this;
		self.$el.find('.container').empty();
		app.collections.productos.each(function(model, i){
			var u = new SimpleStock.Views.Producto({
				model : model
			});
			u.render().appendTo(self.$el.find('.container'));
		});
	},

});