$(document).ready(function(){

	specialImgPosition();

	$(window).resize(function(){
		specialImgPosition();
	});
	//car drive
	if ($('.car').length > 0){
		var lastScrollTop = 0;
		var car_offset = $('.car').offset();
		$(window).scroll(function(){
			var st = $(this).scrollTop();
			var max_height = $('.article-wrap').height();
			if (st > lastScrollTop){
			   if ($(window).scrollTop() > car_offset.top ){
					$('.car').addClass('fixed').stop().css({marginTop: parseInt($('.car').css('marginTop'))  + 70});
				}
				var current_offset = $('.car').offset();
				if (max_height < current_offset.top - 250){
					$('.car').stop().removeClass('fixed').addClass('finish');
				}
			} else {
			   if ($(window).scrollTop() < max_height + 250 && $(window).scrollTop() > car_offset.top ){
					$('.car').stop().removeClass('finish').addClass('fixed').css({marginTop: parseInt(($('.car').css('marginTop')) - 10) - 50});
				} else {
					$('.car').stop().removeClass('fixed').css({marginTop: 0});
				}
			}
			lastScrollTop = st;
		});
	}

	$(document).on('click', '.top', function(){
		$('body, html').stop().animate({scrollTop: car_offset.top}, '3550');
		return false;
	});	



	//like-func

	$('.count').each(function(){
		var count = parseInt($(this).text());
		if (count >= 0){
			$(this).css('color', '#94bc90');
		} 
		if (count < 0) {
			$(this).css('color', '#f59790');
		}
	});

	$(document).on('click', '.like-btn', function(){
		var btn = $(this);
		var count_field = btn.parent().find('.count');
		var count = parseInt(count_field.text());
		console.log('count', count - 1);

		if (count  >= 0){
			count_field.css('color', '#94bc90');
		} 
		if (count - 1 < 0) {
			count_field.css('color', '#f59790');
		} 

		if (btn.hasClass('dislike')){
			count_field.text(count - 1);
		} else {
			count_field.text(count + 1);
		}
		return false;
	});

	$(document).on('click', '.comments-show', function(){
		$('.comment-body').slideToggle(350);
	});



});


function specialImgPosition(){
	var special_img_width = $('.promo-img img').parents('.article-wrap').width();
	$('.promo-img img').width(special_img_width);
	$('.promo-img').offset({left: 0});
}