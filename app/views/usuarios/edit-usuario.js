
SimpleStock.Views.EditUsuario = Backbone.View.extend({
	tagName 	: $('#edit-usuario').attr('data-tag'),
	className 	: $('#edit-usuario').attr('data-class'),
	templateNew : _.template($('#new-usuario').html()),
	templateEdit: _.template($('#edit-usuario').html()),

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
			this.model = new SimpleStock.Models.Usuario({});
			this.isEdit = false;
		}
		this.$el.show();
		$('html,body').animate({
		    scrollTop: this.$el.offset().top
		}, 500);
	},

	hide : function(event){
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
					Materialize.toast('Usuario modificado', 4000);
					self.hide();
				}else{
					Materialize.toast('Usuario creado, la contraseña es 123456', 10000);
					app.collections.usuarios.add(model);
					app.views.usuarios.loadTable();
					self.hide();
				}
			},
			error : function(x, s){
				Materialize.toast(s.responseText);
			},
		});
	}

});