
SimpleStock.Models.Periodo = Backbone.Model.extend({
	urlRoot : '/api/periodos/',

	fetchActual : function(options){
		options = (options) || {};
		options.url = '/api/periodos/actual/';
		options.wait = true;
		this.fetch(options);
	},

	cerrar : function(options){
		options = (options) || {};
		options.url = '/api/periodos/actual/cerrar/';
		options.wait = true;
		this.save({actual : false}, options);
	},
});