$(document).ready(function(){
	// Появление элементов на экране
	setTimeout(function(){
		$('header, .main-text, .scroll-down, #navigator').addClass('load');
	}, 100)

	//Постраничный скролл МОЙ КОД МОИ КОСТЫЛИ, ЙОУ

	//определяем направление скролла
	$(document).bind('mousewheel DOMMouseScroll', function(event) {
	   event.preventDefault();
	   var delta = event.originalEvent.wheelDelta || -event.originalEvent.detail;
	   init_scroll(event, delta);
	});

	document.addEventListener('touchmove', function(event) {
		event.preventDefault();
	   	var currentY = event.originalEvent.touches[0].clientY;
	   	init_scroll(event, currentY);
	}, false);

	//перекючение слайда


	switchWhere($('#navigator li[data-id="0"]'));

	$(document).on('click', '#navigator li', function(){
		var id = $(this).data('id');
		var active_id = $('#navigator li.active').data('id');
		var active_li = $('#navigator li.active');
		if ($(this).hasClass('active')){
			return false;
		} else {
			$('#navigator li').removeClass('active');
			$(this).addClass('active');
			switchWhere($(this));
			checkWhite($('#fullpage div[data-id='+id+']'));

			//Обнуляем значение после проигрывания анимации
			setTimeout(function(){
				$('#fullpage div[data-id='+active_id+']').removeClass('active');
			}, 1000);
			$('#fullpage div[data-id='+id+']').addClass('active');

			//TODO переключение табов c половинками
			if (active_id < id){
				setTimeout(function(){
					$('#fullpage div[data-id='+active_id+']').find('.side').removeClass('in').addClass('out');
				}, 0)
				setTimeout(function(){
					$('#fullpage div[data-id='+id+']').find('.side').removeClass('outBack').addClass('in');
				}, 0);
			}

			if (active_id > id){
				setTimeout(function(){
					$('#fullpage div[data-id='+active_id+']').find('.side').removeClass('in').addClass('outBack');
				}, 0)	
				setTimeout(function(){
					$('#fullpage div[data-id='+id+']').find('.side').removeClass('out').addClass('in');
				}, 0);
			}

			//TODO переключение табов с половинками на фулл
			if ($('#fullpage div[data-id='+active_id+'] .side').parent().next().find('.fullside').length || $('#fullpage div[data-id='+active_id+'] .side').parent().prev().find('.fullside').length){

				$('#fullpage div[data-id='+active_id+']').css('z-index', 2);
				$('#fullpage div[data-id='+active_id+'] .side').parent().next().find('.fullside').addClass('noTransIn');
				setTimeout(function(){
					$('#fullpage div[data-id='+active_id+'] .side').parent().next().find('.fullside').removeClass('noTransIn').addClass('fullInNext');
				}, 1000);
			} else {
				$('#fullpage div[data-id='+active_id+']').css('z-index', 'auto');
				$('#fullpage div').removeClass('noTransIn');
			}

			// TODO переключение табов с фулл на фулл
		 	if (active_id < id){
		 		if ($('#fullpage div[data-id='+id+']').find('.fullside').length){
		 			setTimeout(function(){
						$('#fullpage div[data-id='+active_id+']').find('.fullside').removeClass('fullInNext').addClass('fullOutNext');
		 			}, 0);
					setTimeout(function(){
						$('#fullpage div[data-id='+id+']').find('.fullside').removeClass('fullOutPrev').addClass('fullInNext');
					}, 0);
		 		}
		 	}
		 	if (active_id > id){
		 		if ($('#fullpage div[data-id='+id+']').find('.fullside').length){
		 			setTimeout(function(){
						$('#fullpage div[data-id='+active_id+']').find('.fullside').removeClass('fullInNext').addClass('fullOutPrev');
		 			}, 0);
					setTimeout(function(){
						$('#fullpage div[data-id='+id+']').find('.fullside').removeClass('fullOutNext').addClass('fullInNext');
					}, 0);
		 		}
		 	}
		}

	});

	// ховер на элемент навигатора 

/*	$('#navigator li').hover(function(){
		switchWhere($(this));
	});*/

	// Карусель
	var owl = $('.owl-carousel');
	owl.owlCarousel({
	    loop:true,
	    margin:0,
	    nav:false,
	    responsive:{
	        0:{
	            items:1
	        },
	        600:{
	            items:3
	        },
	        1000:{
	            items:3
	        }
	    }
	});

	$('.left').click(function(e) {
		e.preventDefault();
	    owl.trigger('prev.owl.carousel');
	});

	$('.right').click(function(e) {
		e.preventDefault();
	    owl.trigger('next.owl.carousel');
	});

	// всплывахи

	$('.menu').click(function(){
		$(this).toggleClass('active');
		if ($(this).hasClass('active')){
			$('#menu').stop().fadeIn(350);
		} else {
			$('#menu').stop().fadeOut(350);
		}
		return false;
	});

	$('.header-btn').click(function(){
		$('#faq').stop().fadeIn(350);
		return false;
	});

	$('#faq .close').click(function(){
		$('#faq').stop().fadeOut(350);
		return false;
	});

});

var lastAnimation = 0;
function init_scroll(event, delta) {
   var deltaOfInterest = delta,
	   timeNow = new Date().getTime(),
	   quietPeriod = 500;
   
	// Cancel scroll if currently animating or within quiet period
   if(timeNow - lastAnimation < quietPeriod + 500) {
      event.preventDefault();
      return;
   }

   if (deltaOfInterest < 0) {
      moveDown();
   } else {
      moveUp();
   }
   lastAnimation = timeNow;
}

function checkWhite(elem){
	if (elem.find('.side').length > 0){
		if (elem.find('.side').css('background-color').toLowerCase() == 'rgba(0, 0, 0, 0)'){
			$('.header-btn, .menu, #navigator').addClass('onWhite');
		} else {
			$('.header-btn, .menu, #navigator').removeClass('onWhite');
		}
	} else {
		$('.header-btn, .menu, #navigator').removeClass('onWhite');
	}
	
}

function switchWhere(elem){
	var string = elem.data('where');
	$('.where').stop().fadeOut(300, function(){
		$('.where').empty().text(string).stop().fadeIn(300);
	});
}

function moveDown(){

	var active_id = $('#navigator li.active').data('id');
	var next_id = active_id + 1; 

	if ($('#navigator li[data-id='+next_id+']').length > 0){
		$('#navigator li[data-id='+next_id+']').click();
	}

}

function moveUp(){

	var active_id = $('#navigator li.active').data('id');
	var prev_id = active_id - 1; 

	if ($('#navigator li[data-id='+prev_id+']').length > 0){
		$('#navigator li[data-id='+prev_id+']').click();
	}

}