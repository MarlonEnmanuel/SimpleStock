
SimpleStock.Views.Categorias = Backbone.View.extend({
	tagName 	: $('#page-categorias').attr('data-tag'),
	className 	: $('#page-categorias').attr('data-class'),
	template 	: _.template($('#page-categorias').html()),

	events : {
		'click .crear' : 'crear'
	},

	initialize : function(){
		var self = this;

		app.collections.categorias.on('add', function(model){
			var u = new SimpleStock.Views.Categoria({
				model : model
			});
			u.render().appendTo(self.$el.find('.container'));
		});

		app.collections.categorias.on('error', function(){
			app.views.main.clear();
			app.views.main.renderError();
		});

		app.routers.gestionar.on('route:categorias', function(){
			app.views.main.clear();
			app.views.main.add(self);
			app.views.header.setTitle('Categorías');
			app.collections.categorias.reset();
			app.collections.categorias.fetch();
		});

		app.routers.gestionar.on('route:categoriaNuevo', function(){
			var nuevo = new SimpleStock.Views.EditCategoria();
			app.views.main.add(nuevo);
			app.views.header.setTitle('Categorías');
		});

		app.routers.gestionar.on('route:categoriaEditar', function(){
			var model = app.collections.categorias.get(self.editId);
			if(model){
				var nuevo = new SimpleStock.Views.EditCategoria({
					model : model,
				});
				app.views.main.add(nuevo);
				app.views.header.setTitle('Categorías');
			}else{
				Backbone.history.navigate('/gestionar/usuarios');
				Materialize.toast('La cateogiría no existe', 4000);
			}
		});
	},

	render : function(){
		this.$el.html(this.template());
		return this.$el;
	},

	crear : function(event){
		event.preventDefault();
		Backbone.history.navigate('/gestionar/categorias/nuevo', {trigger:true});
	},

});