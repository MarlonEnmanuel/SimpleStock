
SimpleStock.Routers.Registrar = Backbone.Router.extend({
	
	routes : {
		"registrar/entrada" : "entrada",
		"registrar/entrada/" : "entrada",

		"registrar/salida" : "salida",
		"registrar/salida/" : "salida",
	},

	entrada : function(){
		$(document).attr('title', 'Registrar | Entrada');
	},

	salida : function(){
		$(document).attr('title', 'Registrar | Salida');
	},

});