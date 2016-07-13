
SimpleStock.Views.EditInventario = Backbone.View.extend({
	tagName 	: $('#new-inventario').attr('data-tag'),
	className 	: $('#new-inventario').attr('data-class'),
	templateNew : _.template($('#new-inventario').html()),

	events : {
		'submit form' : 'enviar',
		'click .cancelar' : 'cancelar'
	},

	render : function(){
		var self = this;
		this.$el.html(this.templateNew());
		return this.$el;
	},

	cancelar : function(event){
		if(event) event.preventDefault();
		this.remove();
		Backbone.history.navigate('/gestionar/inventario', {trigger: true});
	},

	enviar : function(event){
		event.preventDefault();
		var self = this;

		var data = this.$el.find('form').serializeObject();
		model = new SimpleStock.Models.Inventario(data);
		var p = app.collections.productos.where({codigo: data.codigo});

		if(p.length===0){
			Materialize.toast('El producto no existe', 4000);
			return;
		}

		model.set('idproducto', p[0].id);
		model.set('idperiodo', 1);

		model.save();

		model.on('sync', function(){
			Materialize.toast('Inventario registrado', 4000);
			self.collection.add(model);
			self.cancelar();
		});

		model.on('error', function(){
			Materialize.toast('El producto ya esta inventariado', 4000);
		});

	}

});