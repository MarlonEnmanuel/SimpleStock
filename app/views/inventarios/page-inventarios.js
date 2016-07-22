
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
		this.collection = new SimpleStock.Collections.Inventarios();

		app.views.main.add(this);

		this.$el.find('#ip-idperiodo').change(function(){
			self.loadTable();
			self.editer.hide();
		});

		this.collection.on('add', function(model){
			var u = new SimpleStock.Views.Inventario({
				model : model
			});
			u.render().appendTo(self.$el.find('.container'));
		});

		app.router.on('route:inventarios', function(){
			app.views.main.show(self);
			app.views.header.setTitle('Inventarios');
			self.loadTable();
			self.$el.find('select').material_select();
		});

		app.router.on('route:inventarioNuevo', function(){
			self.editer.render();
			app.views.header.setTitle('Inventario');
		});

		app.router.on('route:inventarioEditar', function(){
			var inv = new SimpleStock.Models.Inventario({id: self.editId});
			inv.fetch({
				success: function(){
					self.editer.render(inv);
				},
				error: function(){
					Backbone.history.navigate('/inventarios');
					Materialize.toast('El inventari no existe', 4000);
				},
			});
		});
	},

	render : function(){
		this.$el.html(this.template());
		this.$el.append(this.editer.$el);
		return this.$el;
	},

	crear : function(event){
		event.preventDefault();
		var idperiodo = this.$el.find('#ip-idperiodo').val();
		if(app.models.actual.get('id')==idperiodo){
			Backbone.history.navigate('/inventarios/nuevo', {trigger:true});
		}
	},

	loadTable : function(){
		var self = this;
		self.$el.find('.container').empty();
		var idperiodo = self.$el.find('#ip-idperiodo').val();
		
		if(idperiodo>0){
			self.collection.reset();
			self.collection.fetchByPeriodo(idperiodo);
		}
	},

});