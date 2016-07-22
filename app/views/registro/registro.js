
SimpleStock.Views.Registro = Backbone.View.extend({
	tagName 	: $('#page-registro').attr('data-tag'),
	className 	: $('#page-registro').attr('data-class'),
	template 	: _.template($('#page-registro').html()),
	templateEdit: _.template($('#edit-registro').html()),

	events : {
		'submit form' : 'enviar',
		'keypress form' : 'pressEnter',
		'click .cancelar' : 'cancelar',
	},

	pressEnter : function(event){
		var keyCode = event.keyCode || event.which;
		if(keyCode==13){
			event.preventDefault();
			var index = parseInt($(event.target).attr('tabindex'));
			var next = this.$el.find('form [tabindex='+(index+1)+']');
			if( next.length ){
				$(next).focus();
				$(next).select();
			}else{
				this.$el.find('form [tabindex=1]').focus();
				this.$el.find('form [tabindex=1]').select();
			}
		}
	},

	initialize : function(){
		var self = this;

		app.views.main.add(this);

		app.router.on('route:registro', function(){
			self.isEdit = false;
			self.render();
			app.views.main.show(self);
			app.views.header.setTitle('Registrar');
			self.$el.find('select').material_select();
		});

		app.router.on('route:registroEditar', function(){
			app.views.main.clean();
			self.isEdit = true;
			var mov = new SimpleStock.Models.Movimiento({id: self.editId});
			mov.fetch({
				success : function(){
					var inv = new SimpleStock.Models.Inventario({id: mov.get('idinventario')});
					inv.fetch({
						success: function(){
							mov.set('inventario', inv);
							self.model = mov;
							self.render();
							app.views.main.show(self);
							self.$el.find('select').material_select();
						},
					});
				},
				error : function(){
					Materialize.toast('Movimiento no encontado', 4000);
				},
			});
			app.views.header.setTitle('Editar Movimiento');
		});

	},

	render : function(){
		if(this.isEdit){
			this.$el.html(this.templateEdit(this.model.toJSON()));
		}else{
			this.$el.html(this.template());
		}
		return this.$el;
	},

	enviar : function(event){
		event.preventDefault();

		var self = this;
		var data = self.$el.find('form').serializeObject();
		var model;

		self.$el.find('form .guardar').attr('disabled', 'disabled');

		if(this.isEdit){
			model = self.model.set(data);
			model.save({}, {
				wait : true,
				success : function(){
					Materialize.toast('Movimiento actualizado.<br>Se recomienda actualizar inventario', 4000);
					Backbone.history.navigate('/inventarios', {trigger: true});
					self.$el.find('form .guardar').removeAttr('disabled');
				},
				error : function(x, s){
					Materialize.toast(s.responseText, 6000);
				},
			});
		}else{
			var pro = app.collections.productos.findWhere({codigo: data.producto});
			var inv = new SimpleStock.Models.Inventario({});
			if(!pro){
				Materialize.toast('Producto no encontrado', 4000);
				return false;
			}
			inv.getByPerPro(app.models.actual.get('id'), pro.get('id'), {
				success: function(){
					model = new SimpleStock.Models.Movimiento(data);
					model.set('idinventario', inv.get('id'));
					model.save({}, {
						wait : true,
						success : function(){
							Materialize.toast('Movimiento registrado', 4000);
							Backbone.history.navigate('/reportes/kardex', {trigger: true});
						},
						error : function(x, s){
							Materialize.toast(s.responseText, 4000);
							self.$el.find('form .guardar').removeAttr('disabled');
						},
					});
				},
				error: function(){
					Materialize.toast('El producto no está inventariado', 4000);
					self.$el.find('form .guardar').removeAttr('disabled');
				},
			});
		}
	},

	cancelar : function(){
		Backbone.history.history.back();
	},
});