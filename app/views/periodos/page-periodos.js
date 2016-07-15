
SimpleStock.Views.Periodos = Backbone.View.extend({
	tagName 	: $('#page-periodos').attr('data-tag'),
	className 	: $('#page-periodos').attr('data-class'),
	template 	: _.template($('#page-periodos').html()),

	events : {
		'click .crear' : 'crear'
	},

	initialize : function(){
		var self = this;

		this.editer = new SimpleStock.Views.EditPeriodo();

		app.views.main.add(this);

		app.routers.gestionar.on('route:periodos', function(){
			app.views.main.show(self);
			app.views.header.setTitle('Periodos');
			self.loadTable();
		});

		app.routers.gestionar.on('route:periodoNuevo', function(){
			self.editer.render();
		});

		app.routers.gestionar.on('route:periodoEditar', function(){
			var model = app.collections.periodos.get(self.editId);
			if(model){
				self.editer.render(model);
			}else{
				Backbone.history.navigate('/gestionar/periodos');
				Materialize.toast('El periodo no existe', 4000);
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
		Backbone.history.navigate('/gestionar/periodos/nuevo', {trigger:true});
	},

	loadTable : function(){
		var self = this;
		self.$el.find('.container').empty();
		app.collections.periodos.each(function(model, i){
			var u = new SimpleStock.Views.Periodo({
				model : model
			});
			u.render().appendTo(self.$el.find('.container'));
		});
	},

});