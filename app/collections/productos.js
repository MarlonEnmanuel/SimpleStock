
SimpleStock.Collections.Productos = Backbone.Collection.extend({
	url : '/api/productos/',
	model : SimpleStock.Models.Producto,
});