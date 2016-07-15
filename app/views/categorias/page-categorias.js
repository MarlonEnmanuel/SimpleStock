
SimpleStock.Views.Categorias = Backbone.View.extend({
	tagName 	: $('#page-categorias').attr('data-tag'),
	className 	: $('#page-categorias').attr('data-class'),
	template 	: _.template($('#page-categorias').html()),

	events : {
		'click .crear' : 'crear'
	},

	initialize : function(){
		var self = this;

		this.editer = new SimpleStock.Views.EditCategoria();

		app.views.main.add(this);

		app.routers.gestionar.on('route:categorias', function(){
			app.views.main.show(self);
			app.views.header.setTitle('Categorias');
			self.loadTable();
		});

		app.routers.gestionar.on('route:categoriaNuevo', function(){
			self.editer.render();
		});

		app.routers.gestionar.on('route:categoriaEditar', function(){
			var model = app.collections.categorias.get(self.editId);
			if(model){
				self.editer.render(model);
			}else{
				Backbone.history.navigate('/gestionar/categorias');
				Materialize.toast('La categoría no existe', 4000);
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
		Backbone.history.navigate('/gestionar/categorias/nuevo', {trigger:true});
	},

	loadTable : function(){
		var self = this;
		self.$el.find('.container').empty();
		app.collections.categorias.each(function(model, i){
			var u = new SimpleStock.Views.Categoria({
				model : model
			});
			u.render().appendTo(self.$el.find('.container'));
		});
	},

});