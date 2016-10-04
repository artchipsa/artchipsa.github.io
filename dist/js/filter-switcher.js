$(document).on('click', '.filter-list .filter', function(){
	var t = $(this);
	if (t.hasClass('active')){
		return false;
	} else {
		$('.filter-list .filter').removeClass('active');
		t.addClass('active');
	}
});