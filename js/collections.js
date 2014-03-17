var BookCollection = Backbone.Collection.extend({
	model: BookModel,
	url: '/books',
});
