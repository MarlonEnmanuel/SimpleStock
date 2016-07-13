
SimpleStock.Views.Main = Backbone.View.extend({
	tagName 	: 'main',
	className 	: '',
	template 	: _.template($('#sserror').html()),

	initialize : function(){
		var self = this;
		app.routers.base.on('route:home', function(){
			self.clear();
		});
		app.routers.base.on('route:login', function(){
			self.clear();
		});
	},

	render : function(){
		return this.$el;
	},

	add : function(view){
		this.$el.append(view.render());
	},

	clear : function(){
		this.$el.html('');
	},

	renderError : function(){
		this.$el.html(this.template());
	}

});
