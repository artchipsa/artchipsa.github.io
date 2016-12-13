$(document).ready(function(){
	// Появление элементов на главном экране
	setTimeout(function(){
		$('header, .main-text, .scroll-down, #navigator').addClass('load');
	}, 3300)

	setTimeout(function(){
		$('.preloader').fadeOut(250);
	}, 3000)

	//определяем направление скролла
	if ($('body').hasClass('fullscroll')){
		$(document).bind('mousewheel DOMMouseScroll', function(event) {
			var delta = event.originalEvent.wheelDelta || -event.originalEvent.detail;
			var currentWidth = checkWidth();
			if (currentWidth > 1024){
				event.preventDefault();
				init_scroll(event, delta);
			}  
		});
	}
	
	// убираем и добавляем элементу боди дефолтный скролл
	var bodyWidth = checkWidth();
	if ($('body').hasClass('fullscroll')){
		if (bodyWidth > 1025){
			$('body').addClass('pagescroll');
		} else {
			$('body').removeClass('pagescroll');
		}
	}
	$(window).resize(function(){
		bodyWidth = $(this).width();
		if ($('body').hasClass('fullscroll')){
			if (bodyWidth > 1025){
				$('body').addClass('pagescroll');
			} else {
				$('body').removeClass('pagescroll');
			}
		}
	});
	
	// // TODO такой же скролл на ипедах.
	// document.addEventListener('touchmove', function(event) {
	// 	event.preventDefault();
	//    	var currentY = event.originalEvent.touches[0].clientY;
	//    	init_scroll(event, currentY);
	// }, false);

	//перекючение слайда

	//изменение цвета элементов хеадера, когада они заходят на блоки с белым бэкграундом
	switchWhere($('#navigator li[data-id="0"]'));

	//Постраничный скролл МОЙ КОД МОИ КОСТЫЛИ, ЙОУ
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

	var owl = $('.main-carousel');
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

	$('.sertificates').lightGallery({
		selector: '.pic'
	});

	// сертификаты

	var owl2 = $('.sertificates');
	owl2.owlCarousel({
	    loop:false,
	    margin:100,
	    nav:false,
	    responsive:{
	        0:{
	            items:1
	        },
	        600:{
	            items:3
	        },
	        1000:{
	            items:4
	        }
	    }
	});

	$('.left.serts').click(function(e) {
		e.preventDefault();
	    owl2.trigger('prev.owl.carousel');
	});

	$('.right.serts').click(function(e) {
		e.preventDefault();
	    owl2.trigger('next.owl.carousel');
	});

	// партнеры

	var partner1 = $('.partner1');
	partner1.owlCarousel({
	    loop:false,
	    margin:100,
	    nav:false,
	    responsive:{
	        0:{
	            items:1
	        },
	        600:{
	            items:3
	        },
	        1000:{
	            items:4
	        }
	    }
	});
	$('.left.arrow-partner1').click(function(e) {
		e.preventDefault();
	    partner1.trigger('prev.owl.carousel');
	});

	$('.right.arrow-partner1').click(function(e) {
		e.preventDefault();
	    partner1.trigger('next.owl.carousel');
	});
	var partner2 = $('.partner2');
	partner2.owlCarousel({
	    loop:false,
	    margin:100,
	    nav:false,
	    responsive:{
	        0:{
	            items:1
	        },
	        600:{
	            items:3
	        },
	        1000:{
	            items:4
	        }
	    }
	});
	$('.left.arrow-partner2').click(function(e) {
		e.preventDefault();
	    partner2.trigger('prev.owl.carousel');
	});

	$('.right.arrow-partner2').click(function(e) {
		e.preventDefault();
	    partner2.trigger('next.owl.carousel');
	});
	var partner3 = $('.partner3');
	partner3.owlCarousel({
	    loop:false,
	    margin:100,
	    nav:false,
	    responsive:{
	        0:{
	            items:1
	        },
	        600:{
	            items:3
	        },
	        1000:{
	            items:4
	        }
	    }
	});
	$('.left.arrow-partner3').click(function(e) {
		e.preventDefault();
	    partner3.trigger('prev.owl.carousel');
	});

	$('.right.arrow-partner3').click(function(e) {
		e.preventDefault();
	    partner3.trigger('next.owl.carousel');
	});

	// всплывахи

	$('.menu').click(function(){
		$(this).toggleClass('active');
		if ($(this).hasClass('active')){
			$('#menu').fadeIn(350);
			setTimeout(function(){
				$('.fade').stop().addClass('in');
				$('#menu .side').stop().addClass('menu-in');
			}, 250)
		} else {
			$('.fade').stop().removeClass('in');
			$('#menu .side').stop().removeClass('menu-in');
			// setTimeout(function(){
				$('#menu').stop().fadeOut(350);
/*			}, 1300);*/
		}
		return false;
	});

	$('.header-btn, .quest').click(function(){
		$('.faq').stop().fadeIn(350);
		setTimeout(function(){
			$('.anim').addClass('in');
		}, 350)
		return false;
	});

	$('.white-modal .close').click(function(){
		$('.white-modal').stop().fadeOut(350);
		$('.anim').removeClass('in');
		return false;
	});

	$('.trainer-cont .btn').click(function(){
		$('.record').stop().fadeIn(350);
		setTimeout(function(){
			$('.anim').addClass('in');
		}, 350)
		return false;
	});

	// отправка белой модалки 

	$('.white-modal form').submit(function(){
		var form = $(this);
		var error = false;

		if (form.find('input[type="text"]').val() == ''){
			form.find('input[type="text"]').css('border-bottom-color', 'red');
			error = true;
		}

		if (!error){
			// Ajax как тебе удобно

			// событие саксеса
			form.fadeOut(300, function(){
				$('.success').fadeIn(300);
			});
		}

		return false;
	});

	// панорама на страничке клуба
	$('.cycle').cyclotron({continuous:0,dampingFactor:1,autorotation:1});



	// смена цвета хедера при скролле
	var section = [];
	$('.section').each(function(){
		var self = $(this)
		section.push(self);
	});

	$(window).scroll(function(){
		var st = $('header').offset().top;
		var sb = 0; 
		for (var i = 0; i < section.length; i++){
			sb = sb + section[i].height();
			if (st > section[i].offset().top && st <= sb){ 
				if  (section[i].css('background-color').toLowerCase() == 'rgb(255, 255, 255)') {
					$('.header-btn, .menu, .st0').addClass('onWhite');
				} else {
					$('.header-btn, .menu, .st0').removeClass('onWhite');
				}
			}
		}

	});

	// синие табы с линией
	setTimeout(function(){
		$('.blue-tabs-content .cont').css('display', 'none');
	}, 100);
	

	$('.blue-tabs a').click(function(e){
		e.preventDefault();
		var id = $(this).data('id');
		var active_id =  $('.blue-tabs a.active').data('id');
		if ($('.blue-tabs').hasClass('lefty')){
			var right = $(this).parent().width() - $(this).outerWidth();
			if ($(this).hasClass('active')){
				return;
			} else {
				$('.blue-tabs a').removeClass('active');
				$(this).addClass('active');
				$('.blue-line').css('right', right);
				if (id == 1){
					$('.blue-line').css('right', 0);
				}
				$('.tabs-content .trainer').fadeOut(300).removeClass('active-in');
				setTimeout(function(){
					$('.tabs-content div[data-id='+id+']').fadeIn(300).addClass('active-in');
				}, 300);
			}
		} else {
			var left = $(this).position().left;
			if ($(this).hasClass('active')){
				return;
			} else {
				$('.blue-tabs a').removeClass('active');
				$(this).addClass('active');
				$('.blue-line').css('left', left);
				$('.blue-tabs-content .cont').fadeOut(300).removeClass('active');
				var arrows_id = id + 1; 
				$('.left, .right').removeClass('arrow-partner'+(active_id+1)).addClass('arrow-partner'+arrows_id);
				setTimeout(function(){
					$('.blue-tabs-content div[data-id='+id+']').fadeIn(300).addClass('active');
				}, 450);
			}
		}
	});

	// показывание контента в партнерах

	$('.partner').click(function(e){
		e.preventDefault();
		var self = $(this);
		$('.partner-info').fadeOut(250)
		$(self).next().fadeIn(250);
	});

	// фильтрация статей

	var grid = $('.grid').isotope({
		itemSelector: '.item',
		layoutMode: 'fitRows'
	});

	$(document).on('click', '.filter', function(){
		var filterValue = $(this).data("filter");
	  	grid.isotope({ filter: filterValue });
	  	$('.filter').removeClass('is-cheked');
	  	$(this).addClass('is-cheked');
	  	return false;
	});

	// слайдер тренеров

	$('.half-slider').click(function(){

		var active_img = $(this).parents('.trainer-slider-section').find('.img-container div.active');
		var active_content = $(this).parents('.trainer-slider-section').find('.trainer-cont.active');
		var active_id = active_img.data('trener');
		var next_id = active_id + 1;
		var prev_id = active_id - 1;

		if ($(this).hasClass('right')){
			if (active_img.next('.trainer-img').length){
				active_img.fadeOut(300, function(){
					active_img.removeClass('active');
					active_img.next().fadeIn(300).addClass('active');
				});
				active_content.fadeOut(300, function(){
					active_content.removeClass('active');
					active_content.next().fadeIn(300).addClass('active');
				});
			}
		}

		if ($(this).hasClass('left')){
			if (active_img.prev('.trainer-img').length){
				active_img.fadeOut(300, function(){
					active_img.removeClass('active');
					active_img.prev().fadeIn(300).addClass('active');
				});
				active_content.fadeOut(300, function(){
					active_content.removeClass('active');
					active_content.prev().fadeIn(300).addClass('active');
				});
			}
		}

	});

	checkWhite($('.text'));

	$(".scrolled").mCustomScrollbar({
		scrollbarPosition: 'outside', 
		autoDraggerLength: false
	});


	// контакты
	if ($('#map').length){
		initMap();
	}


	//scroll animation

	$(window).scroll(function(){
		var st = $(this).scrollTop();
		scrollAnimation(st);
	});

});

