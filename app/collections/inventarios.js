
SimpleStock.Collections.Inventarios = Backbone.Collection.extend({
	url : '/api/inventarios/',
	model : SimpleStock.Models.Inventario,

	fetchByPeriodo : function(idPeriodo, options){
		options = (options) || {};
		options.url = '/api/inventarios/periodo/'+idPeriodo;
		this.fetch(options);
	},
});