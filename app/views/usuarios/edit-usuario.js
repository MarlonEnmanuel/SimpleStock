
SimpleStock.Views.EditUsuario = Backbone.View.extend({
	tagName 	: $('#edit-usuario').attr('data-tag'),
	className 	: $('#edit-usuario').attr('data-class'),
	templateNew : _.template($('#new-usuario').html()),
	templateEdit: _.template($('#edit-usuario').html()),

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
		this.remove();
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
			model = new SimpleStock.Models.Usuario(data);
		}

		model.on('sync', function(){
			if(self.isEdit){
				Materialize.toast('Usuario modificado', 4000);
				self.cancelar();
			}else{
				Materialize.toast('Usuario creado', 4000);
				app.collections.usuarios.add(model);
				self.cancelar();
			}
		});

		model.on('error', function(){
			Materialize.toast('El usuario ya existe', 4000);
		});

		model.save();
	}

});