
SimpleStock.Views.EditProducto = Backbone.View.extend({
	tagName 	: $('#edit-producto').attr('data-tag'),
	className 	: $('#edit-producto').attr('data-class'),
	templateNew : _.template($('#new-producto').html()),
	templateEdit: _.template($('#edit-producto').html()),

	events : {
		'submit form' : 'enviar',
		'click .cancelar' : 'cancelar'
	},

	initialize : function(){
		this.isEdit = (typeof this.model != 'undefined');
	},

	render : function(){
		var self = this;
		if(this.isEdit){
			var data = this.model.toJSON();
			this.$el.html(this.templateEdit(data));
			return this.$el;
		}else{
			this.$el.html(this.templateNew());
			return this.$el;
		}
	},

	cancelar : function(event){
		if(event) event.preventDefault();
		this.remove();
		Backbone.history.navigate('/gestionar/productos', {trigger: true});
	},

	enviar : function(event){
		event.preventDefault();
		var self = this;
		var data = this.$el.find('form').serializeObject();
		var model;

		if(this.isEdit){
			model = this.model;
			model.set(data);
		}else{
			model = new SimpleStock.Models.Producto(data);
		}

		model.on('sync', function(){
			if(self.isEdit){
				Materialize.toast('Producto modificado', 4000);
				self.cancelar();
			}else{
				Materialize.toast('Producto creado', 4000);
				app.collections.productos.add(model);
				self.cancelar();
			}
		});

		model.on('error', function(){
			Materialize.toast('El producto ya existe', 4000);
		});

		model.save();
	}

});