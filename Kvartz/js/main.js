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
/*	      var data = form.serialize(); // подготавливаем данные
	      $.ajax({ // инициализируем ajax запрос
	         type: 'POST', // отправляем в POST формате, можно GET
	         url: 'callback.php', // путь до обработчика, у нас он лежит в той же папке
	         data: data, // данные для отправки
	           beforeSend: function(data) { // событие до отправки
	                form.find('input[type="submit"]').attr('disabled', 'disabled'); // например, отключим кнопку, чтобы не жали по 100 раз
	              },
	           success: function(data){ // событие после удачного обращения к серверу и получения ответа
	              if (data['error']) { // если обработчик вернул ошибку
	                alert(data['error']); // покажем её текст
	              } else { 
	              	form.parent().fadeOut('fast');
	              	$('.success').fadeIn('fast');
	              }
	             },
	           error: function (xhr, ajaxOptions, thrownError) { // в случае неудачного завершения запроса к серверу

	             },
	           complete: function(data) { // событие после любого исхода
	                form.find('input[type="submit"]').prop('disabled', false); // в любом случае включим кнопку обратно
	             }     
	           });*/
	    }
	    return false; // вырубаем стандартную отправку формы
  	});
//end doc ready
});