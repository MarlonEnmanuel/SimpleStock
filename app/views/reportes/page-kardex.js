
SimpleStock.Views.Kardex = Backbone.View.extend({
	tagName 	: $('#page-kardex').attr('data-tag'),
	className 	: $('#page-kardex').attr('data-class'),
	template 	: _.template($('#page-kardex').html()),

	events : {
		'submit form' : 'generar'
	},

	initialize : function(){
		var self = this;

		this.collection = new SimpleStock.Collections.Movimiento({});

		this.collection.on('add', function(model){
			var u = new SimpleStock.Views.vKardex({
				model : model
			});
			u.render().appendTo(self.$el.find('.container'));
		});

		this.collection.on('error', function(){
			app.views.main.clear();
			app.views.main.renderError();
		});

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