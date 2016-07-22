
SimpleStock.Views.Entrysal = Backbone.View.extend({
	tagName 	: $('#view-entrysal').attr('data-tag'),
	className 	: $('#view-entrysal').attr('data-class'),
	template 	: _.template($('#view-entrysal').html()),

	events : {
		'click .apunte' : 'apunte',
		'click .editar' : 'editar',
		'click .eliminar' : 'eliminar',
	},

	initialize : function(){
		var self = this;
		self.model.on('sync', function(){
			self.render();
		});
		self.model.on('destroy', function(){
			self.remove();
		});
	},

	render : function(){
		this.$el.html(this.template(this.model.toJSON()));
		return this.$el;
	},

	apunte : function(){
		Materialize.toast(this.model.get('apunte'), 5000);
	},

	editar : function(event){
		event.preventDefault();
		Backbone.history.navigate('/registro/editar/'+this.model.get('id'), {trigger: true});
	},

	eliminar : function(event){
		event.preventDefault();
		var self = this;
		if(confirm('¿Seguro que desea eliminar este movimiento?')){
			self.model.destroy({
				wait : true,
				success : function(){
					Materialize.toast('Movimiento eliminado correctamente<br>Se recomienda actualiar el inventario', 4000);
				},
				error : function(xhr, st){
					Materialize.toast(st.responseText, 5000);
				},
			});
		}
	},
	
});