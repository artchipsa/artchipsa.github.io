'use strict';
//Variables 

var points = [
    {
        start: 0,
        end: 4500
    },
    {
        start: 4550, 
        end: 8900
    }, 
    {
        start: 9000,
        end: 13500
    }, 
    {
        start: 13550, 
        end: 26500
    }
];


$(document).ready(function(){
	//feature hover
/*	$('.keyfeatures-block .item').hover(function(){
		$(this).addClass('hovered');
		$('.keyfeatures-block .item').addClass('another-hovered');
	}, function(){
		$(this).removeClass('hovered')
		$('.keyfeatures-block .item').removeClass('another-hovered');
	});*/

	

	// Smooth scroll

	$(function(){	
        var $window = $(window);
		var scrollTime = 0.5;
		var scrollDistance = 500;

		$window.on("mousewheel DOMMouseScroll", function(event){

			event.preventDefault();	

			if ($(window).scrollTop() < 26999 && $('.divvideo').length){
				scrollTime = 0.5;
				scrollDistance = 500;
			} else {
				scrollTime = 0;
				scrollDistance = 100;
			}


			var delta = event.originalEvent.wheelDelta/120 || -event.originalEvent.detail/3;
			var scrollTop = $window.scrollTop();
			var finalScroll = scrollTop - parseInt(delta*scrollDistance);

			TweenMax.to($window, scrollTime, {
				scrollTo : { y: finalScroll, autoKill:true },
					ease: Power1.easeOut,
					overwrite: 5							
				});

		});
	});



	// Paginator js 
	// высчитывание отступов 
	$('.new-controlls li').each(function(){
	    var center_point = $(this).height();
	    $(this).find('.section-number').css({ marginTop: (center_point - $(this).find('.section-number').height())/2 });
	    $(this).find('.section-name').css({ marginTop: (center_point - $(this).find('.section-name').height())/2, marginLeft: -($(this).find('.section-name').width() + 15) }); 
	});

	// Ховер и анимейт 
	$('.li-cont').hover(function(){
	    if ($(this).hasClass('active')){
	        return 0;
	    } else {
	        $(this).find('.section-number').removeClass('fadeOut').addClass('fadeIn');
	        $(this).find('.section-name').removeClass('fadeOut').addClass('fadeIn');
	    }
	}, function(){
	    if ($(this).hasClass('active')){
	        return 0;
	    } else {
	        $(this).find('.section-number').removeClass('fadeIn').addClass('fadeOut');
	        $(this).find('.section-name').removeClass('fadeIn').addClass('fadeOut');
	    }
	});        


	// переход к определенному поинту
	$(document).on('click', '.li-cont', function(){
	    var point = $(this).data('id');
	    var scrollTo = points[point].start;
	    $("html, body").animate({ scrollTop: scrollTo });
	});

	//ставим первый слайд активным 

	$('.p0').addClass('active');
	$('.p0 .section-number').removeClass('fadeOut').addClass('fadeIn');
	$('.p0 .section-name').removeClass('fadeOut').addClass('fadeIn');

	var curSt = $(window).scrollTop();
	if ($('.main-content').length){
		var intro_end = $('.main-content').position().top;
	}
	mouseDown(curSt);
    headerChange(curSt);

	// магия скролла 
	$(window).scroll(function(){
	    var self = this;

	    // Scrolltop variable
	    var st = $(self).scrollTop();

	    //Анимашки технического задания 
	    if ($('.tech-task').length){
		    var tech_block = ($('.tech-task').position().top/1.5) + 27000;
		    var tech = $('.tech').position().top;
		    var blueprint = $('.blueprint').position().top;

		    if (st > tech_block){
		    	$('.tech').addClass('in');
		    }

		    if(st > tech_block){
		    	setTimeout(function(){
		    		$('.blueprint').addClass('in');
		    	}, 1000);
		    }
	    }

	    //анимашки новостей
	    if ($('.divvideo').length){
	    	var news_block = ($('.news-block').position().top/1.5) + 27000;
	    } else {
	    	var news_block = ($('.news-block').position().top/1.1);
	    }
	    

	    if (st > news_block){
	    	var time = 0;
    		$('.slidee li').each(function(){
				oneByOneFade($(this), time);
				time = time + 150;
			});
	    }

	    // анимашки состава

	    if($('.consist-block').length){
	    	var time = 0;
	    	$('.consist-block .item').each(function(){
	    		if (st > ($(this).offset().top/1.7)){
	    			oneByOneFade($(this), time)
	    			time = time + 150;
	    		}
	    	});
	    }


	    mouseDown(st);
	    headerChange(st);
	    scrollPaginator(st, 0, points[0].start, points[0].end);
	    scrollPaginator(st, 1, points[1].start, points[1].end);
	    scrollPaginator(st, 2, points[2].start, points[2].end);
	    scrollPaginator(st, 3, points[3].start, points[3].end);
	});


	//custom tabs


	$(document).on('click', '.turn-head a', function(e){
		e.preventDefault();

		var self = this;
		var left = $(self).position().left;
		var add_left = $(self).width()/2;
		var handler_left = left + add_left - ($('.turn-head .handler').outerWidth()/2);
		var id = $(self).data('id');
		$('.turn-head .handler').stop().animate({ left: handler_left});

		if ($(self).hasClass('active')){
			e.preventDefault();
		} else {
			$('.turn-head a').removeClass('active');
			$(self).addClass('active');

			// убираем предыдущий таб
			$('.turn-tab .turn-content').removeClass('zoomIn').addClass('fadeOutLeft');
			$('.turn-tab .turn-img').removeClass('zoomIn').addClass('fadeOutRight');
			$('.turn-tab').removeClass('fadeIn').addClass('fadeOut');

			setTimeout(function(){
				$('.turn-tab').removeClass('active');
			}, 350);

			// показываем новый таб 
			setTimeout(function(){
				$('.turn-tab.tab'+id).addClass('active fadeIn');
				$('.turn-tab.tab'+id+' .turn-content').removeClass('fadeOutLeft').addClass('zoomIn');
				$('.turn-tab.tab'+id+' .turn-img').removeClass('fadeOutRight').addClass('zoomIn');
			}, 350);
		}
	});


	if ($('.turn-head a').length){
		$('.turn-head .handler').css({left: $('.turn-head a[data-id="1"]').position().left + ($('.turn-head a[data-id="1"]').width()/2) - ($('.turn-head .handler').outerWidth()/2) })
	}
	// mobile tabs 

	$('.turn-body').on('swipeleft', function(){
		console.log('1');
		var active_link = $('.mobile.active');
		var active_id = active_link.data('id');
		if (active_id == 6){
			$('a[data-id="1"]').click();
		} else {
			var next = active_id + 1;
			$('a[data-id="'+next+'"]').click();
		}
	});

	$('.turn-body').on('swiperight', function(){
		var active_link = $('.mobile.active');
		var active_id = active_link.data('id');
		console.log('active_id', active_id);
		if (active_id == 1){
			$('a[data-id="6"]').click();
		} else {
			var next = active_id - 1;
			$('a[data-id="'+next+'"]').click();
		}
	});


	// news-block
	var frame = $('#frame');
	var sly = new Sly(frame, {
		horizontal: 1,
      	itemNav: 'basic',
      	activateMiddle: 1,
      	smart: 1,
      	activateOn: 'click',
		mouseDragging: 1,
		touchDragging: 1,
		releaseSwing: 1,
		scrollBar: $('.scrollbar'),
		speed: 300,
		elasticBounds: 1,
		dragHandle: 1,
		dynamicHandle: false,
		clickBar: 1
	}).init();


	// map

	if ($('#map').length > 0){
		initMap();
	}


	//menu 

	$('.menu').click(function(){
		var cs = $(window).scrollTop();
		var w = $(window).width();
		$(this).toggleClass('no-active active');
		if($(this).hasClass('active')){
			$('.main-menu').addClass('open');
			if (cs => intro_end){
				$('.menu .burger-bar').css({backgroundColor: '#fff'});
				$('.logo, .logo-text').show();
			}
			if (w < 1025){
				$('.logo-text').show();
				$('.menu .burger-bar').css({backgroundColor: '#fff'});
			}
		} else {
			$('.main-menu').removeClass('open');
			if (cs > intro_end){
				console.log(cs);
				$('.menu .burger-bar').css({backgroundColor: '#000'});
				$('.logo, .logo-text').hide();
			}
			if (w < 1025){
				$('.logo-text').hide();
				$('.menu .burger-bar').css({backgroundColor: '#000'});
			}
		}
	});


	$('body').on('mousewheel', function(e){
		if ($('.menu').hasClass('active')){
			e.preventDefault();
			e.stopPropagation();
		} else {
			return;
		}
	});

	if ($('.cardsequence').length){
		var card_top = $('.cardsequence').offset().top;
		var card_bottom = $('body').height() - $('.news-block').offset().top + 95;
		$('.cardsequence').width($('.cardsequence').parent().width());
		$(window).resize(function(){
			$('.cardsequence').width($('.cardsequence').parent().width());
		})
	}
	if ($(window).width() > 1023){
		$('.cardsequence').affix({
		  offset: {
		    top: card_top,
		    bottom: card_bottom
		  }
		});
	}

});


