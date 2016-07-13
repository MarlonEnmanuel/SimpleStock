
SimpleStock.Views.EditCategoria = Backbone.View.extend({
	tagName 	: $('#edit-categoria').attr('data-tag'),
	className 	: $('#edit-categoria').attr('data-class'),
	templateNew : _.template($('#new-categoria').html()),
	templateEdit: _.template($('#edit-categoria').html()),

	events : {
		'submit form' : 'enviar',
		'click .cancelar' : 'cancelar'
	},

	initialize : function(){
		this.isEdit = (typeof this.model != 'undefined');
	},

	render : function(){
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
		this.$el.remove();
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
			model = new SimpleStock.Models.Categoria(data);
		}

		model.on('sync', function(){
			if(self.isEdit){
				Materialize.toast('Categoría modificada', 4000);
				self.cancelar();
			}else{
				Materialize.toast('Categoría creada', 4000);
				app.collections.categorias.add(model);
				self.cancelar();
			}
		});

		model.on('error', function(){
			Materialize.toast('La categoría ya existe', 4000);
		});

		model.save();
	}

});