
SimpleStock.Views.Usuarios = Backbone.View.extend({
	tagName 	: $('#page-usuarios').attr('data-tag'),
	className 	: $('#page-usuarios').attr('data-class'),
	template 	: _.template($('#page-usuarios').html()),

	events : {
		'click .crear' : 'crear'
	},

	initialize : function(){
		var self = this;

		this.editer = new SimpleStock.Views.EditUsuario();

		app.views.main.add(this);

		app.router.on('route:usuarios', function(){
			app.views.main.show(self);
			app.views.header.setTitle('Usuarios');
			self.loadTable();
		});

		app.router.on('route:usuarioNuevo', function(){
			self.editer.render();
		});

		app.router.on('route:usuarioEditar', function(){
			var model = app.collections.usuarios.get(self.editId);
			if(model){
				self.editer.render(model);
			}else{
				Backbone.history.navigate('/gestionar/usuarios');
				Materialize.toast('El usuario no existe', 4000);
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
		Backbone.history.navigate('/gestionar/usuarios/nuevo', {trigger:true});
	},

	loadTable : function(){
		var self = this;
		self.$el.find('.container').empty();
		app.collections.usuarios.each(function(model, i){
			var u = new SimpleStock.Views.Usuario({
				model : model
			});
			u.render().appendTo(self.$el.find('.container'));
		});
	},

});