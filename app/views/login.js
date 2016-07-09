
SimpleStock.Views.Login = Backbone.View.extend({
	tagName 	: $('#sslogin').attr('data-tag'),
	className 	: $('#sslogin').attr('data-class'),
	template 	: _.template($('#sslogin').html()),
	events : {
		'submit form' : 'logear'
	},
	render : function(){
		this.$el.html(this.template());
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
				Materialize.toast('Bienvenido!', 2000);
				self.abrir();
			},
			error : function(jqXHR, textStatus, errorThrown){
				Materialize.toast(textStatus.responseText, 2000);
			}
		});
	}
});