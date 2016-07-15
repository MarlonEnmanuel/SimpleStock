
SimpleStock.Views.Kardexs = Backbone.View.extend({
	tagName 	: $('#page-kardexs').attr('data-tag'),
	className 	: $('#page-kardexs').attr('data-class'),
	template 	: _.template($('#page-kardexs').html()),

	events : {
		'submit form' : 'loadTable'
	},

	initialize : function(){
		var self = this;

		this.collection = new SimpleStock.Collections.Movimientos();

		app.views.main.add(this);

		this.collection.on('add', function(model){
			var u = new SimpleStock.Views.Kardex({
				model : model
			});
			u.render().appendTo(self.$el.find('.container'));
		});

		app.routers.reportes.on('route:kardex', function(){
			app.views.main.show(self);
			app.views.header.setTitle('Kardex');
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

		var idinv = self.$el.find('#ip-idinventario').val();

		var minv = new SimpleStock.Models.Inventario();

		minv.on('sync', function(){
			self.collection.reset();
			var url = '/api/movimientos/inventario/'+idinv+'/';
			self.collection.fetch({url: url});

			var pro = app.collections.productos.findWhere({id: minv.get('idproducto')});

			self.$el.find('.cabecera .inicial').text(minv.get('inicial'));
			self.$el.find('.cabecera .fecha').text((new Date()).toLocaleString());
			self.$el.find('.cabecera .producto').text(pro.get('codigo')+' - '+pro.get('nombre'));
			self.$el.find('.cabecera').show();
		});

		minv.on('error', function(){
			Materialize.toast('El codigo no existe', 4000);
		});

		var url2 = '/api/inventarios/'+idinv+'/';
		minv.fetch({url: url2});
	},

});