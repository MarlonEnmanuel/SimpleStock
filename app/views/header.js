
SimpleStock.Views.Header = Backbone.View.extend({
	tagName 	: $('#ssheader').attr('data-tag'),
	className 	: $('#ssheader').attr('data-class'),
	template 	: _.template($('#ssheader').html()),

	initialize : function(){
		var self = this;

		app.router.on('route:home', function(){
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


