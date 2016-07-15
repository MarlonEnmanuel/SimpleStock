
SimpleStock.Collections.Movimientos = Backbone.Collection.extend({
	url : '/api/movimientos/',
	model : SimpleStock.Models.Movimiento,
});