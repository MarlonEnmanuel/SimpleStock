
SimpleStock.Views.Cuenta = Backbone.View.extend({
	tagName 	: $('#page-cuenta').attr('data-tag'),
	className 	: $('#page-cuenta').attr('data-class'),
	template 	: _.template($('#page-cuenta').html()),

	events : {
		'submit form' : 'enviar',
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

	initialize : function(){
		var self = this;

		app.views.main.add(this);

		app.router.on('route:micuenta', function(){
			app.views.main.show(self);
			app.views.header.setTitle('Mi Cuenta');
		});
	},

	render : function(){
		this.$el.html(this.template(app.models.login.toJSON()));
		return this.$el;
	},

	enviar : function(event){
		event.preventDefault();

		var data = this.$el.find('form').serializeObject();
		app.models.login.cambiarPass(data.passold, data.newpass1, data.newpass2, {
			success : function(){
				Materialize.toast('Contraseña actualizada, porfavor inicie sesión', 4000);
				app.models.login.destroy();
			},
			error : function(xhr, st){
				Materialize.toast(st.responseText, 4000);
			},
		});
	},

});