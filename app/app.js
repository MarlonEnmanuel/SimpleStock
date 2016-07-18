
//Modelos
app.models.login = new SimpleStock.Models.Login({});
app.models.actual = new SimpleStock.Models.Periodo({});

//Colleciones
app.collections.usuarios = new SimpleStock.Collections.Usuarios({});
app.collections.categorias = new SimpleStock.Collections.Categorias({});
app.collections.productos = new SimpleStock.Collections.Productos({});
app.collections.periodos = new SimpleStock.Collections.Periodos({});

//Routers
app.router = new SimpleStock.Routers.Base({});

//Vistas
app.views.login = new SimpleStock.Views.Login({});
app.views.header = new SimpleStock.Views.Header({});
app.views.main = new SimpleStock.Views.Main({});
app.views.footer = new SimpleStock.Views.Footer({});


//Verifica la sesion del usuario
app.isLogged = function(){
	return app.models.login.has('id');
};

//Cerrar aplicación
app.reset = function(){
	app.models.actual.clear();

	app.collections.usuarios.reset();
	app.collections.categorias.reset();
	app.collections.productos.reset();
	
	app.views.main.clean();

	Backbone.history.navigate('/', {trigger: true});
};


//Carga los datos importantes
app.load = function(successCall, errorCall){
	var contSuccess = 0;
	var contError = 0;
	var success = function(){
		contSuccess ++;
		if(contSuccess==4) successCall();
	};
	var error = function(){
		contError ++;
		if(contError==1) errorCall();
	};
	app.models.actual.fetchActual();
	app.collections.usuarios.fetch({
		success : success,
		error : error,
	});
	app.collections.categorias.fetch({
		success : success,
		error : error,
	});
	app.collections.productos.fetch({
		success : success,
		error : error,
	});
	app.collections.periodos.fetch({
		success : success,
		error : error,
	});
};


//Inicializa la aplicación
app.init = function() {
	app.load(function(){

		app.views.usuarios = new SimpleStock.Views.Usuarios({});
		app.views.categorias = new SimpleStock.Views.Categorias({});
		app.views.productos = new SimpleStock.Views.Productos({});
		app.views.inventarios = new SimpleStock.Views.Inventarios({});
		app.views.registro = new SimpleStock.Views.Registro({});
		app.views.periodos = new SimpleStock.Views.Periodos({});
		app.views.kardexs = new SimpleStock.Views.Kardexs({});
		app.views.entrysals = new SimpleStock.Views.Entrysals({});

		Backbone.history.navigate('/home', {trigger: true});
	}, function(){

		app.views.main.renderError();
	});
};

//Lanza la aplicación
$(document).ready(function($){
	
	app.models.login.on('destroy', app.reset);

	app.views.login.render().appendTo('body');
	app.views.header.render().appendTo('body');
	app.views.main.render().appendTo('body');
	app.views.footer.render().appendTo('body');

	app.models.login.fetch({
		success: function(){
			app.init();
		},
	});

	Backbone.history.start({
		root : '/',
		pushState : true
	});
});