function oneByOneFade(elem, time){
	setTimeout(function(){
		elem.addClass('in');
	}, time);
}

function scrollPaginator(st, point, start, end){
    if (st > start && st < end){
        $('.p'+point).addClass('active');
        $('.p'+point+' .section-number').removeClass('fadeOut').addClass('fadeIn');
        $('.p'+point+' .section-name').removeClass('fadeOut').addClass('fadeIn');
        var step = calcStep(st, points[point].end);
        $('.p'+point+' .fill').stop().animate({height: step + '%'}, 200);
        if ($(window).width() > 1025){
        	if ($('.m'+point).css('display') == 'block'){
        		return;
        	} else {
        		$('.m'+point).css("display", "block").removeClass('fadeOutUp').addClass('fadeInUp');
        	}
        }
    } else {
        $('.p'+point).removeClass('active');
        $('.p'+point+' .section-number').removeClass('fadeIn').addClass('fadeOut');
        $('.p'+point+' .section-name').removeClass('fadeIn').addClass('fadeOut');
        if ($(window).width() > 1025){
        	$('.m'+point).removeClass('fadeInUp').addClass('fadeOutUp');
        	setTimeout(function(){
        		$('.m'+point).css('display', 'none');
        	}, 500)
        }
    }
}

function calcStep(st, end){
    return (st*100)/end;
}

