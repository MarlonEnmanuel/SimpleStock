
SimpleStock.Views.Usuarios = Backbone.View.extend({
	tagName 	: $('#page-usuarios').attr('data-tag'),
	className 	: $('#page-usuarios').attr('data-class'),
	template 	: _.template($('#page-usuarios').html()),

	events : {
		'click .crear' : 'crear'
	},

	initialize : function(){
		var self = this;

		app.collections.usuarios.on('add', function(model){
			var u = new SimpleStock.Views.Usuario({
				model : model
			});
			u.render().appendTo(self.$el.find('.container'));
		});

		app.collections.usuarios.on('error', function(){
			app.views.main.clear();
			app.views.main.renderError();
		});

		app.routers.gestionar.on('route:usuarios', function(){
			app.views.main.clear();
			app.views.main.add(self);
			app.views.header.setTitle('Usuarios');
			app.collections.usuarios.reset();
			app.collections.usuarios.fetch();
		});

		app.routers.gestionar.on('route:usuarioNuevo', function(){
			var nuevo = new SimpleStock.Views.EditUsuario();
			app.views.main.add(nuevo);
			app.views.header.setTitle('Usuarios');
		});

		app.routers.gestionar.on('route:usuarioEditar', function(){
			var model = app.collections.usuarios.get(self.editId);
			if(model){
				var nuevo = new SimpleStock.Views.EditUsuario({
					model : model,
				});
				app.views.main.add(nuevo);
				app.views.header.setTitle('Usuarios');
			}else{
				Backbone.history.navigate('/gestionar/usuarios');
				Materialize.toast('El usuario no existe', 4000);
			}
		});
	},

	render : function(){
		this.$el.html(this.template());
		return this.$el;
	},

	crear : function(event){
		event.preventDefault();
		Backbone.history.navigate('/gestionar/usuarios/nuevo', {trigger:true});
	},

});