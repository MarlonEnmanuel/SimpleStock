
SimpleStock.Views.Registro = Backbone.View.extend({
	tagName 	: $('#ssregistro').attr('data-tag'),
	className 	: $('#ssregistro').attr('data-class'),
	template 	: _.template($('#ssregistro').html()),

	events : {
		'submit form' : 'enviar',
		'keypress form' : 'pressEnter',
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

		app.router.on('route:entrada', function(){
			self.tipo = 'entrada';
			self.render();
			app.views.main.show(self);
			app.views.header.setTitle('Entrada');
		});

		app.router.on('route:salida', function(){
			self.tipo = 'salida';
			self.render();
			app.views.main.show(self);
			app.views.header.setTitle('Salida');
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

		model.set('tipo', self.tipo);

		model.save({}, {
			success : function(){
				Materialize.toast('Registro Satisfactorio', 4000);
			},
			error : function(x, s){
				Materialize.toast(s.responseText);
			},
		});
	}
});