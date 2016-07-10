
app.models.login = new SimpleStock.Models.Login({});
app.routers.base = new SimpleStock.Routers.Base({});

app.init = function() {

	app.views.login = new SimpleStock.Views.Login({});
	app.views.header = new SimpleStock.Views.Header({});

	app.views.login.render().appendTo('body');
	app.views.header.render().appendTo('body');

	$(".dropdown-button").dropdown();
	$(".button-collapse").sideNav();
	$('.collapsible').collapsible();

	Backbone.history.start({
		root : '/',
		pushState : true
	});

	$('a[href^="/"]').click(function(event) {
		event.preventDefault();
		var ruta = $(this).attr('href');
		Backbone.history.navigate(ruta, {trigger: true});
	});

	$('a[href="#!"]').click(function(event) {
		event.preventDefault();
	});

};

$(document).ready(function($){
	app.models.login.fetch({
		success : app.init,
		error : app.init,
	});
});