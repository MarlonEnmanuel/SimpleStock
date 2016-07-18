
SimpleStock.Views.Usuario = Backbone.View.extend({
	tagName 	: $('#view-usuario').attr('data-tag'),
	className 	: $('#view-usuario').attr('data-class'),
	template 	: _.template($('#view-usuario').html()),

	events : {
		'click .editar' : 'editar',
		'click .cambiarEstado' : 'cambiarEstado',
	},

	initialize : function(){
		var self = this;
		self.model.on('sync', function(){
			self.render();
		});
	},

	render : function(){
		this.$el.html(this.template(this.model.toJSON()));
		return this.$el;
	},

	editar : function(event){
		event.preventDefault();
		var url = '/gestionar/usuarios/editar/'+this.model.get('id');
		Backbone.history.navigate(url, {trigger: true});
	},

	cambiarEstado : function(event){
		event.preventDefault();
		this.model.set('estado', !this.model.get('estado'));
		var st = (this.model.get('estado')) ? 'Cuenta de usuario activada' : 'Cuenta de usuario desactivada';
		this.model.cambiarEstado({
			success : function(){
				Materialize.toast(st, 3000);
			},
			error : function(xhr, error){
				Materialize.toast(error.responseText);
			},
		});
	},
	
});