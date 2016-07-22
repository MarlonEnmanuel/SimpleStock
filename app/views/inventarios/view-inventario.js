
SimpleStock.Views.Inventario = Backbone.View.extend({
	tagName 	: $('#view-inventario').attr('data-tag'),
	className 	: $('#view-inventario').attr('data-class'),
	template 	: _.template($('#view-inventario').html()),

	events : {
		'click .recalcular' : 'recalcular',
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

	recalcular : function(event){
		event.preventDefault();
		if(confirm('Esta apunto de actualizar los saldos para este inventario, este preceso puede demorar de acuerdo al número de registros.\nEl uso del sistema durante este proceso puede generar errores. \n¿Desea continuar?')){
			this.model.recalcular({
				success : function(data){
					Materialize.toast(data.get('mensaje'), 8000);
				},
				error : function(){
					Materialize.toast('Falló la actualización, puede volver a intentar en unos segundos', 8000);
				},
			});
		}
	},

	editar : function(event){
		event.preventDefault();
		var url = '/inventarios/editar/'+this.model.get('id');
		Backbone.history.navigate(url, {trigger: true});
	},

	eliminar : function(event){
		event.preventDefault();
		if(confirm('¿Seguro que desea eliminar el inventario?')){
			this.model.destroy({
				wait : true,
				success : function(){
					Materialize.toast('Inventario eliminado', 4000);
				},
				error : function(xhr, st){
					Materialize.toast(st.responseText, 5000);
				},
			});
		}
	}
	
});