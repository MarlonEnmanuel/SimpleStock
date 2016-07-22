
SimpleStock.Collections.Movimientos = Backbone.Collection.extend({
	url : '/api/movimientos/',
	model : SimpleStock.Models.Movimiento,

	fetchByInventario : function(idinv, desde, hasta, options, tipo){
		options = (options) || {};
		options.url = '/api/movimientos/inventario/'+idinv+'/desde/'+desde+'/hasta/'+hasta;
		if(tipo=='entradas'){
			options.url += '/entradas';
		}
		if(tipo=='salidas'){
			options.url += '/salidas';
		}
		this.fetch(options);
	},

	getTotales : function(){
		var data = {entradas: 0, salidas: 0};
		var self = this;
		this.each(function(mov) {
			if(mov.get('tipo')=='entrada'){
				data.entradas += mov.get('cantidad');
			}else{
				data.salidas += mov.get('cantidad');
			}
		});
		return data;
	},
});