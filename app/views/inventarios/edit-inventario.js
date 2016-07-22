
SimpleStock.Views.EditInventario = Backbone.View.extend({
	tagName 	: $('#new-inventario').attr('data-tag'),
	className 	: $('#new-inventario').attr('data-class'),
	templateNew : _.template($('#new-inventario').html()),
	templateEdit: _.template($('#edit-inventario').html()),

	events : {
		'submit form' : 'enviar',
		'click .cancelar' : 'hide',
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

	render : function(model){
		if(model){
			var data = model.toJSON();
			this.$el.html(this.templateEdit(data));
			this.model = model;
			this.isEdit = true;
		}else{
			this.$el.html(this.templateNew());
			this.model = new SimpleStock.Models.Inventario({});
			this.isEdit = false;
		}
		this.$el.show();
		$('html,body').animate({
		    scrollTop: this.$el.offset().top
		}, 500);
	},

	hide : function(event){
		this.$el.hide();
		Backbone.history.navigate('/inventarios');
	},

	enviar : function(event){
		event.preventDefault();
		var self = this;
		var data = this.$el.find('form').serializeObject();
		var model = this.model.set(data);

		if(!self.isEdit){
			var pro = app.collections.productos.findWhere({codigo: data.codigo});
			if(!pro){
				Materialize.toast('Producto no encontrado',4000);
				return false;
			}
			model.set('idproducto', pro.get('id'));
		}

		model.save({}, {
			success : function(){
				if(self.isEdit){
					Materialize.toast('Inventario actualizado', 4000);
					app.views.inventarios.loadTable();
					self.hide();
				}else{
					Materialize.toast('Inventario registrado', 4000);
					app.views.inventarios.loadTable();
					self.hide();
				}
			},
			error : function(x, s){
				Materialize.toast(s.responseText);
			},
		});
	}

});