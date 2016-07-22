
SimpleStock.Models.Login = Backbone.Model.extend({
	url : '/api/login/',

	initialize : function(){
		var self = this;
		self.on('destroy', function(){
			self.clear();
		});
	},

	cambiarPass : function(passold, newpass1, newpass2, options){
		options = (options) || {};
		options.url = '/api/usuarios/'+this.get('id')+'/nuevopass';
		options.wait = true;
		this.save({
			passold : passold,
			newpass1 : newpass1,
			newpass2 : newpass2,
		}, options);
	},
	
});