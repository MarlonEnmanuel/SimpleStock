
SimpleStock.Collections.Inventarios = Backbone.Collection.extend({
	url : '/api/inventarios/',
	model : SimpleStock.Models.Inventario,
});