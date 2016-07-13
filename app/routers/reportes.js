
SimpleStock.Routers.Reportes = Backbone.Router.extend({
	
	routes : {
		"reportes/kardex" : "kardex",
		"reportes/kardex/" : "kardex",

		"reportes/entrysal" : "entrysal",
		"reportes/entrysal/" : "entrysal",
	},

	kardex : function(){
		$(document).attr('title', 'Reportes | Entrada');
	},

	entrysal : function(){
		$(document).attr('title', 'Reportes | Salida');
	},

});