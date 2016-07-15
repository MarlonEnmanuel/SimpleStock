
SimpleStock.Routers.Registrar = Backbone.Router.extend({
	
	routes : {
		"registrar/entrada" : "entrada",
		"registrar/entrada/" : "entrada",

		"registrar/salida" : "salida",
		"registrar/salida/" : "salida",

		"inventarios" : "inventarios",
		"inventarios/" : "inventarios",
		"inventarios/nuevo" : "inventarioNuevo",
		"inventarios/nuevo/" : "inventarioNuevo",
	},

	entrada : function(){
		$(document).attr('title', 'Registrar | Entrada');
	},

	salida : function(){
		$(document).attr('title', 'Registrar | Salida');
	},

	inventarios : function(){
		$(document).attr('title', 'Gestionar | Inventarios');
	},
	
	inventarioNuevo : function(){
		$(document).attr('title', 'Nuevo | Inventario');
	},

});