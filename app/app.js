
$(document).ready(function($) {

	app.models.login = new SimpleStock.Models.Login({});
	app.models.login.fetch();

	app.models.periodoActual = new SimpleStock.Models.Periodo({});
	app.models.periodoActual.fetch({url: '/api/periodos/actual/'});

	app.collections.categorias = new SimpleStock.Collections.Categorias({});
	app.collections.categorias.fetch();

	app.collections.productos = new SimpleStock.Collections.Productos({});
	app.collections.productos.fetch();

	app.views.login = new SimpleStock.Views.Login({});
	app.views.login.render().appendTo('body');
});