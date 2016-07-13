
SimpleStock.Views.Registro = Backbone.View.extend({
	tagName 	: $('#ssregistro').attr('data-tag'),
	className 	: $('#ssregistro').attr('data-class'),
	template 	: _.template($('#ssregistro').html()),

	events : {
		'submit form' : 'enviar'
	},

	initialize : function(){
		var self = this;

		app.routers.registrar.on('route:entrada', function(){
			app.views.main.clear();
			app.views.header.setTitle('Entrada');
			self.tipo = 'entrada';
			app.views.main.add(self);
		});

		app.routers.registrar.on('route:salida', function(){
			app.views.main.clear();
			app.views.header.setTitle('Salida');
			self.tipo = 'salida';
			app.views.main.add(self);
		});
	},

	render : function(){
		var data = {};
		if(this.tipo=='entrada'){
			data.strtipo = 'Entrada';
		}else{
			data.strtipo = 'Salida';
		}
		this.$el.html(this.template(data));
		return this.$el;
	},

	enviar : function(event){
		event.preventDefault();

		var self = this;
		var data = this.$el.find('form').serializeObject();
		var model = new SimpleStock.Models.Movimiento(data);

		debugger;
		model.set('tipo', self.tipo);

		model.on('sync', function(){
			Materialize.toast('Registro Satisfactorio', 4000);
		});

		model.on('error', function(){
			Materialize.toast('No se pudo registrar', 4000);
		});

		model.save();
	}
});