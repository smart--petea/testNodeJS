var	BookViewTemplate = [
		"<div class='left'>",
			"<img class='picture' src='<%= picture %>'>",
			"<p class='price'>price: <%= price %></p>",
		"</div>",
		"<div class='right'>",
			"<p class='title'><%= name %></p>",
			"<p class='descr'><%= desc %></p>",
		"</div>",
		"<div style='clear:both'></div>",
		"<div class='buttons'><button class='edit'>Edit</button><button class='remove'>Remove</button></div>",
].join("");

var BookEditTemplate = [
	"<div class='inner'>",
		"<p>",
			"<label>Name: </label><input class='name' type='text' value='<%= name %>'>",
		"</p>",
		"<p>",
			"<label>Price: </label><input class='price' type='text' value='<%= price %>'>",
		"</p>",
		"<p>",
			"<label>Description: </label><textarea class='desc' type='text' ><%= desc %></textarea>",
		"</p>",
		"<p>",
			"<label>Picture: </label><input class='picture' type='text' value='<%= picture %>'>",
		"</p>",
		"<p>",
			"<button class='cancelButton'>Cancel</button>",
			"<button class='okButton'>Ok</button>",
		"</p>",
	"</div>",
].join("");

var BookView = Backbone.View.extend({
	template: _.template(BookViewTemplate),
	initialize: function() {
		this.model.on('change', this.render, this);
		this.render();
	}, 

	tagName: 'div',
	className: 'book',

	events: {
		'click .remove': 'removeItem',
		'click .edit': 'editItem',
	},

	editItem: function() {
		new BookEditView({
			model: this.model,
			top: this.$el.position().top,
		});
	},

	removeItem: function() {
		this.model.destroy();
	},

	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	},
});

var BookEditView = Backbone.View.extend({
	tagName: 'div',
	className: 'edit-view',
	initialize: function(options) {
		$('body').append(this.render().$el);
		this.$el.css({
			width: $('body').width(),
			height: $('body').height(),
		});
		this.$('.inner').css({
			top: options.top,
		});
	},
	
	events: {
		'click .okButton': 'okClick',
		'click .cancelButton': 'cancelClick',
	},

	cancelClick: function() {
		this.$el.remove();
	},

	okClick: function() {
		var price = this.$('.price').val(),
			name = this.$('.name').val(),
			desc = this.$('textarea').val(),
			picture = this.$('.picture').val();
		this.model.set({
			price: price,
			name: name,
			desc: desc,
			picture: picture,
		}).save();
		 
		this.$el.remove();
	}, 
	template: _.template(BookEditTemplate),

	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	},
});

var BookCollectionView = Backbone.View.extend({
	initialize: function() {
		this.collection.on('sync', this.render, this);
	},

	render: function() {
		var that = this;
		var bookView;
		that.$el.empty();
		that.collection.each(function(mod, index) {
			bookView = new BookView({
				model: mod,
			});	
			that.$el.append(bookView.$el)
		});
		return that;
	}
});
