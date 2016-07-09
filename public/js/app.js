
SimpleStock.Models.Categoria = Backbone.Model.extend({
	urlRoot : '/api/categorias/',
});

SimpleStock.Models.Inventario = Backbone.Model.extend({
	urlRoot : '/api/inventarios/',
});

SimpleStock.Models.Login = Backbone.Model.extend({
	url : '/api/login/',
});

SimpleStock.Models.Periodo = Backbone.Model.extend({
	urlRoot : '/api/periodos/',
});

SimpleStock.Models.Producto = Backbone.Model.extend({
	urlRoot : '/api/productos/',
});

SimpleStock.Models.Usuario = Backbone.Model.extend({
	urlRoot : '/api/usuarios/',
});

SimpleStock.Collections.Categorias = Backbone.Collection.extend({
	url : '/api/categorias/',
	model : SimpleStock.Models.Categoria,
});

SimpleStock.Collections.Inventarios = Backbone.Collection.extend({
	url : '/api/inventarios/',
	model : SimpleStock.Models.Inventario,
});

SimpleStock.Collections.Periodos = Backbone.Collection.extend({
	url : '/api/periodos/',
	model : SimpleStock.Models.Periodo,
});

SimpleStock.Collections.Productos = Backbone.Collection.extend({
	url : '/api/productos/',
	model : SimpleStock.Models.Producto,
});

SimpleStock.Collections.Usuarios = Backbone.Collection.extend({
	url : '/api/usuarios/',
	model : SimpleStock.Models.Usuario,
});

$(document).ready(function($) {

	app.models.login = new SimpleStock.Models.Login({});

	app.collections.categorias = new SimpleStock.Collections.Categorias({});
	app.collections.categorias.fetch();
	app.collections.productos = new SimpleStock.Collections.Productos({});
	app.collections.productos.fetch();
});