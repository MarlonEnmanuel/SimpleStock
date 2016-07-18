
SimpleStock.Models.Inventario = Backbone.Model.extend({
	urlRoot : '/api/inventarios/',

	getByPerPro : function(idPer, idPro, options){
		options = (options) || {};
		options.url = '/api/inventarios/periodo/'+idPer+'/producto/'+idPro;
		this.fetch(options);
	},
});