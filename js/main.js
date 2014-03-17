$(function() {
	var $search = $('#search');
	var collection = new BookCollection();
	var collectionView = new BookCollectionView({
		collection: collection,
	});
	collectionView.setElement($('#books'));
	collection.on('destroy', function() {
		$search.trigger('click');
	});

	var $regex = $('#regex');
	$search.click(function() {
		var regex = $regex.val() || '/.*/';	
		if(!(eval(regex) instanceof RegExp)) alert("wrong regexp");

		var perPage = Math.max(Math.floor(+$('#items-per-page').val()), 0);
		if(perPage === 0) perPage = Infinity;

		var pageNumber = Math.max(Math.floor(+$('#page-number').val()), 0);
 
		
		collection.fetch({
			data: {
				name: regex,
				perPage: perPage,
				pageNumber: pageNumber,
				sort: $('[name=sort]:checked').val(),
			}
		});
	});
});
