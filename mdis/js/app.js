var content = $('#content-changer');
var history_length = window.history.length;
var state;
var url;
var urls = [];
var audio;
var error = false;

var doc = $(document);
$(document).ready(function(){

	// hover icons

	doc.on('mouseover', '.line-item', function(){

		var first_line = $(this).find('.line-visible');
		var second_line = $(this).find('.line-invisible');
		var second_right = $(this).width() - 50;
		
		// first line anim

		first_line.addClass('back');

		setTimeout(function(){
			first_line.addClass('forward');
		}, 450);


		setTimeout(function(){
			second_line.addClass('back');
			setTimeout(function(){
				second_line.addClass('forward')
			}, 450);
		}, 850);

	});

 	doc.on('mouseleave', '.line-item', function(){

		var first_line = $(this).find('.line-visible');
		var second_line = $(this).find('.line-invisible');
		var first_right = $(this).width() - 110;

		first_line.fadeOut(250);
		second_line.fadeOut(250);

		setTimeout(function(){
			first_line.removeClass('back forward').fadeIn();
			second_line.removeClass('back forward').fadeIn();
		}, 450);

		setTimeout(function(){
			first_line.removeClass('back forward');
			second_line.removeClass('back forward');
		}, 1315);

	});

	// menu hover 

	doc.on('mouseover', '#menu .section', function(){
		var line = $(this).parents('.menu-row').find('.line');
		line.addClass('hovered');
	});

	doc.on('mouseleave', '#menu .section', function(){
		var line = $(this).parents('.menu-row').find('.line');
		line.removeClass('hovered');
	});

	// menu modal

	doc.on('click', 'header a[data-modal]', function(e){
		e.preventDefault();
		var modal = $(this).data('modal');

		if ($(window).width() < 1370){
			$('#'+modal).mCustomScrollbar({
				scrollInertia: 155,
				theme: "dark-3",
				contentTouchScroll: false
			});
		}

		$('header .menu').toggleClass('active');

		if ($('header .menu').hasClass('active')){
			$('#'+modal).addClass('active');
			$('header').addClass('modal-active');
			$('#'+modal).mCustomScrollbar("update");
		} else {
			$('.modal').removeClass('active');
			$('header').removeClass('modal-active');
			$('#'+modal).mCustomScrollbar("destroy");
		}
	});

	doc.on('click', '#menu a', function(){
		$('header .menu').click();
	});

	$('body').on('mousewheel', function(e){
		if ($('.menu').hasClass('active')){
			e.preventDefault();
			e.stopPropagation();
		} else {
			return;
		}
	});

	doc.keyup(function(e){
		if ($('.menu').hasClass('active')){
			if (e.keyCode === 27){
				$('.menu').click();
			} 
		}
	});

 	photoTabs();

	doc.on('click', '.package-block .wave-tabs-head a', function(){


		var id = $(this).index('.wave-tabs-head a');
		var active_id = $('.wave-tabs-head .active a').index('.wave-tabs-head a')+1
		var li = $(this).parent();
		var tag = $(this).attr('href').replace(/^#/,'');
		var img = $('.wave-line img');
		var new_left = $(this).position().left;
		var active_animation_elem = $('.content-tab.active').find('.animation'); 
		var this_animation_elem = $('#'+tag).find('.animation');

		if (!li.hasClass('active')){
			$('.wave-tabs-head li').removeClass('active');
			li.addClass('active');
			img.animate({ left: new_left}, 250);


			if ($('.photo-tab-block').length){
				var left = window.outerWidth * id;
				$('.photo-tab-block').css({transform: 'translateX(-'+left+'px)'});
			}


			active_animation_elem.addClass('out');
			setTimeout(function(){
				$('.content-tab.active').fadeOut(100, function(){
					$('.content-tab.active').removeClass('active');
					$('.content-tab .animation').removeClass('in out');
				})
			}, 450);

			setTimeout(function(){

				$('#'+tag).addClass('active');
				setTimeout(function(){
					this_animation_elem.addClass('in');
				}, 5)
				
			}, 600);

		}
		return false;
	});

	doc.on('click', '.case-item .audio-block .controls', function(e){
		e.preventDefault();

		$(this).parents('.case-item').hover();

		if ($(this).hasClass('play')){
			$(this).parents('.audio-block').find('#audio').trigger('play');
			$(this).toggleClass('play pause')
			$('.play-pic').fadeOut(300, function(){
				$('.pause-pic').fadeIn(300);
			});
		} else {
			$(this).parents('.audio-block').find('#audio').trigger('pause');
			$(this).toggleClass('play pause')
			$('.pause-pic').fadeOut(300, function(){
				$('.play-pic').fadeIn(300);
			});
		}

		return false;

	});

	doc.on('click', '.switcher-block li', function(e){
		e.preventDefault();
		var id = $(this).index('.switcher-block li');
		if (!$(this).hasClass('active')){

			$('.switcher-block li').removeClass('active');
			$(this).addClass('active');

			$('.switcher-content .item').fadeOut(300)
			setTimeout(function(){
				$('.switcher-content .item').eq(id).fadeIn(300);
			}, 300)
		}
	});

	doc.on('click', '.switcher-modal-links a', function(e){
		e.preventDefault();

		var id = $(this).data("id");
		var video = $(this).parents('.item').find('.switch-modal-window.'+id);
		var slider = $(this).parents('.item').find('.switch-modal-window.'+id);

		if (id == "video"){
			$(this).text(function(i, text){
				return text === "смотреть видео" ? "закрыть видео" : "смотреть видео";
			});
			if ($(this).hasClass('active')){
				$(this).removeClass('active')
				video.fadeOut(350);
				video.find('iframe')[0].contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}','*');				
			} else {
				$(this).addClass('active');
				video.fadeIn(350);
				video.find('iframe')[0].contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}','*');
			}
		}

		if (id == 'photos'){
			$(this).text(function(i, text){
				return text === "смотреть фото" ? "закрыть фото" : "смотреть фото";
			});
			if ($(this).hasClass('active')){
				$(this).removeClass('active');
				slider.fadeOut(350);
			} else {
				$(this).addClass('active');
				slider.fadeIn(350);
				$('.owl-carousel.switch-photos').width($(window).width());
				switch_slider_photos.trigger('refresh.owl.carousel');
			}
		}

	});

	$(window).resize(function(){
		specialBlockPos();
	});

	doc.on('click', '#history-custom-dots a', function(){
		var id = $(this).data('id');
		var height;
		if ($(window).width() > 500){
			height = 434;
		} else {
			height = 185;
		}

		audio.empty();
		audio.destroy();
		$('.audio-block').removeClass('active');
		audio = WaveSurfer.create({
			container: '#audio' + id,
			barWidth: 2,
			height: height,
			cursorColor: 'transparent',
			maxCanvasWidth: 940,
			normalize: true,
			waveColor: "#ffa9b5",
			progressColor: '#E2112E',
			autoCenter: false
		});
	 	audio.load('sounds/history/'+id+'.mp3');
	 	audio.on('ready', function(){
	 		$('#audio'+id).addClass('active');
	 	})
	});


	doc.on('click', '.history-owl .play-button', function(){
		var self = $(this);
		$(this).toggleClass('play-state');
		audio.playPause();

		if (self.hasClass('play-state')){
			self.find('.pause').fadeOut(300, function(){
				self.find('.play').fadeIn(300);
			});
		} else {
			self.find('.play').fadeOut(300, function(){
				self.find('.pause').fadeIn(300);
			});
		}
	});

	doc.on('click', '.hidden-toggle', function(e){
		e.preventDefault();
		$(this).find('span').text(function(i, text){
			return text === "Читать дальше" ? "Свернуть" : "Читать дальше";
		});
		$(this).parents('.text-with-hidden-part').find('.hidden-part').stop().slideToggle(250);
		$(this).toggleClass('active');
		if ($(this).hasClass('active')){
			$(this).find('svg').css('transform', 'rotate(180deg)');
		} else {
			$(this).find('svg').css('transform', 'rotate(0deg)');
		}
	});

	doc.on('click', '.answer-toggler', function(e){
		e.preventDefault();
		$(this).find('.circle').toggleClass('open');
		$(this).parent().find('.answer').slideToggle(300);
	});

	doc.on('focus', '.input', function(){
		$(this).parent().addClass('focused');
	});

	doc.on('blur', '.input', function(){
		if ($(this).val() == ''){
			$(this).parent().removeClass('focused');
		}
	});

	doc.on('keyup', '.input', function(){
		if ($(this).hasClass('error')){
			$(this).removeClass('error');
		}
	})

	doc.on('submit', '.modal form', function(e){
		var form = $(this);

		form.find('.input').each(function(){
			checkFields($(this));
		});

		if (!error){
			ajaxForm(form)
		}

		return false;
	});

});

