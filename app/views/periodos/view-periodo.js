
SimpleStock.Views.Periodo = Backbone.View.extend({
	tagName 	: $('#view-periodo').attr('data-tag'),
	className 	: $('#view-periodo').attr('data-class'),
	template 	: _.template($('#view-periodo').html()),

	events : {
		'click .editar' : 'editar',
		'click .finalizar' : 'finalizar',
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
		var url = '/gestionar/periodos/editar/'+this.model.get('id');
		Backbone.history.navigate(url, {trigger: true});
	},

	finalizar : function(){
		if(confirm('Esta acción finalizará el periodo actual, por lo tanto ya no podrá hacer operaciones sobre este. ¿Desea continuar?')){
			this.model.cerrar({
				success : function(){
					Materialize.toast('Periodo finalizado, ahora puede crear uno nuevo', 6000);
					app.models.actual.clear();
				},
				error : function(x, s){
					Materialize.toast(s.responseText);
				},
			});
		}
	},
	
});