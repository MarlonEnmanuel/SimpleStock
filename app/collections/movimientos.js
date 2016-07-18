
SimpleStock.Collections.Movimientos = Backbone.Collection.extend({
	url : '/api/movimientos/',
	model : SimpleStock.Models.Movimiento,

	fetchByFechas : function(idProducto, desde, hasta, options){
		options = (options) || {};
		options.url = '/api/movimientos/producto/'+idProducto+'/'+desde+'/'+hasta;
		this.fetch(options);
	},

	fetchByInventario : function(idinv, options){
		options = (options) || {};
		options.url = '/api/movimientos/inventario/'+idinv;
		this.fetch(options);
	},
});