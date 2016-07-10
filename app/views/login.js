
SimpleStock.Views.Login = Backbone.View.extend({

	tagName 	: $('#sslogin').attr('data-tag'),
	className 	: $('#sslogin').attr('data-class'),
	template 	: _.template($('#sslogin').html()),

	events : {
		'submit form' : 'logear'
	},

	initialize : function(){
		var self = this;
		app.models.login.on('destroy', function(){
			self.cerrar();
			Backbone.history.navigate('/');
		});
	},

	render : function(){
		this.$el.html(this.template());
		if(app.models.login.has('id')){
			this.$el.hide();
		}
		return this.$el;
	},

	abrir : function(){
		this.$el.slideUp(800);
	},

	cerrar : function(){
		this.$el.slideDown(800);
	},

	logear : function(event){
		event.preventDefault();
		
		var self = this;
		app.models.login.set({
			user : self.$el.find('#user').val(),
			pass : self.$el.find('#pass').val(),
		});
		app.models.login.save({}, {
			success : function(){
				Materialize.toast('Bienvenido!', 3000);
				self.abrir();
				Backbone.history.navigate('/home', {trigger: true});
			},
			error : function(jqXHR, textStatus, errorThrown){
				Materialize.toast(textStatus.responseText, 2500);
			}
		});
	}

});