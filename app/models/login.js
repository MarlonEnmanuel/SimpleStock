
SimpleStock.Models.Login = Backbone.Model.extend({
	url : '/api/login/',
	initialize : function(){
		var self = this;
		self.on('destroy', function(){
			self.clear();
		});
	}
});