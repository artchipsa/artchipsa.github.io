'use strict';

$(document).ready(function(){
	// Появление элементов на главном экране
	setTimeout(function(){
		$('header, .main-text h1, .main-text p, .scroll-down, #navigator').addClass('load');
	}, 1750)


	setTimeout(function(){
		$('.preloader').fadeOut(250);
	}, 1500)

	//определяем направление скролла
	if ($('body').hasClass('fullscroll')){
		$(document).bind('mousewheel DOMMouseScroll', function(event) {
			var delta = event.originalEvent.wheelDelta || -event.originalEvent.detail;
			var currentWidth = checkWidth();
			if (currentWidth > 1023){
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
/*	document.body.addEventListener('touchmove',function(e){
	    e.preventDefault();
	});
	document.addEventListener('touchend', function(event) {
		//event.preventDefault();
	   	var currentY = event.changedTouches[0].clientY;
	   	init_scroll(event, currentY);
	}, false);
*/


	

	if (!$('#fullpage').hasClass('no-fullpage')){
		var mobile = document.getElementById('fullpage');
		var touch = new Hammer(mobile, {
			domEvents: true
		});


		touch.on("panend", function(ev) {
			if (ev.pointerType === 'mouse'){
				return; 
			} else {
				if (ev.direction === 8){
					moveDown();
				}

				if (ev.direction === 16){
					moveUp();
				}
			}
		});

		$(window).resize(function(){
			if ($(window).width() > 800){
				touch.get('pan').set({ direction: Hammer.DIRECTION_ALL });
			} else {
				touch.get('pan').set({ direction: Hammer.DIRECTION_HORIZONTAL  });
			}
		});


		if ($(window).width() > 800){
			touch.get('pan').set({ direction: Hammer.DIRECTION_ALL });
		} else {
			touch.get('pan').set({ direction: Hammer.DIRECTION_HORIZONTAL  });
		}
	}

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
					$('#fullpage div[data-id='+id+']').find('.side').removeClass('out').removeClass('outBack').addClass('in').addClass('touched');
				}, 0);
			}

			if (active_id > id){
				if (!$('#fullpage div[data-id='+id+']').find('.side').hasClass('touched')){
					$('#fullpage div[data-id='+id+']').find('.side').addClass('out');
				}
				setTimeout(function(){
					$('#fullpage div[data-id='+active_id+']').find('.side').removeClass('in').addClass('outBack');
				}, 0)	
				setTimeout(function(){
					$('#fullpage div[data-id='+id+']').find('.side').removeClass('outBack').removeClass('out').addClass('in').addClass('touched');
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
				$('#fullpage div[data-id='+active_id+']').css('z-index', 0);
				$('#fullpage div').removeClass('noTransIn');
			}

			if ($('#fullpage div[data-id='+active_id+'] .fullside').parent().prev().find('.side').length){
				$('#fullpage div[data-id='+active_id+'] .fullside').parent().prev().css('z-index', 2);
			} else {
				$('#fullpage div[data-id='+active_id+'] .fullside').parent().prev().css('z-index', 'auto');
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


/*	function returnNext(elem){
		if (elem.next().find())
	}*/

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

	$('.left.sert').click(function(e) {
		e.preventDefault();
	    owl2.trigger('prev.owl.carousel');
	});

	$('.right.sert').click(function(e) {
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
	            items:4,
	            margin: 50
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
	            items:4,
	            margin: 50
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
	            items:4,
	            margin: 50
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

	$(document).keyup(function(e){
		if ($('.menu').hasClass('active')){
			if (e.keyCode === 27){
				$('.menu').click();
			} 
		}

		if (e.keyCode === 27){
			$('.close').click();
		}
	});


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
		if ($('#menu').css('display') == 'block'){
			$('.menu').click();	
		}
		setTimeout(function(){
			$('.anim').addClass('in');
		}, 350)
		return false;
	});

	$('.white-modal .close').click(function(){
		$('.white-modal').stop().fadeOut(350);
		$('.anim').removeClass('in');
		$('.white-modal .success').fadeOut(200);
		$('.white-modal form input[type="text"]').val('');
		$('.white-modal form textarea').val('');
		$('.white-modal form input[type="checkbox"]').prop('checked', false);
		$('.white-modal form').fadeIn(200);
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

	$('.service-list input[type="checkbox"]').change(function(){
		$(this).addClass('changed')
		$('.service-list label').css('color', '#B5B8BE');
	});

	$('.white-modal form').submit(function(){
		var form = $(this);
		var error = false;

		if (form.find('input[type="text"]').val() == ''){
			form.find('input[type="text"]').css('border-bottom-color', 'red');
			error = true;
		}

		if (form.parents('.white-modal').hasClass('record')){
			if (!form.find('.changed').length >= 1){
				form.find('input[type="checkbox"]').next('label').css('color', 'red');
				error = true;
			}
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

	$(window).scroll(function(){
		headerColor();
	});

	// document.addEventListener('touchmove touchstart touchend', function(e){
	// 	headerColor();
	// });


	// синие табы с линией
	setTimeout(function(){
		$('.blue-tabs-content .cont').css('display', 'none');
	}, 100);
	


/*	var clone = $('.blue-tabs').clone();
	clone.css('visibility', 'hidden');
	$('.section.trainer-slider-section .side.white').append(clone);
	var width = clone.outerWidth();
	console.log('width', width);
	var left = clone.find('.active').position().left;
	console.log('left', left);
	var left_width = clone.find('.active').outerWidth();
	console.log('left_width', left_width);
*/
	$('.blue-tabs a').click(function(e){
		e.preventDefault();
		var id = $(this).data('id');
		var active_id =  $('.blue-tabs a.active').data('id');
		if ($('.blue-tabs').hasClass('lefty')){
			var right = $(this).parent().outerWidth() - ($(this).position().left + $(this).outerWidth());
			if ($(this).hasClass('active')){
				$('.blue-line').css('right', right);
				return;
			} else {
				$('.blue-tabs a').removeClass('active');
				$(this).addClass('active');
				$(this).parent().find('.blue-line').css('right', right);
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
		if ($(this).hasClass('active')){
			$(this).removeClass('active');
			$('.partner-info').fadeOut(250);
		} else {
			$('.partner').removeClass('active');
			$('.partner-info').fadeOut(250);
			$(this).next().fadeIn(250);
			$(this).addClass('active');
		}
	});

	$(document).on('click', '.group-filter button', function(){
		$('.group-filter button').removeClass('is-checked');
		$(this).addClass('is-checked');
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

	if ($(window).width() < 769){
		$('.scrolled').mCustomScrollbar('destroy');
	}
	$(window).resize(function(){
		if ($(this).width() < 769){
			$('.scrolled').mCustomScrollbar('destroy');
		} else {
			$(".scrolled").mCustomScrollbar({
				scrollbarPosition: 'outside', 
				autoDraggerLength: false
			});
		}
	});	


	// контакты
/*	var width = $(document).width();
	getCenter(width);*/

	if ($('#map').length){
		initMap();
	}


	//scroll animation

	$(window).scroll(function(){
		var st = $(this).scrollTop();
		scrollAnimation(st);
	});


	//video 


    $(function () {
        var outerDiv = $('.section.main');
        var videoTag = outerDiv.find('video');
        $(window).resize(resize);
        resize();
        function resize() {
            var width = outerDiv.width();
            var height = outerDiv.height();
            var aspectW = 16;
            var aspectH = 9;
            var scaleX = width / aspectW;
            var scaleY = height / aspectH;
            var scale = Math.max(scaleX, scaleY);
            var w = Math.ceil(aspectW * scale);
            var h = Math.ceil(aspectH * scale);
            var x = 0;
            var y = 0;
            if (w > width) x = -(w - width) * 0.5;
            if (h > height) y = -(h - height) * 0.5;
            videoTag.css({
                width: w,
                height: h,
                top: y,
                left: x
            });
        }
    });
    var grid = $('.grid');
	$('.more-articles').click(function(e){
		for (var i = 0; i < data.length; i++){
			var item = $('<div class="item '+data[i]["tag"]+'" style="background-image: url('+data[i]["img"]+')" onclick="">'+
						'<div class="overlay"></div>'+
						'<span class="tag">'+data[i]["tag_name"]+'</span>'+
						'<div class="item-content">'+
							'<p>'+data[i]["heading"]+'</p>'+
							'<a href="'+data[i]["url"]+'" class="btn">подробнее</a>'+
						'</div>'+
						'</div>');

			grid.append(item).isotope('appended', item);
		}

		return false;
	});

	// фильтрация статей
	grid.isotope({
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

});

var data = [
		{
			"tag": "eating",
			"tag_name": "Питание",
			"heading": "Таблица содержания белков, жиров, углеводов и калорий в продуктах питания",
			"url": "какой-то урл",
			"img": "img/i8.jpg"
		},
		{
			"tag": "diagnostic",
			"tag_name": "Диагностика",
			"heading": "Живете ли вы в стиле wellness? Всего 10 вопросов",
			"url": "какой-то урл",
			"img": "img/i7.jpg"
		},
		{
			"tag": "eating",
			"tag_name": "Питание",
			"heading": "Таблица содержания белков, жиров, углеводов и калорий в продуктах питания",
			"url": "какой-то урл",
			"img": "img/i8.jpg"
		}
	]

function moreItems(data){

}

function scrollAnimation(st){
	var scroll_elems = [];
	$('.scrollAnim').each(function(){
		scroll_elems.push($(this));
	});
	for (var i = 0; i < scroll_elems.length; i++){
		if (st >= (scroll_elems[i].parents('.section').offset().top - (scroll_elems[i].height()/1.5))){
			scroll_elems[i].addClass('in');
		}
	}

}
var section = [];
var side = [];
$('.section').each(function(){
	var self = $(this)
	section.push(self);
});
if ($(window).width() < 1025){
	$('.side').each(function(){
		side.push($(this));
	});
}

function headerColor(){
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
	var sd = 0;
	if ($(window).width() < 1025){
		for (var i = 0; i < side.length; i++){
			sd = sd + side[i].height();
			if (st > side[i].offset().top && st <= sd){
				if  (side[i].css('background-color').toLowerCase() == 'rgb(255, 255, 255)') {
					$('.header-btn, .menu, .st0').addClass('onWhite');
				} else {
					$('.header-btn, .menu, .st0').removeClass('onWhite');
				}
			}
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



	var center = getCenter($(window).width());

	var icon = {
		url: 'http://blog.chipsa.ru/temp/marker.png',
		origin: new google.maps.Point(0, 0),
	    anchor: new google.maps.Point(77.5, 77.5)
	};
	map = new google.maps.Map(document.getElementById('map'), {
	    zoom: 15,
	    center: center,
	    styles: style,
	    disableDefaultUI: true,
	    scrollwheel: false,
	});

	marker = new google.maps.Marker({
		position: balance,
		map: map, 
		icon: icon,
		optimized: false
	});


}

function getCenter(width){
	var big_center = {lat: 56.01824396548129, lng: 92.82528568376165};
	var small_center = {lat: 56.01967114335406, lng: 92.83861089814764};
	var middle_center = {lat: 56.0196231718452, lng: 92.82771040071111};
	if (width > 991){
		return big_center;
	} else if (width > 469 && width < 991) {
		return middle_center;
	} else {
		return small_center;
	}
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

	// if ()


	if(timeNow - lastAnimation < quietPeriod + 1000) {
		event.preventDefault();
	    return;
	}

   setTimeout(function(){
   		console.log('deltaOfInterest', deltaOfInterest);
		if (deltaOfInterest < 0) {
	      	moveDown();
	   	} else {
	      	moveUp();
	   	}
   }, 200)
   
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