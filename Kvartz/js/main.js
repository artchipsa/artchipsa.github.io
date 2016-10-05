$(document).ready(function(){

	$('.dropdown').on('show.bs.dropdown', function(e){
	    $(this).find('.dropdown-menu').first().stop(true, true).slideDown('fast');
	  });

  	$('.dropdown').on('hide.bs.dropdown', function(e){
	    $(this).find('.dropdown-menu').first().stop(true, true).slideUp('fast');
  	});

  	$(document).on('click', '.dropdown li a', function(){
  		var text = $(this).text();
  		$('.dropdown .pseudo-link').text(text);
  		$(this).parents('.dropdown-menu').slideUp('fast');
  		$(this).parents('.dropdown').removeClass('open');
  		return false;
  	});
  	var promo = $('.promo');
  	promo.owlCarousel({
  		items: 1,
  		loop: true,
  		dotsContainer: '.pagination'
  	});

  	$('.owl-navigation .arrow').click(function(){
  		var nav = $(this).data('nav');
  		promo.trigger(nav+'.owl.carousel', [400]);
  		return false;
  	});

  	var tab = $('.tab-slider');
  	tab.owlCarousel({
  		items: 1,
  		loop: true,
  		dots: false
  	});

  	$('.goods-tab .arrow').click(function(){
  		var nav = $(this).data('nav');
  		tab.trigger(nav+'.owl.carousel');
  		return false;
  	});

  	$('.tab-slider li a').click(function(){
  		$('.tab-slider .nav li').removeClass('active');
  	});

  	$('.abs-callback input[type="tel"]').mask('+7-000-000-00-00');

  	$('.letter-modal-show, .about-show, .goods-show, .callback').click(function(){
  		var id = $(this).data('id');
  		$(this).parents('body').find('div[data-id='+id+']').modal('show');	
  		return false
  	});

  	$('.close').click(function(){
  		$(this).parents('.modal').modal('hide');
  		return false;
  	});

  	$('.simple-form form').submit(function(){
  		var form = $(this);
	    var error = false; 
	    form.find('input').each( function(){ // пробежим по каждому полю в форме
	      if ($(this).val() == '') { // если находим пустое
	        $(this).css('border-color', '#a61b33');
	        error = true; // ошибка
	      }

	      $(this).keydown(function(){
	      	$(this).css('border-color', '#00aeef');
	      })
	    });

	    if (!error) { // если ошибки нет
        //Ajax
	    }
	    return false; // вырубаем стандартную отправку формы
  	});

//end doc ready
});