function scrollAnimation(st){
	var scroll_elems = [];
	$('.scrollAnim').each(function(){
		scroll_elems.push($(this));
	});
	for (var i = 0; i < scroll_elems.length; i++){
		if (st >= scroll_elems[i].parents('.section').offset().top){
			scroll_elems[i].addClass('in');
		}
	}

}


var map;
var marker;
function initMap(){
	var balance = {lat: 56.019911, lng: 92.83868600000005};
	var style = [
	    {
	        "featureType": "all",
	        "elementType": "labels.text.fill",
	        "stylers": [
	            {
	                "saturation": 40
	            },
	            {
	                "color": "#000000"
	            },
	            {
	                "lightness": 60
	            }
	        ]
	    },
	    {
	        "featureType": "all",
	        "elementType": "labels.text.stroke",
	        "stylers": [
	            {
	                "visibility": "on"
	            },
	            {
	                "color": "#17212e"
	            },
	            {
	                "lightness": 1
	            }
	        ]
	    },
	    {
	        "featureType": "all",
	        "elementType": "labels.icon",
	        "stylers": [
	            {
	                "visibility": "off"
	            }
	        ]
	    },
	    {
	        "featureType": "administrative",
	        "elementType": "geometry.fill",
	        "stylers": [
	            {
	                "color": "#000000"
	            },
	            {
	                "lightness": 20
	            }
	        ]
	    },
	    {
	        "featureType": "administrative",
	        "elementType": "geometry.stroke",
	        "stylers": [
	            {
	                "color": "#000000"
	            },
	            {
	                "lightness": 17
	            },
	            {
	                "weight": 1.2
	            }
	        ]
	    },
	    {
	        "featureType": "landscape",
	        "elementType": "geometry",
	        "stylers": [
	        	{
	                "saturation": 1
	            },
	            {
	                "color": "#2b3542"
	            },
	            {
	                "lightness": 1
	            }
	        ]
	    },
	    {
	        "featureType": "landscape.natural.landcover",
	        "elementType": "geometry",
	        "stylers": [
	            {
	                "visibility": "off"
	            }
	        ]
	    },
	    {
	        "featureType": "poi",
	        "elementType": "geometry",
	        "stylers": [
	            {
	                "color": "#2b3542"
	            },
	            {
	                "lightness": 1
	            }
	        ]
	    },
	    {
	        "featureType": "road.highway",
	        "elementType": "geometry.fill",
	        "stylers": [
	            {
	                "color": "#17212e"
	            },
	            {
	                "lightness": 1
	            }
	        ]
	    },
	    {
	        "featureType": "road.highway",
	        "elementType": "geometry.stroke",
	        "stylers": [
	            {
	                "color": "#26303d"
	            },
	            {
	                "lightness": 1
	            },
	            {
	                "weight": 0.2
	            }
	        ]
	    },
	    {
	        "featureType": "road.arterial",
	        "elementType": "geometry",
	        "stylers": [
	            {
	                "color": "#26303d"
	            },
	            {
	                "lightness": 1
	            }
	        ]
	    },
	    {
	        "featureType": "road.local",
	        "elementType": "geometry",
	        "stylers": [
	            {
	                "color": "#202a37"
	            },
	            {
	                "lightness": 1
	            }
	        ]
	    },
	    {
	        "featureType": "transit",
	        "elementType": "geometry",
	        "stylers": [
	            {
	                "color": "#26303d"
	            },
	            {
	                "lightness": 1
	            }
	        ]
	    },
	    {
	        "featureType": "water",
	        "elementType": "geometry",
	        "stylers": [
	            {
	                "color": "#17212e"
	            },
	            {
	                "lightness": 1
	            }
	        ]
	    }
	];

	var icon = {
		url: 'http://blog.chipsa.ru/temp/marker.png',
		origin: new google.maps.Point(0, 0),
	    anchor: new google.maps.Point(32.5, 32.5)
	};
	map = new google.maps.Map(document.getElementById('map'), {
	    zoom: 15,
	    center: {lat: 56.01824396548129, lng: 92.82528568376165},
	    styles: style
	});

	marker = new google.maps.Marker({
		position: balance,
		map: map, 
		icon: icon,
		optimized: false
	});


}

function checkWidth(){
	var retval = $(window).width(); 
	$(window).resize(function(){
		retval = $(this).width();
	});
	return retval;
}

var lastAnimation = 0;
function init_scroll(event, delta) {
   var deltaOfInterest = delta,
	   timeNow = new Date().getTime(),
	   quietPeriod = 500;
   
	// Cancel scroll if currently animating or within quiet period
   if(timeNow - lastAnimation < quietPeriod + 555) {
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