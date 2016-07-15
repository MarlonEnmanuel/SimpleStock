
SimpleStock.Views.Login = Backbone.View.extend({

	tagName 	: $('#sslogin').attr('data-tag'),
	className 	: $('#sslogin').attr('data-class'),
	template 	: _.template($('#sslogin').html()),

	events : {
		'submit form' : 'logear'
	},

	initialize : function(){
		var self = this;

		app.routers.base.on('route:login', function(){
			if(app.isLogged()){
				Backbone.history.navigate('/home', {trigger: true});
			}else{
				self.cerrar();
			}
		});

		app.routers.base.on('route:home', function(){
			self.abrir();
		});
	},

	render : function(){
		this.$el.html(this.template());
		return this.$el;
	},

	abrir : function(){
		this.$el.slideUp(600);
	},

	cerrar : function(){
		this.$el.slideDown(600);
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
				app.init();
			},
			error : function(jqXHR, textStatus, errorThrown){
				Materialize.toast(textStatus.responseText, 2500);
			}
		});
	},

	launchApp : function(){

	},

});