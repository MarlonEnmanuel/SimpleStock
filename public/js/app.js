
$.fn.serializeObject = function(){
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

var SimpleStock = {
    Models : {},
    Collections : {},
    Views : {},
    Routers : {}
};

var app = {
    models : {},
    collections : {},
    views : {},
    routers : {}
};

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

SimpleStock.Models.Movimiento = Backbone.Model.extend({
	urlRoot : '/api/movimientos/',
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

SimpleStock.Views.EditCategoria = Backbone.View.extend({
	tagName 	: $('#edit-categoria').attr('data-tag'),
	className 	: $('#edit-categoria').attr('data-class'),
	templateNew : _.template($('#new-categoria').html()),
	templateEdit: _.template($('#edit-categoria').html()),

	events : {
		'submit form' : 'enviar',
		'click .cancelar' : 'hide'
	},

	render : function(model){
		if(model){
			var data = model.toJSON();
			this.$el.html(this.templateEdit(data));
			this.model = model;
			this.isEdit = true;
		}else{
			this.$el.html(this.templateNew());
			this.model = new SimpleStock.Models.Categoria({});
			this.isEdit = false;
		}
		this.$el.show();
		$('html,body').animate({
		    scrollTop: this.$el.offset().top
		}, 500);
	},

	hide : function(event){
		if(event) event.preventDefault();
		this.$el.hide();
		Backbone.history.navigate('/gestionar/usuarios');
	},

	enviar : function(event){
		event.preventDefault();
		var self = this;
		var data = this.$el.find('form').serializeObject();
		var model = this.model.set(data);

		model.save({}, {
			wait: true,
			success : function(){
				if(self.isEdit){
					Materialize.toast('Categoría modificada', 4000);
					self.hide();
				}else{
					Materialize.toast('Categoría creada', 4000);
					app.collections.categorias.add(model);
					app.views.categorias.loadTable();
					self.hide();
				}
			},
			error : function(x, s){
				Materialize.toast(s.responseText);
			},
		});
	}

});

SimpleStock.Views.Categorias = Backbone.View.extend({
	tagName 	: $('#page-categorias').attr('data-tag'),
	className 	: $('#page-categorias').attr('data-class'),
	template 	: _.template($('#page-categorias').html()),

	events : {
		'click .crear' : 'crear'
	},

	initialize : function(){
		var self = this;

		this.editer = new SimpleStock.Views.EditCategoria();

		app.views.main.add(this);

		app.routers.gestionar.on('route:categorias', function(){
			app.views.main.show(self);
			app.views.header.setTitle('Categorias');
			self.loadTable();
		});

		app.routers.gestionar.on('route:categoriaNuevo', function(){
			self.editer.render();
		});

		app.routers.gestionar.on('route:categoriaEditar', function(){
			var model = app.collections.categorias.get(self.editId);
			if(model){
				self.editer.render(model);
			}else{
				Backbone.history.navigate('/gestionar/categorias');
				Materialize.toast('La categoría no existe', 4000);
			}
		});
	},

	render : function(){
		this.$el.html(this.template());
		this.$el.append(this.editer.$el);
		return this.$el;
	},

	crear : function(event){
		event.preventDefault();
		Backbone.history.navigate('/gestionar/categorias/nuevo', {trigger:true});
	},

	loadTable : function(){
		var self = this;
		self.$el.find('.container').empty();
		app.collections.categorias.each(function(model, i){
			var u = new SimpleStock.Views.Categoria({
				model : model
			});
			u.render().appendTo(self.$el.find('.container'));
		});
	},

});

SimpleStock.Views.Categoria = Backbone.View.extend({
	tagName 	: $('#view-categoria').attr('data-tag'),
	className 	: $('#view-categoria').attr('data-class'),
	template 	: _.template($('#view-categoria').html()),

	events : {
		'click .editar' : 'editar'
	},

	initialize : function(){
		var self = this;
		self.model.on('sync', function(){
			self.render();
		});
	},

	render : function(){
		this.$el.html(this.template(this.model.toJSON()));
		return this.$el;
	},

	editar : function(event){
		event.preventDefault();
		var url = '/gestionar/categorias/editar/'+this.model.get('id');
		Backbone.history.navigate(url, {trigger: true});
	}
	
});

SimpleStock.Views.EditInventario = Backbone.View.extend({
	tagName 	: $('#new-inventario').attr('data-tag'),
	className 	: $('#new-inventario').attr('data-class'),
	templateNew : _.template($('#new-inventario').html()),

	events : {
		'submit form' : 'enviar',
		'click .cancelar' : 'hide'
	},

	render : function(){
		this.$el.html(this.templateNew());
		this.model = new SimpleStock.Models.Inventario({});
		this.$el.show();
		$('html,body').animate({
		    scrollTop: this.$el.offset().top
		}, 500);
	},

	hide : function(event){
		if(event) event.preventDefault();
		this.$el.hide();
		Backbone.history.navigate('/inventarios');
	},

	enviar : function(event){
		event.preventDefault();
		var self = this;
		var data = this.$el.find('form').serializeObject();
		var model = this.model.set(data);

		var pro = app.collections.productos.findWhere({codigo: data.codigo});
		if(pro){
			model.set('idproducto', pro.get('id'));
		}else{
			Materialize.toast('El producto no existe', 4000);
			return false;
		}

		model.save({}, {
			success : function(){
				Materialize.toast('Inventario registrado', 4000);
				app.views.inventarios.loadTable();
				self.hide();
			},
			error : function(x, s){
				Materialize.toast(s.responseText);
			},
		});
	}

});

SimpleStock.Views.Inventarios = Backbone.View.extend({
	tagName 	: $('#page-inventarios').attr('data-tag'),
	className 	: $('#page-inventarios').attr('data-class'),
	template 	: _.template($('#page-inventarios').html()),

	events : {
		'click .crear' : 'crear'
	},

	initialize : function(){
		var self = this;

		this.editer = new SimpleStock.Views.EditInventario();
		this.collection = new SimpleStock.Collections.Inventarios();

		app.views.main.add(this);

		this.$el.find('#ip-idperiodo').change(function(){
			self.loadTable();
			self.editer.hide();
		});

		this.collection.on('add', function(model){
			var u = new SimpleStock.Views.Inventario({
				model : model
			});
			u.render().appendTo(self.$el.find('.container'));
		});

		app.routers.registrar.on('route:inventarios', function(){
			app.views.main.show(self);
			app.views.header.setTitle('Inventarios');
			self.loadTable();
			self.$el.find('select').material_select();
		});

		app.routers.registrar.on('route:inventarioNuevo', function(){
			self.editer.render();
			app.views.header.setTitle('Inventario');
		});
	},

	render : function(){
		this.$el.html(this.template());
		this.$el.append(this.editer.$el);
		return this.$el;
	},

	crear : function(event){
		event.preventDefault();
		var idperiodo = this.$el.find('#ip-idperiodo').val();
		if(app.models.actual.get('id')==idperiodo){
			Backbone.history.navigate('/inventarios/nuevo', {trigger:true});
		}
	},

	loadTable : function(){
		var self = this;
		self.$el.find('.container').empty();
		var idperiodo = self.$el.find('#ip-idperiodo').val();
		
		if(idperiodo>0){
			self.collection.reset();
			var url = '/api/inventarios/periodo/'+idperiodo+'/';
			self.collection.fetch({url: url});
		}
	},

});

SimpleStock.Views.Inventario = Backbone.View.extend({
	tagName 	: $('#view-inventario').attr('data-tag'),
	className 	: $('#view-inventario').attr('data-class'),
	template 	: _.template($('#view-inventario').html()),

	initialize : function(){
		var self = this;
		self.model.on('sync', function(){
			self.render();
		});
	},

	render : function(){
		this.$el.html(this.template(this.model.toJSON()));
		return this.$el;
	},
	
});

SimpleStock.Views.EditPeriodo = Backbone.View.extend({
	tagName 	: $('#edit-periodo').attr('data-tag'),
	className 	: $('#edit-periodo').attr('data-class'),
	templateNew : _.template($('#new-periodo').html()),
	templateEdit: _.template($('#edit-periodo').html()),

	events : {
		'submit form' : 'enviar',
		'click .cancelar' : 'hide',
	},

	render : function(model){
		if(model){
			var data = model.toJSON();
			this.$el.html(this.templateEdit(data));
			this.model = model;
			this.isEdit = true;
		}else{
			this.$el.html(this.templateNew());
			this.model = new SimpleStock.Models.Periodo({});
			this.isEdit = false;
		}
		this.$el.show();
		$('html,body').animate({
		    scrollTop: this.$el.offset().top
		}, 500);
		this.$el.find('select').material_select();
	},

	hide : function(event){
		if(event) event.preventDefault();
		this.$el.hide();
		Backbone.history.navigate('/gestionar/periodos');
	},

	enviar : function(event){
		event.preventDefault();
		var self = this;
		var data = this.$el.find('form').serializeObject();
		var model = this.model.set(data);

		model.save({}, {
			wait: true,
			success : function(){
				if(self.isEdit){
					Materialize.toast('Periodo modificado', 4000);
					self.hide();
				}else{
					Materialize.toast('Periodo creado', 4000);
					app.collections.periodos.add(model);
					app.models.actual = model;
					app.views.periodos.loadTable();
					self.hide();
				}
			},
			error : function(x, s){
				Materialize.toast(s.responseText);
			},
		});
	}

});

SimpleStock.Views.Periodos = Backbone.View.extend({
	tagName 	: $('#page-periodos').attr('data-tag'),
	className 	: $('#page-periodos').attr('data-class'),
	template 	: _.template($('#page-periodos').html()),

	events : {
		'click .crear' : 'crear'
	},

	initialize : function(){
		var self = this;

		this.editer = new SimpleStock.Views.EditPeriodo();

		app.views.main.add(this);

		app.routers.gestionar.on('route:periodos', function(){
			app.views.main.show(self);
			app.views.header.setTitle('Periodos');
			self.loadTable();
		});

		app.routers.gestionar.on('route:periodoNuevo', function(){
			self.editer.render();
		});

		app.routers.gestionar.on('route:periodoEditar', function(){
			var model = app.collections.periodos.get(self.editId);
			if(model){
				self.editer.render(model);
			}else{
				Backbone.history.navigate('/gestionar/periodos');
				Materialize.toast('El periodo no existe', 4000);
			}
		});
	},

	render : function(){
		this.$el.html(this.template());
		this.$el.append(this.editer.$el);
		return this.$el;
	},

	crear : function(event){
		event.preventDefault();
		Backbone.history.navigate('/gestionar/periodos/nuevo', {trigger:true});
	},

	loadTable : function(){
		var self = this;
		self.$el.find('.container').empty();
		app.collections.periodos.each(function(model, i){
			var u = new SimpleStock.Views.Periodo({
				model : model
			});
			u.render().appendTo(self.$el.find('.container'));
		});
	},

});

SimpleStock.Views.Periodo = Backbone.View.extend({
	tagName 	: $('#view-periodo').attr('data-tag'),
	className 	: $('#view-periodo').attr('data-class'),
	template 	: _.template($('#view-periodo').html()),

	events : {
		'click .editar' : 'editar',
		'click .finalizar' : 'finalizar',
	},

	initialize : function(){
		var self = this;
		self.model.on('sync', function(){
			self.render();
		});
	},

	render : function(){
		this.$el.html(this.template(this.model.toJSON()));
		return this.$el;
	},

	editar : function(event){
		event.preventDefault();
		var url = '/gestionar/periodos/editar/'+this.model.get('id');
		Backbone.history.navigate(url, {trigger: true});
	},

	finalizar : function(){
		if(confirm('Esta acción finalizará el periodo actual, por lo tanto ya no podrá hacer operaciones sobre este. ¿Desea continuar?')){
			this.model.set({actual : false});
			this.model.save({},{
				url : '/api/periodos/actual/cerrar/',
				success : function(){
					Materialize.toast('Periodo finalizado, ahora puede crear uno nuevo', 6000);
					app.models.actual.clear();
				},
				error : function(x, s){
					Materialize.toast(s.responseText);
				},
			});
		}
	},
	
});

SimpleStock.Views.EditProducto = Backbone.View.extend({
	tagName 	: $('#edit-producto').attr('data-tag'),
	className 	: $('#edit-producto').attr('data-class'),
	templateNew : _.template($('#new-producto').html()),
	templateEdit: _.template($('#edit-producto').html()),

	events : {
		'submit form' : 'enviar',
		'click .cancelar' : 'hide'
	},

	render : function(model){
		if(model){
			var data = model.toJSON();
			this.$el.html(this.templateEdit(data));
			this.model = model;
			this.isEdit = true;
		}else{
			this.$el.html(this.templateNew());
			this.model = new SimpleStock.Models.Producto({});
			this.isEdit = false;
		}
		this.$el.show();
		$('html,body').animate({
		    scrollTop: this.$el.offset().top
		}, 500);
		this.$el.find('select').material_select();
	},

	hide : function(event){
		if(event) event.preventDefault();
		this.$el.hide();
		Backbone.history.navigate('/gestionar/productos');
	},

	enviar : function(event){
		event.preventDefault();
		var self = this;
		var data = this.$el.find('form').serializeObject();
		var model = this.model.set(data);

		model.save({}, {
			wait: true,
			success : function(){
				if(self.isEdit){
					Materialize.toast('Producto modificado', 4000);
					self.hide();
				}else{
					Materialize.toast('Producto creado', 4000);
					app.collections.productos.add(model);
					app.views.productos.loadTable();
					self.hide();
				}
			},
			error : function(x, s){
				Materialize.toast(s.responseText);
			},
		});
	}

});

SimpleStock.Views.Productos = Backbone.View.extend({
	tagName 	: $('#page-productos').attr('data-tag'),
	className 	: $('#page-productos').attr('data-class'),
	template 	: _.template($('#page-productos').html()),

	events : {
		'click .crear' : 'crear'
	},

	initialize : function(){
		var self = this;

		this.editer = new SimpleStock.Views.EditProducto();

		app.views.main.add(this);

		app.routers.gestionar.on('route:productos', function(){
			app.views.main.show(self);
			app.views.header.setTitle('Productos');
			self.loadTable();
		});

		app.routers.gestionar.on('route:productoNuevo', function(){
			self.editer.render();
		});

		app.routers.gestionar.on('route:productoEditar', function(){
			var model = app.collections.productos.get(self.editId);
			if(model){
				self.editer.render(model);
			}else{
				Backbone.history.navigate('/gestionar/productos');
				Materialize.toast('El producto no existe', 4000);
			}
		});
	},

	render : function(){
		this.$el.html(this.template());
		this.$el.append(this.editer.$el);
		return this.$el;
	},

	crear : function(event){
		event.preventDefault();
		Backbone.history.navigate('/gestionar/productos/nuevo', {trigger:true});
	},

	loadTable : function(){
		var self = this;
		self.$el.find('.container').empty();
		app.collections.productos.each(function(model, i){
			var u = new SimpleStock.Views.Producto({
				model : model
			});
			u.render().appendTo(self.$el.find('.container'));
		});
	},

});

SimpleStock.Views.Producto = Backbone.View.extend({
	tagName 	: $('#view-producto').attr('data-tag'),
	className 	: $('#view-producto').attr('data-class'),
	template 	: _.template($('#view-producto').html()),

	events : {
		'click .editar' : 'editar'
	},

	initialize : function(){
		var self = this;
		self.model.on('sync', function(){
			self.render();
		});
	},

	render : function(){
		this.$el.html(this.template(this.model.toJSON()));
		return this.$el;
	},

	editar : function(event){
		event.preventDefault();
		var url = '/gestionar/productos/editar/'+this.model.get('id');
		Backbone.history.navigate(url, {trigger: true});
	}
	
});

SimpleStock.Views.Registro = Backbone.View.extend({
	tagName 	: $('#ssregistro').attr('data-tag'),
	className 	: $('#ssregistro').attr('data-class'),
	template 	: _.template($('#ssregistro').html()),

	events : {
		'submit form' : 'enviar'
	},

	initialize : function(){
		var self = this;

		app.views.main.add(this);

		app.routers.registrar.on('route:entrada', function(){
			self.tipo = 'entrada';
			self.render();
			app.views.main.show(self);
			app.views.header.setTitle('Entrada');
		});

		app.routers.registrar.on('route:salida', function(){
			self.tipo = 'salida';
			self.render();
			app.views.main.show(self);
			app.views.header.setTitle('Salida');
		});
	},

	render : function(){
		var data = {};
		if(this.tipo=='entrada'){
			data.strtipo = 'Entrada';
		}else{
			data.strtipo = 'Salida';
		}
		this.$el.html(this.template(data));
		return this.$el;
	},

	enviar : function(event){
		event.preventDefault();

		var self = this;
		var data = this.$el.find('form').serializeObject();
		var model = new SimpleStock.Models.Movimiento(data);

		model.set('tipo', self.tipo);

		model.save({}, {
			success : function(){
				Materialize.toast('Registro Satisfactorio', 4000);
			},
			error : function(x, s){
				Materialize.toast(s.responseText);
			},
		});
	}
});

SimpleStock.Views.Kardex = Backbone.View.extend({
	tagName 	: $('#page-kardex').attr('data-tag'),
	className 	: $('#page-kardex').attr('data-class'),
	template 	: _.template($('#page-kardex').html()),

	events : {
		'submit form' : 'generar'
	},

	initialize : function(){
		var self = this;

		this.collection = new SimpleStock.Collections.Movimiento({});

		this.collection.on('add', function(model){
			var u = new SimpleStock.Views.vKardex({
				model : model
			});
			u.render().appendTo(self.$el.find('.container'));
		});

		this.collection.on('error', function(){
			app.views.main.clear();
			app.views.main.renderError();
		});

		app.routers.gestionar.on('route:inventario', function(){
			app.views.main.clear();
			app.views.main.add(self);
			app.views.header.setTitle('Inventario');
			self.collection.reset();
			self.collection.fetch();
		});

		app.routers.gestionar.on('route:inventarioNuevo', function(){
			var nuevo = new SimpleStock.Views.EditInventario({
				collection : self.collection
			});
			app.views.main.add(nuevo);
			app.views.header.setTitle('Inventario');
		});

	},

	render : function(){
		this.$el.html(this.template());
		return this.$el;
	},

	crear : function(event){
		event.preventDefault();
		Backbone.history.navigate('/gestionar/inventario/nuevo', {trigger:true});
	},

});


SimpleStock.Views.EditUsuario = Backbone.View.extend({
	tagName 	: $('#edit-usuario').attr('data-tag'),
	className 	: $('#edit-usuario').attr('data-class'),
	templateNew : _.template($('#new-usuario').html()),
	templateEdit: _.template($('#edit-usuario').html()),

	events : {
		'submit form' : 'enviar',
		'click .cancelar' : 'hide'
	},

	render : function(model){
		if(model){
			var data = model.toJSON();
			this.$el.html(this.templateEdit(data));
			this.model = model;
			this.isEdit = true;
		}else{
			this.$el.html(this.templateNew());
			this.model = new SimpleStock.Models.Usuario({});
			this.isEdit = false;
		}
		this.$el.show();
		$('html,body').animate({
		    scrollTop: this.$el.offset().top
		}, 500);
	},

	hide : function(event){
		if(event) event.preventDefault();
		this.$el.hide();
		Backbone.history.navigate('/gestionar/usuarios');
	},

	enviar : function(event){
		event.preventDefault();
		var self = this;
		var data = this.$el.find('form').serializeObject();
		var model = this.model.set(data);

		model.save({}, {
			wait: true,
			success : function(){
				if(self.isEdit){
					Materialize.toast('Usuario modificado', 4000);
					self.hide();
				}else{
					Materialize.toast('Usuario creado, la contraseña es 123456', 10000);
					app.collections.usuarios.add(model);
					app.views.usuarios.loadTable();
					self.hide();
				}
			},
			error : function(x, s){
				Materialize.toast(s.responseText);
			},
		});
	}

});

SimpleStock.Views.Usuarios = Backbone.View.extend({
	tagName 	: $('#page-usuarios').attr('data-tag'),
	className 	: $('#page-usuarios').attr('data-class'),
	template 	: _.template($('#page-usuarios').html()),

	events : {
		'click .crear' : 'crear'
	},

	initialize : function(){
		var self = this;

		this.editer = new SimpleStock.Views.EditUsuario();

		app.views.main.add(this);

		app.routers.gestionar.on('route:usuarios', function(){
			app.views.main.show(self);
			app.views.header.setTitle('Usuarios');
			self.loadTable();
		});

		app.routers.gestionar.on('route:usuarioNuevo', function(){
			self.editer.render();
		});

		app.routers.gestionar.on('route:usuarioEditar', function(){
			var model = app.collections.usuarios.get(self.editId);
			if(model){
				self.editer.render(model);
			}else{
				Backbone.history.navigate('/gestionar/usuarios');
				Materialize.toast('El usuario no existe', 4000);
			}
		});
	},

	render : function(){
		this.$el.html(this.template());
		this.$el.append(this.editer.$el);
		return this.$el;
	},

	crear : function(event){
		event.preventDefault();
		Backbone.history.navigate('/gestionar/usuarios/nuevo', {trigger:true});
	},

	loadTable : function(){
		var self = this;
		self.$el.find('.container').empty();
		app.collections.usuarios.each(function(model, i){
			var u = new SimpleStock.Views.Usuario({
				model : model
			});
			u.render().appendTo(self.$el.find('.container'));
		});
	},

});

SimpleStock.Views.Usuario = Backbone.View.extend({
	tagName 	: $('#view-usuario').attr('data-tag'),
	className 	: $('#view-usuario').attr('data-class'),
	template 	: _.template($('#view-usuario').html()),

	events : {
		'click .editar' : 'editar',
		'click .cambiarEstado' : 'cambiarEstado',
	},

	initialize : function(){
		var self = this;
		self.model.on('sync', function(){
			self.render();
		});
	},

	render : function(){
		this.$el.html(this.template(this.model.toJSON()));
		return this.$el;
	},

	editar : function(event){
		event.preventDefault();
		var url = '/gestionar/usuarios/editar/'+this.model.get('id');
		Backbone.history.navigate(url, {trigger: true});
	},

	cambiarEstado : function(event){
		event.preventDefault();
		this.model.set('estado', !this.model.get('estado'));
		var st = (this.model.get('estado')) ? 'Cuenta de usuario activada' : 'Cuenta de usuario desactivada';
		var url = '/api/usuarios/'+this.model.get('id')+'/cambiarEstado';
		this.model.save({}, {
			url : url,
			success : function(){
				Materialize.toast(st, 3000);
			},
			error : function(xhr, error){
				Materialize.toast(error.responseText);
			},
		});
	},
	
});

SimpleStock.Views.Footer = Backbone.View.extend({
	tagName 	: $('#ssfooter').attr('data-tag'),
	className 	: $('#ssfooter').attr('data-class'),
	template 	: _.template($('#ssfooter').html()),
	render : function(){
		var self = this;
		this.$el.html(this.template());
		return this.$el;
	},
});


SimpleStock.Views.Header = Backbone.View.extend({
	tagName 	: $('#ssheader').attr('data-tag'),
	className 	: $('#ssheader').attr('data-class'),
	template 	: _.template($('#ssheader').html()),

	initialize : function(){
		var self = this;

		app.routers.base.on('route:home', function(){
			self.setTitle('Simple Stock');
		});

		app.models.login.on('change', function(){
			self.render();
		});
	},

	render : function(){
		this.$el.html(this.template(app.models.login.toJSON()));
		this.material();
		return this.$el;
	},

	setTitle : function(name){
		this.$el.find('.brand-logo').text(name);
	},

	material : function(){
		var self = this;

		self.$el.find(".dropdown-button").dropdown();
		self.$el.find(".button-collapse").sideNav();
		self.$el.find('.collapsible').collapsible();

		self.$el.find('a[href^="/"]').click(function(event) {
			event.preventDefault();
			var ruta = self.$el.find(this).attr('href');
			Backbone.history.navigate(ruta, {trigger: true});
		});

		self.$el.find('a[href="#!"]').click(function(event) {
			event.preventDefault();
		});
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

		app.routers.base.on('route:login', function(){
			if(app.isLogged()){
				Backbone.history.navigate('/home', {trigger: true});
			}else{
				self.cerrar();
			}
		});

		app.routers.base.on('route:home', function(){
			self.abrir();
		});
	},

	render : function(){
		this.$el.html(this.template());
		return this.$el;
	},

	abrir : function(){
		this.$el.slideUp(600);
	},

	cerrar : function(){
		this.$el.slideDown(600);
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
				app.init();
			},
			error : function(jqXHR, textStatus, errorThrown){
				Materialize.toast(textStatus.responseText, 2500);
			}
		});
	},

	launchApp : function(){

	},

});

