var doc = $(document);
$(document).ready(function(){	

	doc.on('click', '.js-modalcall', function(){
		var id = $(this).attr('href');
		$("#"+id).addClass('in');
		return false;
	});

	doc.on('click', '.js-close', function(){
		$(this).parents('.in').removeClass('in');
		return false;
	});


	$('.js-scrollable_block').mCustomScrollbar({
		theme: 'dark-thin',
		scrollbarPosition: 'inside'
	});

	doc.on('click', '.js-showtext', function(){
		$(this).toggleClass('active');
		$(this).parent().find('.js-showtext-block').slideToggle(300);
		$(this).next().toggleClass('glyphicon-menu-down, glyphicon-menu-up');
		$('.js-scrollable_block').mCustomScrollbar("update");
		return false
	});

});