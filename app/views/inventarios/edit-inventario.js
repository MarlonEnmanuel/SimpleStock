
SimpleStock.Views.EditInventario = Backbone.View.extend({
	tagName 	: $('#new-inventario').attr('data-tag'),
	className 	: $('#new-inventario').attr('data-class'),
	templateNew : _.template($('#new-inventario').html()),

	events : {
		'submit form' : 'enviar',
		'click .cancelar' : 'hide'
	},

	render : function(){
		this.$el.html(this.templateNew());
		this.model = new SimpleStock.Models.Inventario({});
		this.$el.show();
		$('html,body').animate({
		    scrollTop: this.$el.offset().top
		}, 500);
	},

	hide : function(event){
		if(event) event.preventDefault();
		this.$el.hide();
		Backbone.history.navigate('/inventarios');
	},

	enviar : function(event){
		event.preventDefault();
		var self = this;
		var data = this.$el.find('form').serializeObject();
		var model = this.model.set(data);

		var pro = app.collections.productos.findWhere({codigo: data.codigo});
		if(pro){
			model.set('idproducto', pro.get('id'));
		}else{
			Materialize.toast('El producto no existe', 4000);
			return false;
		}

		model.save({}, {
			success : function(){
				Materialize.toast('Inventario registrado', 4000);
				app.views.inventarios.loadTable();
				self.hide();
			},
			error : function(x, s){
				Materialize.toast(s.responseText);
			},
		});
	}

});