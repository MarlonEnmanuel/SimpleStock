
SimpleStock.Models.Categoria = Backbone.Model.extend({
	urlRoot : '/api/categorias/',
});

SimpleStock.Models.Inventario = Backbone.Model.extend({
	urlRoot : '/api/inventarios/',
});

SimpleStock.Models.Login = Backbone.Model.extend({
	url : '/api/login/',
	initialize : function(){
		var self = this;
		self.on('destroy', function(){
			self.clear();
		});
	}
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

SimpleStock.Views.Header = Backbone.View.extend({
	tagName 	: $('#ssheader').attr('data-tag'),
	className 	: $('#ssheader').attr('data-class'),
	template 	: _.template($('#ssheader').html()),
	events : {
		
	},
	render : function(){
		var self = this;
		this.$el.html(this.template());
		return this.$el;
	},
});




SimpleStock.Views.Login = Backbone.View.extend({

	tagName 	: $('#sslogin').attr('data-tag'),
	className 	: $('#sslogin').attr('data-class'),
	template 	: _.template($('#sslogin').html()),

	events : {
		'submit form' : 'logear'
	},

	initialize : function(){
		var self = this;
		app.models.login.on('destroy', function(){
			self.cerrar();
			Backbone.history.navigate('/');
		});
	},

	render : function(){
		this.$el.html(this.template());
		if(app.models.login.has('id')){
			this.$el.hide();
		}
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
				Materialize.toast('Bienvenido!', 3000);
				self.abrir();
				Backbone.history.navigate('/home', {trigger: true});
			},
			error : function(jqXHR, textStatus, errorThrown){
				Materialize.toast(textStatus.responseText, 2500);
			}
		});
	}

});

SimpleStock.Routers.Base = Backbone.Router.extend({
	routes : {
		"" 	: "login",
		"home" : "home",
		"home/" : "home"
	},
	login : function () {
		if(app.models.login.has('id')){
			Backbone.history.navigate('/home', {trigger: true});
		}
	},
	home : function(){
		this.verificar();
	},
	verificar : function(){
		if(!app.models.login.has('id')){
			Backbone.history.navigate('/', {trigger: true});
		}
	}
});

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