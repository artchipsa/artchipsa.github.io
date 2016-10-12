$(document).ready(function(){
	//feature hover
	$('.keyfeatures-block .item').hover(function(){
		$(this).addClass('hovered');
		$('.keyfeatures-block .item').addClass('another-hovered');
	}, function(){
		$(this).removeClass('hovered')
		$('.keyfeatures-block .item').removeClass('another-hovered');
	});

});