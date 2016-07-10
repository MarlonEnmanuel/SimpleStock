
SimpleStock.Routers.Base = Backbone.Router.extend({
	routes : {
		"" 	: "login",
		"home" : "home",
		"home/" : "home"
	},
	login : function () {
		if(app.models.login.has('id')){
			Backbone.history.navigate('/home', {trigger: true});
		}
	},
	home : function(){
		this.verificar();
	},
	verificar : function(){
		if(!app.models.login.has('id')){
			Backbone.history.navigate('/', {trigger: true});
		}
	}
});