
SimpleStock.Models.Usuario = Backbone.Model.extend({
	urlRoot : '/api/usuarios/',

	cambiarEstado : function(options){
		options = (options) || {};
		options.url = '/api/usuarios/'+this.get('id')+'/cambiarEstado';
		options.save({}, options);
	},
});