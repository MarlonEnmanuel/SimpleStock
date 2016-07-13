
SimpleStock.Routers.Base = Backbone.Router.extend({

	routes : {
		"" 	: "login",

		"home" : "home",
		"home/" : "home"
	},

	login : function () {
		$(document).attr('title', 'Simple Stock | Login');
	},

	home : function(){
		$(document).attr('title', 'Simple Stock | Home');
	},

});