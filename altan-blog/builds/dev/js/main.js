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
				if (max_height < current_offset.top - 550){
					$('.car').stop().removeClass('fixed').addClass('finish');
				}
			} else {
			   if ($(window).scrollTop() < max_height + 550 && $(window).scrollTop() > car_offset.top ){
					$('.car').stop().removeClass('finish').addClass('fixed').css({marginTop: 100});
				} else {
					$('.car').stop().removeClass('fixed').css({marginTop: 0});
				}
			}
			lastScrollTop = st;
		});
	}


	//header-search

	jQuery.fn.animateAuto = function(prop, speed, callback){
	    var elem, height, width;
	    return this.each(function(i, el){
	        el = jQuery(el), elem = el.clone().css({"height":"auto","width":"auto"}).appendTo("body");
	        height = elem.css("height"),
	        width = elem.css("width"),
	        elem.remove();
	        
	        if(prop === "height")
	            el.animate({"height":height}, speed, callback);
	        else if(prop === "width")
	            el.animate({"width":width}, speed, callback);  
	        else if(prop === "both")
	            el.animate({"width":width,"height":height}, speed, callback);
	    });  
	}

	$('.search').click(function(){
		var btn = $(this);
		if (btn.hasClass('open')){
			btn.find('span').removeClass('glyphicon-remove').addClass('glyphicon-search');
			btn.parent().find('input[type="text"]').fadeOut(300);
			setTimeout(function(){
				btn.parent().animateAuto('width', 350, function(){
					if($(window).width() > 768){
						$('.btn.header').fadeIn(300);
					} else{
						$('.m-subscribe').fadeIn(300);
					}
				});
			}, 350);
			btn.removeClass('open');
		} else {
			$('.btn.header, .m-subscribe').fadeOut(300);
			setTimeout(function(){
				btn.parent().animate({width: "100%"}, 350, function(){
					btn.find('span').removeClass('glyphicon-search').addClass('glyphicon-remove');
					btn.parent().find('input[type="text"]').fadeIn(300);
				});
			}, 300);
			btn.addClass('open');
		}
	});

	var header_height = $('header').height();
	$('#header_placeholder').height(header_height);
	$(window).scroll(function(){
		if ($(window).scrollTop() > 0){
			$('header').addClass('fixed');
			$('#header_placeholder').show();
		} else {
			$('header').removeClass('fixed');
			$('#header_placeholder').hide();
		}
	});

	$(document).on('click', '.top', function(){
		$('body, html').stop().animate({scrollTop: car_offset.top - $('header').height()}, '3550');
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


	//all news funcs
	var grid = $('.grid').isotope({
		itemSelector: '.article-element',
		layoutMode: 'fitRows'
	});

	$(document).on('click', '.filter', function(){
		var filterValue = $(this).data("filter");
		console.log('filterValue', filterValue);
	  	grid.isotope({ filter: filterValue });
	  	$('.filter-element').removeClass('active');
	  	$(this).parent().addClass('active');
	  	return false;
	});

	//map
	var myMap;
	ymaps.ready(function(){
		myMap = new ymaps.Map('map', {
			zoom: 11,
			center: [48.46897578085214,135.1129739999999]
		});
		myMap.controls.add('zoomControl', { left: 5, top: 50 });

		//Centers
		var Khabarovsk = [48.46897578085214,135.1129739999999];
		var Komsomolsk = [50.57667290137674,137.01914949999983];
		var Beerobidjan = [48.78065959694758,132.9329115];

		Habar1 = new ymaps.Placemark([48.492608573874726,135.10099549999993], {}, {
            iconLayout: 'default#image',
            iconImageHref: 'img/marker.png',
            iconImageSize: [60, 80],
            iconImageOffset: [-30, -80]
        });	
        Habar2 = new ymaps.Placemark([48.53565807385006,135.0685119999999], {}, {
            iconLayout: 'default#image',
            iconImageHref: 'img/marker.png',
            iconImageSize: [60, 80],
            iconImageOffset: [-30, -80]
        });	
        Habar3 = new ymaps.Placemark([48.39910707393176,135.09345849999985], {}, {
            iconLayout: 'default#image',
            iconImageHref: 'img/marker.png',
            iconImageSize: [60, 80],
            iconImageOffset: [-30, -80]
        });
        Komsomol = new ymaps.Placemark([50.53838907295097,137.03249899999994], {}, {
            iconLayout: 'default#image',
            iconImageHref: 'img/marker.png',
            iconImageSize: [60, 80],
            iconImageOffset: [-30, -80]
        });
        Beer = new ymaps.Placemark([48.76614207379159,132.94654749999998], {}, {
            iconLayout: 'default#image',
            iconImageHref: 'img/marker.png',
            iconImageSize: [60, 80],
            iconImageOffset: [-30, -80]
        });
        myMap.geoObjects.add(Habar1);
		myMap.geoObjects.add(Habar2);
		myMap.geoObjects.add(Habar3);
        $(document).on('click', '.city', function(){
	  		var text = $(this).text();
	  		$(this).parents('.dropdown').find('.text').text(text);
	  		$(this).parents('.dropdown').find('.dropdown-menu').first().stop(true, true).slideUp('fast');
	  		var city = $(this).data('city');
	  		switch(city){
	  			case 'Khabarovsk':
	  				myMap.setZoom(11);
	  				myMap.setCenter(Khabarovsk);
	  				myMap.geoObjects.add(Habar1);
	  				myMap.geoObjects.add(Habar2);
	  				myMap.geoObjects.add(Habar3);
	  				$('.shops').fadeOut(300);
	  				$('.shops[data-city="Khabarovsk"]').fadeIn(300);
	  				break;
	  			case 'Komsomolsk':
	  				myMap.setZoom(11);
	  				myMap.setCenter(Komsomolsk);
	  				myMap.geoObjects.add(Komsomol);
	  				$('.shops').fadeOut(300);
	  				$('.shops[data-city="Komsomolsk"]').fadeIn(300);
	  				break;
	  			case 'Beerobidjan':
	  				myMap.setZoom(11);
	  				myMap.setCenter(Beerobidjan);
	  				myMap.geoObjects.add(Beer);
	  				$('.shops').fadeOut(300);
	  				$('.shops[data-city="Beerobidjan"]').fadeIn(300);
	  				break;
	  		}
	  		return false;
	  	});

	  	$(document).on('click', '.marker', function(){
	  		var id = $(this).data('id');
	  		switch(id){
	  			case 'habar1':
	  				myMap.setZoom(16, {
	  					callback: function(){
	  						myMap.panTo([Habar1.geometry._yc[0], Habar1.geometry._yc[1]], {delay: 0, checkZoomRange: true});
	  					}
	  				});
	  				break;
	  			case 'habar2': 
	  				myMap.setZoom(16, {
	  					callback: function(){
	  						myMap.panTo([Habar2.geometry._yc[0], Habar2.geometry._yc[1]], {delay: 0, checkZoomRange: true});
	  					}
	  				});
	  				break;
	  			case 'habar3': 
	  				myMap.setZoom(16, {
	  					callback: function(){
	  						myMap.panTo([Habar3.geometry._yc[0], Habar3.geometry._yc[1]], {delay: 0, checkZoomRange: true});
	  					}
	  				});
	  				break;
	  			case 'Komsomol': 
	  				myMap.setZoom(16, {
	  					callback: function(){
	  						myMap.panTo([Komsomol.geometry._yc[0], Komsomol.geometry._yc[1]], {delay: 0, checkZoomRange: true});
	  					}
	  				});
	  				break;
	  			case 'Beer': 
	  				myMap.setZoom(16, {
	  					callback: function(){
	  						myMap.panTo([Beer.geometry._yc[0], Beer.geometry._yc[1]], {delay: 0, checkZoomRange: true});
	  					}
	  				});
	  				break;

	  		}
	  		return false;
	  	});
	});

	$('.dropdown').on('show.bs.dropdown', function(e){
	    $(this).find('.dropdown-menu').first().stop(true, true).slideDown('fast');
	  });

  	$('.dropdown').on('hide.bs.dropdown', function(e){
	    $(this).find('.dropdown-menu').first().stop(true, true).slideUp('fast');
  	});


});




function specialImgPosition(){
	var special_img_width = $('.promo-img img').parents('.article-wrap').width();
	$('.promo-img img').width(special_img_width);
	$('.promo-img').offset({left: 0});
}