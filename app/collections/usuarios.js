
SimpleStock.Collections.Usuarios = Backbone.Collection.extend({
	url : '/api/usuarios/',
	model : SimpleStock.Models.Usuario,
});