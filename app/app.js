
$(document).ready(function($) {

	app.models.login = new SimpleStock.Models.Login({});

	app.collections.categorias = new SimpleStock.Collections.Categorias({});
	app.collections.categorias.fetch();
	app.collections.productos = new SimpleStock.Collections.Productos({});
	app.collections.productos.fetch();
});