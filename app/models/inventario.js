
SimpleStock.Models.Inventario = Backbone.Model.extend({
	urlRoot : '/api/inventarios/',

	getByPerPro : function(idPer, idPro, options){
		options = (options) || {};
		options.url = '/api/inventarios/periodo/'+idPer+'/producto/'+idPro;
		this.fetch(options);
	},

	recalcular : function(options){
		var self = this;
		options = (options) || {};
		options.wait = true;
		options.url = '/api/movimientos/inventario/'+this.get('id')+'/actualizar';
		this.save({}, options);
	},
});