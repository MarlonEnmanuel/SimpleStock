
SimpleStock.Views.Kardexs = Backbone.View.extend({
	tagName 	: $('#page-kardexs').attr('data-tag'),
	className 	: $('#page-kardexs').attr('data-class'),
	template 	: _.template($('#page-kardexs').html()),

	events : {
		'submit form' : 'loadTable',
		'keypress form' : 'pressEnter',
	},

	pressEnter : function(event){
		var keyCode = event.keyCode || event.which;
		if(keyCode==13){
			event.preventDefault();
			var index = parseInt($(event.target).attr('tabindex'));
			var next = this.$el.find('form [tabindex='+(index+1)+']');
			if( next.length ){
				$(next).focus();
				$(next).select();
			}else{
				this.$el.find('form [tabindex=1]').focus();
				this.$el.find('form [tabindex=1]').select();
			}
		}
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

		app.router.on('route:kardex', function(){
			app.views.main.show(self);
			app.views.header.setTitle('Kardex');
			self.$el.find('.cabecera').hide();
			self.$el.find('.container').empty();
			self.$el.find('select').material_select();
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
		self.collection.reset();

		var ipper = self.$el.find('#ip-idperiodo').val().trim();
		var ippro = self.$el.find('#ip-producto').val().trim();
		var ipdesde = self.$el.find('#ip-desde').val().trim();
		var iphasta = self.$el.find('#ip-hasta').val().trim();

		if(!ipdesde) ipdesde = 'null';
		if(!iphasta) iphasta = 'null';

		var pro = app.collections.productos.findWhere({codigo: ippro});

		if(!pro){
			Materialize.toast('Producto no encontrado', 4000);
			return false;
		}

		var inv = new SimpleStock.Models.Inventario();

		inv.getByPerPro(ipper, pro.get('id'),{
			success : function(){
				self.collection.fetchByInventario(inv.get('id'), ipdesde, iphasta);
				
				self.$el.find('.cabecera .inicial').text(inv.get('inicial'));
				self.$el.find('.cabecera .fecha').text((new Date()).toLocaleString());
				self.$el.find('.cabecera .producto').text(pro.get('codigo')+' - '+pro.get('nombre'));
				self.$el.find('.cabecera').show();

				self.collection.once('sync', function(){
					var total = self.collection.getTotales();
					var cad = '<tr><td>TOTAL</td><td></td><td>'+total.entradas+'</td><td>'+total.salidas+'</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>';
					self.$el.find('.container').append(cad);
				});
			},
			error : function(){
				Materialize.toast('Producto no encontrado en el periodo', 4000);
			},
		});

	},

});