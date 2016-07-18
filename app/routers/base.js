
SimpleStock.Routers.Base = Backbone.Router.extend({

	routes : {
		"" 	: "login",
		"home" : "home",

		"registrar/entrada" : "entrada",
		"registrar/salida" : "salida",

		"inventarios" : "inventarios",
		"inventarios/nuevo" : "inventarioNuevo",

		"reportes/kardex" : "kardex",
		"reportes/entrysal" : "entrysal",

		"gestionar/usuarios" : "usuarios",
		"gestionar/usuarios/nuevo" : "usuarioNuevo",
		"gestionar/usuarios/editar/:id" : "usuarioEditar",

		"gestionar/categorias" : "categorias",
		"gestionar/categorias/nuevo" : "categoriaNuevo",
		"gestionar/categorias/editar/:id" : "categoriaEditar",

		"gestionar/productos" : "productos",
		"gestionar/productos/nuevo" : "productoNuevo",
		"gestionar/productos/editar/:id" : "productoEditar",

		"gestionar/periodos" : "periodos",
		"gestionar/periodos/nuevo" : "periodoNuevo",
		"gestionar/periodos/editar/:id" : "periodoEditar",
	},

	login : function () {
		$(document).attr('title', 'Simple Stock | Login');
	},

	home : function(){
		$(document).attr('title', 'Simple Stock | Home');
	},

	entrada : function(){
		$(document).attr('title', 'Registrar | Entrada');
	},

	salida : function(){
		$(document).attr('title', 'Registrar | Salida');
	},

	inventarios : function(){
		$(document).attr('title', 'Gestionar | Inventarios');
	},
	
	inventarioNuevo : function(){
		$(document).attr('title', 'Nuevo | Inventario');
	},

	kardex : function(){
		$(document).attr('title', 'Reportes | Entrada');
	},

	entrysal : function(){
		$(document).attr('title', 'Reportes | Salida');
	},

	usuarios : function(){
		$(document).attr('title', 'Gestionar | Usuarios');
	},
	usuarioNuevo : function(){
		$(document).attr('title', 'Nuevo | Usuarios');
	},
	usuarioEditar : function(id){
		$(document).attr('title', 'Editar | Usuarios');
		app.views.usuarios.editId = id;
	},


	categorias : function(){
		$(document).attr('title', 'Gestionar | Categorias');
	},
	categoriaNuevo : function(){
		$(document).attr('title', 'Nuevo | Categorias');
	},
	categoriaEditar : function(id){
		$(document).attr('title', 'Editar | Categorias');
		app.views.categorias.editId = id;
	},


	productos : function(){
		$(document).attr('title', 'Gestionar | Productos');
	},
	productoNuevo : function(){
		$(document).attr('title', 'Nuevo | Productos');
	},
	productoEditar : function(id){
		$(document).attr('title', 'Editar | Productos');
		app.views.productos.editId = id;
	},


	periodos : function(){
		$(document).attr('title', 'Gestionar | Periodos');
	},
	periodoNuevo : function(){
		$(document).attr('title', 'Nuevo | Periodos');
	},
	periodoEditar : function(id){
		$(document).attr('title', 'Editar | Periodos');
		app.views.periodos.editId = id;
	},

	execute: function(callback, args, name) {
		if(name!='login'){

			if (!app.isLogged()) {
		      Backbone.history.navigate('/', {trigger: true});
		      return false;
		    }

		    if(name.indexOf('usuario')>=0 && app.models.login.get('user')!='administrador'){
		    	Backbone.history.navigate('/home', {trigger: true});
		      	return false;
		    }
		}
	    if (callback) callback.apply(this, args);
	}

});