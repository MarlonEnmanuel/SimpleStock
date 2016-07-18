
SimpleStock.Views.Main = Backbone.View.extend({
	tagName 	: 'main',
	className 	: '',
	template 	: _.template($('#sserror').html()),

	initialize : function(){
		this.pages = [];
		var self = this;
		app.router.on('route:home', function(){
			self.clean();
		});
		app.router.on('route:login', function(){
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