function headerChange(st){
	if ($(window).width() > 1025){
	 	if (st > 26500 && $('.menu').hasClass('no-active')){
	        $('.logo').fadeOut();
        	$('.logo-text').fadeOut();
        	$('.burger-bar').css('background-color', '#000');
	    } else {
	        $('.logo').fadeIn();
        	$('.logo-text').fadeIn();
        	$('.burger-bar').css('background-color', '#fff');
	    }		
	} else {
		if (st > 730) {
	        $('.logo').fadeOut();	
		} else {
			$('.logo').fadeIn();
		}
	}
}

function mouseDown(st){
	if (st > 0 && $(window).width() > 1025){
        $('.mouse').fadeOut(350);
    } else {
        $('.mouse').fadeIn(350);
    }
}

function centerMap(mobile, desktop){
	if ($(window).width() > 666){
		return desktop;
	} else {
		return mobile;
	}
}

var map;
function initMap () {
	var avaks = {lat: 56.0008212, lng: 92.93558389999998};
	var mobile_center = {lat: 56.00006632526723, lng: 92.9359272227539};
	var center = {lat: 55.997405839864314, lng: 92.97755510666504};
	var style_options = [{"featureType":"all","elementType":"geometry.fill","stylers":[{"weight":"2.00"}]},{"featureType":"all","elementType":"geometry.stroke","stylers":[{"color":"#9c9c9c"}]},{"featureType":"all","elementType":"labels.text","stylers":[{"visibility":"on"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"landscape.man_made","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#eeeeee"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#7b7b7b"}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#46bcec"},{"visibility":"on"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#c8d7d4"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#070707"}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"}]}]
	map = new google.maps.Map(document.getElementById('map'),{
		zoom: 13,
		center: centerMap(mobile_center, center),
		styles: style_options,
		scrollwheel: false
	});

	var contentString = 
	"<div class='map-marker'>"+
		"<div class='map-image'>"+
			"<img src='img/map.jpg'></img>"+	
		"</div>"+
		"<div class='map-content'>"+
			"<span>Адрес:</span>"+
			"<p>660025, Россия, г. Красноярск, пер.<br> Вузовский. д.3, каб. 223.</p>"+
		"</div>"+
	"</div>";

	var infowindow = new google.maps.InfoWindow({
	    content: contentString
  	});

	var marker = new google.maps.Marker({
		position: avaks,
		map: map
	});

	if ($(window).width() > 666){
		infowindow.open(map, marker);
	}

	google.maps.event.addListener(infowindow, 'domready', function() {
		var iwOuter = $('.gm-style-iw');
		var iwBackground = iwOuter.prev();
		var mapImg  = $('.map-image img');
		var mapContent = $('.map-content');
		iwBackground.css('display', 'none');
		iwOuter.css({top: 245, left: 158});
		mapContent.css({marginLeft: mapImg.width()});
	});

}

