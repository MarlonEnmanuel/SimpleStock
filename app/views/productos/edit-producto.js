
SimpleStock.Views.EditProducto = Backbone.View.extend({
	tagName 	: $('#edit-producto').attr('data-tag'),
	className 	: $('#edit-producto').attr('data-class'),
	templateNew : _.template($('#new-producto').html()),
	templateEdit: _.template($('#edit-producto').html()),

	events : {
		'submit form' : 'enviar',
		'click .cancelar' : 'hide'
	},

	render : function(model){
		if(model){
			var data = model.toJSON();
			this.$el.html(this.templateEdit(data));
			this.model = model;
			this.isEdit = true;
		}else{
			this.$el.html(this.templateNew());
			this.model = new SimpleStock.Models.Producto({});
			this.isEdit = false;
		}
		this.$el.show();
		$('html,body').animate({
		    scrollTop: this.$el.offset().top
		}, 500);
		this.$el.find('select').material_select();
	},

	hide : function(event){
		if(event) event.preventDefault();
		this.$el.hide();
		Backbone.history.navigate('/gestionar/productos');
	},

	enviar : function(event){
		event.preventDefault();
		var self = this;
		var data = this.$el.find('form').serializeObject();
		var model = this.model.set(data);

		model.save({}, {
			wait: true,
			success : function(){
				if(self.isEdit){
					Materialize.toast('Producto modificado', 4000);
					self.hide();
				}else{
					Materialize.toast('Producto creado', 4000);
					app.collections.productos.add(model);
					app.views.productos.loadTable();
					self.hide();
				}
			},
			error : function(x, s){
				Materialize.toast(s.responseText);
			},
		});
	}

});