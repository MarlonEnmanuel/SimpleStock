
SimpleStock.Views.EditPeriodo = Backbone.View.extend({
	tagName 	: $('#edit-periodo').attr('data-tag'),
	className 	: $('#edit-periodo').attr('data-class'),
	templateNew : _.template($('#new-periodo').html()),
	templateEdit: _.template($('#edit-periodo').html()),

	events : {
		'submit form' : 'enviar',
		'click .cancelar' : 'hide',
	},

	render : function(model){
		if(model){
			var data = model.toJSON();
			this.$el.html(this.templateEdit(data));
			this.model = model;
			this.isEdit = true;
		}else{
			this.$el.html(this.templateNew());
			this.model = new SimpleStock.Models.Periodo({});
			this.isEdit = false;
		}
		this.$el.show();
		$('html,body').animate({
		    scrollTop: this.$el.offset().top
		}, 500);
		this.$el.find('select').material_select();
	},

	hide : function(event){
		if(event) event.preventDefault();
		this.$el.hide();
		Backbone.history.navigate('/gestionar/periodos');
	},

	enviar : function(event){
		event.preventDefault();
		var self = this;
		var data = this.$el.find('form').serializeObject();
		var model = this.model.set(data);

		model.save({}, {
			wait: true,
			success : function(){
				if(self.isEdit){
					Materialize.toast('Periodo modificado', 4000);
					self.hide();
				}else{
					Materialize.toast('Periodo creado', 4000);
					app.collections.periodos.add(model);
					app.models.actual = model;
					app.views.periodos.loadTable();
					self.hide();
				}
			},
			error : function(x, s){
				Materialize.toast(s.responseText);
			},
		});
	}

});