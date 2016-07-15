
SimpleStock.Views.EditCategoria = Backbone.View.extend({
	tagName 	: $('#edit-categoria').attr('data-tag'),
	className 	: $('#edit-categoria').attr('data-class'),
	templateNew : _.template($('#new-categoria').html()),
	templateEdit: _.template($('#edit-categoria').html()),

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
			this.model = new SimpleStock.Models.Categoria({});
			this.isEdit = false;
		}
		this.$el.show();
		$('html,body').animate({
		    scrollTop: this.$el.offset().top
		}, 500);
	},

	hide : function(event){
		if(event) event.preventDefault();
		this.$el.hide();
		Backbone.history.navigate('/gestionar/usuarios');
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
					Materialize.toast('Categoría modificada', 4000);
					self.hide();
				}else{
					Materialize.toast('Categoría creada', 4000);
					app.collections.categorias.add(model);
					app.views.categorias.loadTable();
					self.hide();
				}
			},
			error : function(x, s){
				Materialize.toast(s.responseText);
			},
		});
	}

});