SimpleStock.Views.Main = Backbone.View.extend({
	tagName 	: 'main',
	className 	: '',
	template 	: _.template($('#sserror').html()),

	initialize : function(){
		this.pages = [];
		var self = this;
		app.routers.base.on('route:home', function(){
			self.clean();
		});
		app.routers.base.on('route:login', function(){
			self.clean();
		});
	},

	render : function(){
		return this.$el;
	},

	add : function(view){
		view.$el.hide();
		this.$el.append(view.render());
		this.pages.push(view);
	},

	clean : function(){
		_(this.pages).each(function(view, index) {
			view.$el.hide();
		});
	},

	show : function(view){
		this.clean();
		view.$el.show();
	},

	renderError : function(){
		this.clean();
		this.$el.html(this.template());
	}

});


SimpleStock.Routers.Base = Backbone.Router.extend({

	routes : {
		"" 	: "login",

		"home" : "home",
		"home/" : "home"
	},

	login : function () {
		$(document).attr('title', 'Simple Stock | Login');
	},

	home : function(){
		$(document).attr('title', 'Simple Stock | Home');
	},

});

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

SimpleStock.Routers.Registrar = Backbone.Router.extend({
	
	routes : {
		"registrar/entrada" : "entrada",
		"registrar/entrada/" : "entrada",

		"registrar/salida" : "salida",
		"registrar/salida/" : "salida",

		"inventarios" : "inventarios",
		"inventarios/" : "inventarios",
		"inventarios/nuevo" : "inventarioNuevo",
		"inventarios/nuevo/" : "inventarioNuevo",
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

});

SimpleStock.Routers.Reportes = Backbone.Router.extend({
	
	routes : {
		"reportes/kardex" : "kardex",
		"reportes/kardex/" : "kardex",

		"reportes/entrysal" : "entrysal",
		"reportes/entrysal/" : "entrysal",
	},

	kardex : function(){
		$(document).attr('title', 'Reportes | Entrada');
	},

	entrysal : function(){
		$(document).attr('title', 'Reportes | Salida');
	},

});

//Modelos
app.models.login = new SimpleStock.Models.Login({});
app.models.actual = new SimpleStock.Models.Periodo({});

//Colleciones
app.collections.usuarios = new SimpleStock.Collections.Usuarios({});
app.collections.categorias = new SimpleStock.Collections.Categorias({});
app.collections.productos = new SimpleStock.Collections.Productos({});
app.collections.periodos = new SimpleStock.Collections.Periodos({});

//Routers
app.routers.base = new SimpleStock.Routers.Base({});
app.routers.gestionar = new SimpleStock.Routers.Gestionar({});
app.routers.registrar = new SimpleStock.Routers.Registrar({});
app.routers.reportes = new SimpleStock.Routers.Reportes({});

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
	app.models.actual.fetch({
		url : '/api/periodos/actual/',
	});
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