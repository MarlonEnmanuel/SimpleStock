
SimpleStock.Views.Entrysals = Backbone.View.extend({
	tagName 	: $('#page-entrysals').attr('data-tag'),
	className 	: $('#page-entrysals').attr('data-class'),
	template 	: _.template($('#page-entrysals').html()),

	events : {
		'submit form' : 'loadTable'
	},

	initialize : function(){
		var self = this;

		this.collection = new SimpleStock.Collections.Movimientos();

		app.views.main.add(this);

		this.collection.on('add', function(model){
			var u = new SimpleStock.Views.Entrysal({
				model : model
			});
			u.render().appendTo(self.$el.find('.container'));
		});

		app.routers.reportes.on('route:entrysal', function(){
			app.views.main.show(self);
			app.views.header.setTitle('entrysal');
			self.$el.find('.cabecera').hide();
		});

	},

	render : function(){
		this.$el.html(this.template());
		return this.$el;
	},

	loadTable : function(event){
		event.preventDefault();
		var self = this;

		self.$el.find('.container').empty();

		var producto = app.collections.productos.findWhere({codigo: self.$el.find('form #ip-producto').val().trim()});
		var desde = self.$el.find('form #ip-desde').val().trim();
		var hasta = self.$el.find('form #ip-hasta').val().trim();

		if(!producto){
			Materialize.toast('El codigo no coincide con ningun producto');
		}

		debugger;

		self.collection.reset();
		var url = '/api/movimientos/producto/'+producto.get('id')+'/'+desde+'/'+hasta+'/';
		self.collection.fetch({url: url});

		self.$el.find('.cabecera .fecha').text((new Date()).toLocaleString());
		self.$el.find('.cabecera .producto').text(producto.get('codigo')+' - '+producto.get('nombre'));
		self.$el.find('.cabecera').show();

	},

});