function ajaxForm(form){
	console.log(1);

	form.find('.form-row').fadeOut(300, function(){
		form.find('.success').fadeIn(300);
	});
}

function checkFields(field){
	if (field.val() == ''){
		field.addClass('error');
		error = true;
	} else {
		error = false;
	}
}

function audioWave(){
	var active_elem = $('#history-custom-dots .owl-dot.active a');
	var id = active_elem.data('id');
	var height;
	if ($(window).width() > 500){
		height = 434;
	} else {
		height = 185;
	}
 	audio = WaveSurfer.create({
		container: '#audio' + id,
		barWidth: 2,
		height: height,
		cursorColor: 'transparent',
		maxCanvasWidth: 960,
		normalize: true,
		waveColor: "#ffa9b5",
		progressColor: '#E2112E'
	});
 	audio.load('sounds/history/'+id+'.mp3');
 	audio.on('ready', function(){
 		$('#audio'+id).addClass('active');
 	})
}
function oneByOneFade(elem, time){
	setTimeout(function(){
		elem.addClass('in');
	}, time);
}
function specialBlockPos(){
	var special_width = $(window).width();
	$('.full').each(function(){
		$(this).width(special_width);
		$(this).offset({left: 0});
	});
}
function anchorsBlock(){
	var lastId,
		anchorMenu = $('.wave-tabs.anchors'),
		anchorMenuHeight = anchorMenu.outerHeight(true),
		anchorItems = anchorMenu.find('a'),
		scrollItems = anchorItems.map(function(){
	      var item = $($(this).attr("href"));
	      if (item.length) { return item; }
	    }),
	    waveFixed = $('.wave-fixed'),
	    wave_img = $('.wave-tabs.anchors .wave-line img');
 	var fixed_trigger = anchorMenu.offset().top + anchorMenuHeight+130;
   	var fixed_stop_trigger = $('.spy-content').offset().top + $('.spy-content').height();
   	var lastScrollTop = 0;
	var new_step = 0;

	anchorMenu.width(anchorMenu.parent().width());
	waveFixed.height(anchorMenu.find('.wave-tabs-head').outerHeight(true));
	$(window).resize(function(){
		anchorMenu.width(anchorMenu.parent().width());
		waveFixed.height(anchorMenu.find('.wave-tabs-head').outerHeight(true));
		fixed_stop_trigger = $('.spy-content').offset().top + $('.spy-content').height();
	});


	// клик по элементу плавающего меню и переход к разделу 
	doc.on('click', '.wave-tabs.anchors .wave-tabs-head a', function(e){
		e.preventDefault();
		var href = $(this).attr("href"),
			offsetTop = href === "#" ? 0 : $(href).offset().top - anchorMenuHeight-130;
		$('html, body').stop().animate({ 
			scrollTop: offsetTop
		}, 300);
	});
  
	$(window).scroll(function(){
	    var fromTop = $(this).scrollTop() + anchorMenuHeight+170;
	    var window_width = $(this).width();
	    // IF ставим к менюшке фиксированную позицию.
	    if(fromTop > fixed_trigger){
	   		anchorMenu.addClass('fixed').removeClass('fixed_stop');
	   		waveFixed.show();

	   		var cur = scrollItems.map(function(){
		    if ($(this).offset().top < fromTop)
		       return this;
		   	});

		   	cur = cur[cur.length-1];
		   	var id = cur && cur.length ? cur[0].id : "";

		   	// IF ставим активный линк если заскролили на следующий раздел. 
		   	if(lastId !== id){
				lastId = id;
				anchorItems.parent().removeClass("active").end().filter("[href='#"+id+"']").parent().addClass("active");
				if (id !== ''){ // двигаем свгшку если айдишник не пустой
					var new_left = anchorMenu.find("a[href='#"+id+"']").position().left;
					wave_img.stop().animate({ left: new_left}, 250);
					// Не на мобилках проверяем, если это последний элемент, то двигаем элемент в правый край, чтобы он не выходил за пределы блока
					if (anchorMenu.find("a[href='#"+id+"']").position().left + anchorMenu.find("a[href='#"+id+"']").width() > anchorMenu.width() && $(window).width() > 500){
						new_left = anchorMenu.width() -  wave_img.width();
						console.log("new_left", new_left);
						wave_img.stop().animate({ left: new_left}, 250);
					}
				}
		   	}

		   	// смотрим входит ли на мобилках элементы меню и если что двигаем контейнер, чтобы активный элемент входил
			if($('.mobile-scroll-elem.active').length && window_width < 500){
				var rightEdge = anchorMenu.find("a[href='#"+id+"']").offset().left + anchorMenu.find("a[href='#"+id+"']").width();
				var leftEdge = anchorMenu.find("a[href='#"+id+"']").offset().left - anchorMenu.find("a[href='#"+id+"']").width();
				if (fromTop > lastScrollTop){ // если скролим вниз то проверяем границу справа
				   if (rightEdge > $('.mobile-scroll').parent().width()){
				   		new_step = new_step + anchorMenu.find("a[href='#"+id+"']").width()+parseInt(anchorMenu.find("a[href='#"+id+"']").css('marginRight'));
						$('.mobile-scroll').css({transform: 'translateX(-'+new_step+'px)'}, 250);
				   }
				} else { // если двигаем вверх, то проверяем границу слева
					if (leftEdge < 0){
						new_step = new_step - anchorMenu.find("a[href='#"+id+"']").width()+parseInt(anchorMenu.find("a[href='#"+id+"']").css('marginRight'));
						$('.mobile-scroll').css({transform: 'translateX(-'+new_step+'px)'}, 250);
						if (id == cur[0].id){
							$('.mobile-scroll').css({transform: 'translateX(-'+0+'px)'}, 250);
						}
					}
				}
				lastScrollTop = fromTop;  
    		}
	    } else {
	   		anchorMenu.find('li:first-child').addClass('active')
	   		anchorMenu.removeClass('fixed fixed_stop');
	   		waveFixed.hide();
	    }

	    if(fromTop > fixed_stop_trigger){
	   		anchorMenu.addClass('fixed_stop').removeClass('fixed');
		} 
        
	});

	$(window).resize(function(){
		if ($(this).width() > 500){
			$('.mobile-scroll').css({transform: 'translateX(-'+0+'px)'}, 250);
		}
	});
}
function mobileScroll(){
	var container = $('.mobile-scroll');
	container.each(function(){
		var elems = $(this).find('.mobile-scroll-elem');
		var width = 0;
		var stop_parametre = 0;
		elems.each(function(){
			width = width + $(this).outerWidth(true)+10;
			stop_parametre = stop_parametre + ($(this).outerWidth(true)+10);
			console.log($(this).outerWidth(true));
		});
		$(this).width(width);
		console.log("width", width);
		var move;
		var stop = stop_parametre - $(this).parent().width();
		console.log("stop", stop);
		var move_start;

		if ($(this).width() > $(window).width()){
			$(this).hammer().bind('panstart', function(e){
				var matrix = $(this).css('transform');
				matrix = matrix.split('(')[1];
				matrix = matrix.split(')')[0];
				matrix = matrix.split(',');
				matrix = matrix[4];
				move_start = parseInt(matrix, 10);
				move_start = Math.abs(move_start);
			})
			$(this).hammer().bind("pan", function(ev){
				var move_count = ev.gesture.deltaX * (-1);
				move = move_start + move_count;
				if (move >= stop){
					$(this).css({transform: 'translateX(-'+stop+'px)'});	
				} else {
					$(this).css({transform: 'translateX(-'+move+'px)'});
				}
			});
		}
	});
}
function mainHeroAnimation(){
	// Хак с шириной свг 
	var window_width = $(window).width();

	setTimeout(function(){
		$('.wave-block .inner').css('width', window_width);
	}, 100);

	$(window).resize(function(){
		var window_width = $(this).width();
		$('.wave-block .inner').width(window_width);
	});

	// Анимация стартового экрана главной 

	setTimeout(function(){
		$('.wave-block, .hero-img .overlay, .hero-main p').addClass('load');
	}, 250)
}
function photoTabs(){
	var width = 0;
	setTimeout(function(){
		$('.photo-tab-block .item').each(function(){
			width = width + $(window).width();
		});
		$('.photo-tab-block').width(width + 75);
	}, 100);
}
function initMap(){

	var styleArray = [
	    {
	        "featureType": "all",
	        "elementType": "labels",
	        "stylers": [
	            {
	                "visibility": "on"
	            }
	        ]
	    },
	    {
	        "featureType": "all",
	        "elementType": "labels.text.fill",
	        "stylers": [
	            {
	                "saturation": 36
	            },
	            {
	                "color": "#000000"
	            },
	            {
	                "lightness": 40
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
	                "color": "#000000"
	            },
	            {
	                "lightness": 16
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
	        "featureType": "administrative.locality",
	        "elementType": "labels.text.fill",
	        "stylers": [
	            {
	                "color": "#c4c4c4"
	            }
	        ]
	    },
	    {
	        "featureType": "administrative.neighborhood",
	        "elementType": "labels.text.fill",
	        "stylers": [
	            {
	                "color": "#707070"
	            }
	        ]
	    },
	    {
	        "featureType": "landscape",
	        "elementType": "geometry",
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
	        "featureType": "poi",
	        "elementType": "geometry",
	        "stylers": [
	            {
	                "color": "#000000"
	            },
	            {
	                "lightness": 21
	            },
	            {
	                "visibility": "on"
	            }
	        ]
	    },
	    {
	        "featureType": "poi.business",
	        "elementType": "geometry",
	        "stylers": [
	            {
	                "visibility": "on"
	            }
	        ]
	    },
	    {
	        "featureType": "road.highway",
	        "elementType": "geometry.fill",
	        "stylers": [
	            {
	                "color": "#be2026"
	            },
	            {
	                "lightness": "0"
	            },
	            {
	                "visibility": "on"
	            }
	        ]
	    },
	    {
	        "featureType": "road.highway",
	        "elementType": "geometry.stroke",
	        "stylers": [
	            {
	                "visibility": "off"
	            }
	        ]
	    },
	    {
	        "featureType": "road.highway",
	        "elementType": "labels.text.fill",
	        "stylers": [
	            {
	                "visibility": "off"
	            }
	        ]
	    },
	    {
	        "featureType": "road.highway",
	        "elementType": "labels.text.stroke",
	        "stylers": [
	            {
	                "visibility": "off"
	            },
	            {
	                "hue": "#ff000a"
	            }
	        ]
	    },
	    {
	        "featureType": "road.arterial",
	        "elementType": "geometry",
	        "stylers": [
	            {
	                "color": "#000000"
	            },
	            {
	                "lightness": 18
	            }
	        ]
	    },
	    {
	        "featureType": "road.arterial",
	        "elementType": "geometry.fill",
	        "stylers": [
	            {
	                "color": "#575757"
	            }
	        ]
	    },
	    {
	        "featureType": "road.arterial",
	        "elementType": "labels.text.fill",
	        "stylers": [
	            {
	                "color": "#ffffff"
	            }
	        ]
	    },
	    {
	        "featureType": "road.arterial",
	        "elementType": "labels.text.stroke",
	        "stylers": [
	            {
	                "color": "#2c2c2c"
	            }
	        ]
	    },
	    {
	        "featureType": "road.local",
	        "elementType": "geometry",
	        "stylers": [
	            {
	                "color": "#000000"
	            },
	            {
	                "lightness": 16
	            }
	        ]
	    },
	    {
	        "featureType": "road.local",
	        "elementType": "labels.text.fill",
	        "stylers": [
	            {
	                "color": "#999999"
	            }
	        ]
	    },
	    {
	        "featureType": "road.local",
	        "elementType": "labels.text.stroke",
	        "stylers": [
	            {
	                "saturation": "-52"
	            }
	        ]
	    },
	    {
	        "featureType": "transit",
	        "elementType": "geometry",
	        "stylers": [
	            {
	                "color": "#000000"
	            },
	            {
	                "lightness": 19
	            }
	        ]
	    },
	    {
	        "featureType": "water",
	        "elementType": "geometry",
	        "stylers": [
	            {
	                "color": "#000000"
	            },
	            {
	                "lightness": 17
	            }
	        ]
	    }
	]

	var mapOptions = {
	    zoom: 11,
	    center: new google.maps.LatLng(55.00835259999999, 82.93573270000002),
	    styles: styleArray,
	    disableDefaultUI: true,
	    scrollwheel: false,
  	};

  	var map = new google.maps.Map(document.getElementById('geo_map'),
    mapOptions);




  	var images = ['http://localhost:8080/img/geo1.svg', 'http://localhost:8080/img/geo2.svg',
  	'http://localhost:8080/img/geo3.svg', 'http://localhost:8080/img/geo4.svg'];
    var marker = new google.maps.Marker({
	    position: {lat: 54.98629588345607, lng: 82.69128689921877},
	    map: map,
	    icon: images[0]
  	});
  	var marker1 = new google.maps.Marker({
	    position: {lat: 55.0166207429296, lng: 82.82037625468752},
	    map: map,
	    icon: images[1]
  	});
  	var marker2 = new google.maps.Marker({
	    position: {lat: 54.942934881383266, lng: 82.97761807597658},
	    map: map,
	    icon: images[2]
  	});
  	var marker3 = new google.maps.Marker({
	    position: {lat: 55.00402098759967, lng: 83.07031521953127},
	    map: map,
	    icon: images[3]
  	});

}
function cutString(elem){
	var string = elem.text(),
		new_string;
	if (string.length > 177){
		new_string = string.slice(0, 177);
		return new_string + '...';
	} else {
		return 0;
	}
	
}
var switch_slider_photos;
function ready(){

	if ($('.loop').length){
		var mainOwl = $('.loop');
		mainOwl.owlCarousel({
		    center: true,
		    items:1,
		    loop:true,
		    responsive:{
		    	400:{
		    		items: 2
		    	}
		    }
		});

		$('.loop-next').click(function() {
		    mainOwl.trigger('next.owl.carousel');
		    return false;
		});
		$('.loop-prev').click(function() {
		    mainOwl.trigger('prev.owl.carousel');
		    return false;
		});
	}

	if ($('.history-owl').length){
		var historyOwl = $('.history-owl');
		historyOwl.owlCarousel({
			center: true,
		    items:1,
		    dotsContainer: '#history-custom-dots',
		    mouseDrag: false,
		    touchDrag: false
		});

		$('.owl-dot').click(function () {
		    historyOwl.trigger('to.owl.carousel', [$(this).index(), 300]);
		});
	}

	if ($('.switch-photos').length){
		$('.switch-modal-window.photos').each(function(){
			switch_slider_photos = $(this).find('.switch-photos');
			switch_slider_photos.owlCarousel({
			    center: true,
			    items:1,
			    loop:true,
			    margin: 120,
			    responsive:{
			    	400:{
			    		items: 3
			    	}
			    }
			});
			$('.switch-next').click(function() {
			    switch_slider_photos.trigger('next.owl.carousel');
			    return false;
			});
			$('.switch-prev').click(function() {
			    switch_slider_photos.trigger('prev.owl.carousel');
			    return false;
			});
		});
	}

	if ($('.mobile-scroll-container').length && $(window).width() < 724){
		setTimeout(function(){
			mobileScroll();
		}, 550);
		mobileScroll();
		$(window).resize(function(){
			mobileScroll();
		});
	}

	if ($('.photo-tab-block').length){
		photoTabs();
	}

	if ($('.wave-block').length){
		mainHeroAnimation();
	}

	if ($('.wave-tabs.anchors').length){
		anchorsBlock();
	}

	// Клик на ссылку которая вызывает новые страницы роутером 
	$('a[ng-click]').click(function(e){
		console.log(1);
		$(window).scrollTop(0);
	});

	if ($('.full').length){
		setTimeout(function(){
			specialBlockPos();
		}, 1000);
		specialBlockPos();
	}

	if ($('#geo_map').length){
		initMap();
	}

	if ($('.history-owl').length){
		audioWave();
	}
	if ($('.page-content .news-block').length){
		var iso = $('.page-content .news-block').isotope({
			itemSelector:'.grid-item',
			layoutMode: 'fitRows'
		});

		doc.on('click', '.news-filter-group a', function(){
			if (!$(this).hasClass('active')){
				var filterValue = $(this).attr('data-filter');
				iso.isotope({ filter: filterValue });
				$('.news-filter-group li').removeClass('active');
				$(this).parent().addClass('active');
			}
		})
	}
	if ($('.share-block').length){
		var url = window.location.href;
		var title = $('.title-block h1').text();
		var desc = 'Статья на сайте mdis.ru'
		console.log("desc", desc);
		$('.share').ShareLink({
			title: title,
			text: desc,
            url: url
        });
	}
	if ($('input[type="tel"]').length){
		$('input[type="tel"]').mask('+7 (000) 000-00-00');
	}
}



/*

!!!!!!!!!!!!!!!!!!!!!!!! ANGULAR JS CODE !!!!!!!!!!!!!!!!!!!

*/


var router = angular.module('route', ['ngRoute', 'ngAnimate']);
var test;
router.config(function($routeProvider, $locationProvider) {

    $routeProvider
    	.when('/:name*', {
    	  	templateUrl: function(link){
    	  		return link.name + '.html';
    	  	},
    	  	controller: 'mainController'
    	})
    	.when('/:name*/:id*', {
    		templateUrl: function(id){
    			console.log(id);
    			return id + '.html'
    		},
    		controller: 'mainController'
    	})
    	.when('/', {
            templateUrl : 'main.html',
            controller: 'mainController'
        })
        .otherwise('/', {
            templateUrl : 'main.html',
            controller: 'mainController'
        });

    // $locationProvider.html5Mode(true);

}).run(function($rootScope, $window, $route, $location) {


	$rootScope.headerClass = '';
    $rootScope.slide = '';  

    $rootScope.$on('$routeChangeStart', function() {  
        //event button to move backward  
        $rootScope.back = function() {  
            $rootScope.slide = 'slide-right';  
            // $window.history.back();
        }  
        //event button item list to move forward  
        $rootScope.next = function() {  
            $rootScope.slide = 'slide-left'; 
        }  
    });

    $rootScope.$on('$locationChangeStart', function(event, next, current) {
        $rootScope.actualLocation = $location.path();
        if($location.path() !== '/'){
	    	$rootScope.headerClass = 'no-index';
	    } else {
	    	$rootScope.headerClass = '';
	    }
    });        

 	/*$rootScope.$watch(function () {return $location.path()}, function (newLocation, oldLocation) {
	    true only for onPopState
	    
	    if($rootScope.actualLocation === newLocation) {

	        var back,
	            historyState = $window.history.state;

	        back = !!(historyState && historyState.position <= $rootScope.stackPosition);

	        if (back) {
	            //back button
	            $rootScope.stackPosition--;
	            $rootScope.back;  
	        } else {
	            //forward button
	            $rootScope.stackPosition++;
	            $rootScope.next; 
	        }
	    } else {
	        //normal-way change of page (via link click)
	        if ($route.current) {
	            $rootScope.stackPosition++;
	        }

	    }
	});*/

});

router.controller('mainController', function($scope, $window){
	setTimeout(function(){
		ready();
	}, 50);
});




/*

!!!!!!!!!!!!!!!!!!!!!! PAGE JS CODE !!!!!!!!!!!!!!!!!!!!!!!!

*/


/*// transition middleware
page('*', transition)

// по умолчанию вызывает главную страницу. 
page('/', function(){
	$.ajax({
		url: 'main.html',
		success: function(data){
			$('#content-changer').empty().html(data);
			ready();
			urlStorage();
		}
	});
});

page('/product', function(){
	$.ajax({
		url: 'product.html',
		success: function(data){
			$('#content-changer').empty().html(data);
			ready();
			urlStorage();
		}
	});
});

page('/about', function(){
	$.ajax({
		url: 'about.html',
		success: function(data){
			$('#content-changer').empty().html(data);
			ready();
			urlStorage();
		}
	});
});

// функция которая вызывает анимацию
function transition(ctx, next, state){
	if (ctx.init) {
	    next();
	} else {
		// TODO узнать как блять установит вычислить состояние
		// Идея сделать класс на ссылки, который редиректит на следующший страницы, и 
		// передавать в миделвейр параметр ссылки data-link. В миделвейре сделатьт колбек функцию отдельную
		// не знаю как определить кнопочки "назад/вперед"

		//anim out
		var transOut = content.find('.transition-block');
		if (state == 'forward') { transOut.addClass('back') }
		if (state == 'back') { removeClass('forward') }

		// загружаем новый контент
		setTimeout(function(){
			$(window).scrollTop(0);
			next();
		},300);

		// anim In 
		setTimeout(function(){
			var transIn = content.find('.transition-block');
			if (state == 'back'){ transIn.addClass('back') }
			transIn.addClass('forward');
		}, 310);
	}
}

// подгрузка нового контента 
function route(url){
	// TODO animation 
	console.log('1');	
	$.ajax({
		url: url+'.html',
		success: function(data){
			$('#content-changer').empty().html(data);
			ready();
			urlStorage();
		}
	});
}

// Вызов страницы 
function pageCall(){
	if (url == '/'){
		page('/', route('main'));
	} else {	
		page(url, route(url));
	}
}

// кнопки назад вперед 
window.onpopstate = function (ev){
	url = window.history.state.path;
	console.log('url', url);
	// page(url, route(url));
	// pageCall();
}

// обновление массива урлок 
function urlStorage(){
	// var url = window.history.state.path;

	var url = document.location.pathname;
	urls.push(window.history.state.path);
	console.log('urls', urls);
}

//start route
page({
	popstate: true,
	click: false
});
*/