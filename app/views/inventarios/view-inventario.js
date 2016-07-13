
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