
SimpleStock.Views.Entrysals = Backbone.View.extend({
	tagName 	: $('#page-entrysals').attr('data-tag'),
	className 	: $('#page-entrysals').attr('data-class'),
	template 	: _.template($('#page-entrysals').html()),

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
			var u = new SimpleStock.Views.Entrysal({
				model : model
			});
			u.render().appendTo(self.$el.find('.container'));
		});

		app.router.on('route:entradas', function(){
			self.tipo = 'entrada';
			app.views.main.show(self);
			app.views.header.setTitle('Entradas');
			self.$el.find('.cabecera').hide();
			self.$el.find('.container').empty();
			self.$el.find('select').material_select();
		});

		app.router.on('route:salidas', function(){
			self.tipo = 'salida';
			app.views.main.show(self);
			app.views.header.setTitle('Salidas');
			self.$el.find('.cabecera').hide();
			self.$el.find('.container').empty();
			self.$el.find('select').material_select();
		});

	},

	render : function(){
		var data = { tipo : this.tipo };
		this.$el.html(this.template(data));
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
				self.collection.fetchByInventario(inv.get('id'), ipdesde, iphasta, {}, self.tipo+'s');
				
				self.$el.find('.cabecera .inicial').text(inv.get('inicial'));
				self.$el.find('.cabecera .fecha').text((new Date()).toLocaleString());
				self.$el.find('.cabecera .producto').text(pro.get('codigo')+' - '+pro.get('nombre'));
				self.$el.find('.cabecera').show();

				self.collection.once('sync', function(){
					var total = self.collection.getTotales();
					var val = (self.tipo='entrada') ? total.entradas : total.salidas;
					var cad = '<tr><td>TOTAL</td><td></td><td></td><td>'+val+'</td><td></td><td></td><td></td><td></td><td></td></tr>';
					self.$el.find('.container').append(cad);
				});
			},
			error : function(){
				Materialize.toast('Producto no encontrado en el periodo', 4000);
			},
		});

	},

});