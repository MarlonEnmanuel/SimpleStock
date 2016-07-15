
SimpleStock.Routers.Gestionar = Backbone.Router.extend({
	
	routes : {
		"gestionar/usuarios" : "usuarios",
		"gestionar/usuarios/" : "usuarios",
		"gestionar/usuarios/nuevo" : "usuarioNuevo",
		"gestionar/usuarios/nuevo/" : "usuarioNuevo",
		"gestionar/usuarios/editar/:id" : "usuarioEditar",
		"gestionar/usuarios/editar/:id/" : "usuarioEditar",

		"gestionar/categorias" : "categorias",
		"gestionar/categorias/" : "categorias",
		"gestionar/categorias/nuevo" : "categoriaNuevo",
		"gestionar/categorias/nuevo/" : "categoriaNuevo",
		"gestionar/categorias/editar/:id" : "categoriaEditar",
		"gestionar/categorias/editar/:id/" : "categoriaEditar",

		"gestionar/productos" : "productos",
		"gestionar/productos/" : "productos",
		"gestionar/productos/nuevo" : "productoNuevo",
		"gestionar/productos/nuevo/" : "productoNuevo",
		"gestionar/productos/editar/:id" : "productoEditar",
		"gestionar/productos/editar/:id/" : "productoEditar",


		"gestionar/periodos" : "periodos",
		"gestionar/periodos/" : "periodos",
		"gestionar/periodos/nuevo" : "periodoNuevo",
		"gestionar/periodos/nuevo/" : "periodoNuevo",
		"gestionar/periodos/editar/:id" : "periodoEditar",
		"gestionar/periodos/editar/:id/" : "periodoEditar",
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

});