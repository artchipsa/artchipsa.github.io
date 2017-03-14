var content = $('#content-changer');
var history_length = window.history.length;
var state;
var url;
var urls = [];

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
			$(this).removeClass('play').addClass('pause');	
		} else {
			$(this).parents('.audio-block').find('#audio').trigger('pause');
			$(this).removeClass('pause').addClass('play');	
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

});

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

	anchorMenu.width(anchorMenu.parent().width());
	waveFixed.height(anchorMenu.find('.wave-tabs-head').outerHeight(true));
	$(window).resize(function(){
		anchorMenu.width(anchorMenu.parent().width());
		waveFixed.height(anchorMenu.find('.wave-tabs-head').outerHeight(true));
	});

	doc.on('click', '.wave-tabs.anchors .wave-tabs-head a', function(e){
		e.preventDefault();
		var href = $(this).attr("href"),
			offsetTop = href === "#" ? 0 : $(href).offset().top - anchorMenuHeight+15;
		$('html, body').stop().animate({ 
			scrollTop: offsetTop
		}, 300);
	});

   	var fixed_trigger = anchorMenu.offset().top;
   	var fixed_stop_trigger = $('.product-content').offset().top + $('.product-content').height();
   	var lastScrollTop = 0;
	var new_step = 0;
	$(window).scroll(function(){
	   // Get container scroll position
	    var fromTop = $(this).scrollTop();
	    var window_width = $(this).width();
	    if(fromTop > fixed_trigger){
	   		anchorMenu.addClass('fixed').removeClass('fixed_stop');
	   		waveFixed.show();

	   		var cur = scrollItems.map(function(){
		    if ($(this).offset().top < fromTop)
		       return this;
		   	});

		   	cur = cur[cur.length-1];
		   	var id = cur && cur.length ? cur[0].id : "";

		   	// ставим активный линк 
		   	if(lastId !== id){
				lastId = id;
				anchorItems
				 .parent().removeClass("active")
				 .end().filter("[href='#"+id+"']").parent().addClass("active");
				if (id !== ''){
					var new_left = anchorMenu.find("a[href='#"+id+"']").position().left;
					wave_img.stop().animate({ left: new_left}, 250);
				}
		   	}

		   	// смотрим входит ли на мобилках
			if($('.mobile-scroll-elem.active').length && window_width < 500){
				var rightEdge = anchorMenu.find("a[href='#"+id+"']").offset().left + anchorMenu.find("a[href='#"+id+"']").width();
				var leftEdge = anchorMenu.find("a[href='#"+id+"']").offset().left - anchorMenu.find("a[href='#"+id+"']").width();
				if (fromTop > lastScrollTop){
				   if (rightEdge > $('.mobile-scroll').parent().width()){
				   		new_step = new_step + anchorMenu.find("a[href='#"+id+"']").width()+parseInt(anchorMenu.find("a[href='#"+id+"']").css('marginRight'));
						$('.mobile-scroll').css({transform: 'translateX(-'+new_step+'px)'}, 250);
				   }
				} else {
					if (leftEdge < 0){
						new_step = new_step - anchorMenu.find("a[href='#"+id+"']").width()+parseInt(anchorMenu.find("a[href='#"+id+"']").css('marginRight'));
						$('.mobile-scroll').css({transform: 'translateX(-'+new_step+'px)'}, 250);
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
	var width = 0;

	container.each(function(){
		var elems = $(this).find('.mobile-scroll-elem');
		elems.each(function(){
			width = width + $(this).outerWidth(true);
		});
		$(this).width(width+270);
		var move;
		var stop = $(this).width()/2;
		var move_start;
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
			if (move > $(this).width()/2){
				$(this).css({transform: 'translateX(-'+stop+'px)'});	
			} else {
				$(this).css({transform: 'translateX(-'+move+'px)'});
			}
		});
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

	if ($('.mobile-scroll-container').length && $(window).width() < 1024){
		mobileScroll();
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
	$('.page').click(function(e){
		setTimeout(function(){	
			$(window).scrollTop(0);
		}, 200)
	});
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
    	  	    console.log("link", link);
    	  		return '../' + link.name + '.html';
    	  	},
    	  	controller: 'mainController'
    	})
    	.when('/', {
            templateUrl : '../main.html',
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
            $window.history.back();
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