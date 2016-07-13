
SimpleStock.Views.Inventarios = Backbone.View.extend({
	tagName 	: $('#page-inventarios').attr('data-tag'),
	className 	: $('#page-inventarios').attr('data-class'),
	template 	: _.template($('#page-inventarios').html()),

	events : {
		'click .crear' : 'crear'
	},

	initialize : function(){
		var self = this;

		this.collection = new SimpleStock.Collections.Inventarios({});

		this.collection.on('add', function(model){
			var u = new SimpleStock.Views.Inventario({
				model : model
			});
			u.render().appendTo(self.$el.find('.container'));
		});

		this.collection.on('error', function(){
			app.views.main.clear();
			app.views.main.renderError();
		});

		this.collection.fetch();

		app.routers.gestionar.on('route:inventario', function(){
			app.views.main.clear();
			app.views.main.add(self);
			app.views.header.setTitle('Inventario');
			self.collection.reset();
			self.collection.fetch();
		});

		app.routers.gestionar.on('route:inventarioNuevo', function(){
			var nuevo = new SimpleStock.Views.EditInventario({
				collection : self.collection
			});
			app.views.main.add(nuevo);
			app.views.header.setTitle('Inventario');
		});

	},

	render : function(){
		this.$el.html(this.template());
		return this.$el;
	},

	crear : function(event){
		event.preventDefault();
		Backbone.history.navigate('/gestionar/inventario/nuevo', {trigger:true});
	},

});