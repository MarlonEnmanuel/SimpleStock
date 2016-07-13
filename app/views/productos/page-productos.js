
SimpleStock.Views.Productos = Backbone.View.extend({
	tagName 	: $('#page-productos').attr('data-tag'),
	className 	: $('#page-productos').attr('data-class'),
	template 	: _.template($('#page-productos').html()),

	events : {
		'click .crear' : 'crear'
	},

	initialize : function(){
		var self = this;

		app.collections.productos.on('add', function(model){
			var u = new SimpleStock.Views.Producto({
				model : model
			});
			u.render().appendTo(self.$el.find('.container'));
		});

		app.collections.productos.on('error', function(){
			app.views.main.clear();
			app.views.main.renderError();
		});

		app.routers.gestionar.on('route:productos', function(){
			app.views.main.clear();
			app.views.main.add(self);
			app.views.header.setTitle('Productos');
			app.collections.productos.reset();
			app.collections.productos.fetch();
		});

		app.routers.gestionar.on('route:productoNuevo', function(){
			var nuevo = new SimpleStock.Views.EditProducto();
			app.views.main.add(nuevo);
			app.views.header.setTitle('Productos');
			$('select').material_select();
		});

		app.routers.gestionar.on('route:productoEditar', function(){
			var model = app.collections.productoss.productos.get(self.editId);
			if(model){
				var nuevo = new SimpleStock.Views.EditProducto({
					model : model,
				});
				app.views.main.add(nuevo);
				app.views.header.setTitle('Productos');
				$('select').material_select();
			}else{
				Backbone.history.navigate('/gestionar/usuarios');
				Materialize.toast('El producto no existe', 4000);
			}
		});
	},

	render : function(){
		this.$el.html(this.template());
		return this.$el;
	},

	crear : function(event){
		event.preventDefault();
		Backbone.history.navigate('/gestionar/productos/nuevo', {trigger:true});
	},

});