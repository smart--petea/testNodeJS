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

var BookView = Backbone.View.extend({
	template: _.template(BookViewTemplate),
	initialize: function() {
		this.model.on('change', this.render, this);
		this.render();
	}, 

	tagName: 'div',
	className: 'book',

	events: {
		'click .picture': 'clickPicture',
	},

	clickPicture: function() {
		console.log(arguments);
		console.log('clickPicture');
	},

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
		console.log('collection: ', that.collection);
		that.collection.each(function(mod, index) {
			console.log('mod ', mod);
			bookView = new BookView({
				model: mod,
			});	
			that.$el.append(bookView.$el)
		});
		return that;
	}
});
