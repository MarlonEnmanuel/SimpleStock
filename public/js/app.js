
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

SimpleStock.Views.Login = Backbone.View.extend({
	tagName 	: $('#sslogin').attr('data-tag'),
	className 	: $('#sslogin').attr('data-class'),
	template 	: _.template($('#sslogin').html()),
	events : {
		'submit form' : 'logear'
	},
	render : function(){
		this.$el.html(this.template());
		return this.$el;
	},
	abrir : function(){
		this.$el.slideUp(800);
	},
	cerrar : function(){
		this.$el.slideDown(800);
	},
	logear : function(event){
		event.preventDefault();
		
		var self = this;
		app.models.login.set({
			user : self.$el.find('#user').val(),
			pass : self.$el.find('#pass').val(),
		});
		app.models.login.save({}, {
			success : function(){
				Materialize.toast('Bienvenido!', 2000);
				self.abrir();
			},
			error : function(jqXHR, textStatus, errorThrown){
				Materialize.toast(textStatus.responseText, 2000);
			}
		});
	}
});

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