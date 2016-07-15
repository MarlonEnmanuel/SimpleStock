
SimpleStock.Views.Inventarios = Backbone.View.extend({
	tagName 	: $('#page-inventarios').attr('data-tag'),
	className 	: $('#page-inventarios').attr('data-class'),
	template 	: _.template($('#page-inventarios').html()),

	events : {
		'click .crear' : 'crear'
	},

	initialize : function(){
		var self = this;

		this.editer = new SimpleStock.Views.EditInventario();

		app.views.main.add(this);

		app.routers.gestionar.on('route:inventarios', function(){
			app.views.main.show(self);
			app.views.header.setTitle('Inventario');
			self.loadTable();
		});

		app.routers.gestionar.on('route:usuarioNuevo', function(){
			self.editer.render();
			app.views.header.setTitle('Inventario');
		});
	},

	render : function(){
		this.$el.html(this.template());
		this.$el.append(this.editer.$el);
		return this.$el;
	},

	crear : function(event){
		event.preventDefault();
		Backbone.history.navigate('/gestionar/inventario/nuevo', {trigger:true});
	},

	loadTable : function(){
		var self = this;
		self.$el.find('.container').empty();
		app.collections.usuarios.each(function(model, i){
			var u = new SimpleStock.Views.Inventario({
				model : model
			});
			u.render().appendTo(self.$el.find('.container'));
		});
	},

});