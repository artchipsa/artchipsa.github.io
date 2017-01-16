var over = false;
$(document).ready(function(){

	// Анимация дропдовна 
	$('.dropdown').on('show.bs.dropdown', function() {
	    $(this).find('.dropdown-menu').first().stop(true, true).slideDown('fast');
  	});
  	$('.dropdown').on('hide.bs.dropdown', function() {
    	$(this).find('.dropdown-menu').first().stop(true, true).slideUp('fast');
  	});

  	// раскрывающаяся менюха
  	$(document).on('click', '.js-sublist-toggler', function(){

  		if (!$(this).hasClass('active')){
  			$('.js-sublist-toggler').removeClass('active');
  			$('.sublist').slideUp(350);
  			$(this).addClass('active');
  			$(this).parent().find('.sublist').slideDown(350);
  		} else {
  			$(this).parent().find('.sublist').slideUp(350);
  			$(this).removeClass('active');
  		}

  		return false
  	});

  	$('.js-over').mouseover(function(){
  		if (!over == true) over = true;
  	}).mouseout(function(){
  		if (!over == false) over = false;
   	});

   	$('body').click(function(){
   		if (!over) {
   			// убираем менюху
   			$('.sublist').slideUp(350);
   			$('.js-sublist-toggler').removeClass('active');
   		}
   	});

   	// поиск

   	$('.js-search').focusin(function(){
   		this.placeholder = "";
   		$('.bottom-header-list').css('opacity', 0);
   		$(this).parents('.search-block').animate({
   			"width": "100%"
   		}, 200);
   		$(this).animate({
   			"width": "97%"
   		}, 10);
   		$('.search-over').fadeIn(500);
   	}).focusout(function(){
   		this.placeholder = "Поиск";
   		this.value = "";
   		setTimeout(function(){
   			$('.bottom-header-list').css('opacity', 1);
   		}, 250)
   		$(this).parents('.search-block').animate({
   			"width": "15%"
   		}, 200);
   		$(this).animate({
   			"width": "80%"
   		}, 10);
   		$('.search-over').fadeOut(500);
   		$('.search-result').fadeOut(300);
   		$('.js-anim').removeClass('anim');
   	});


   	$('.js-search').keyup(function(){

   		if (this.value.length > 3){
   			var self = $(this)
   			self.animate({"padding-left": "20px"}, 200);
   			$('.base-loader').fadeIn(200);

   			setTimeout(function(){
   				self.animate({"padding-left": "0px"}, 200);
   				$('.base-loader').fadeOut(200);
   				$('.search-result').slideDown('fast');
   				setTimeout(function(){
					$('.js-anim').addClass('anim');
   				}, 200)
   			}, 700)

   		}

   	});

	var owlMain = $('.main-slider');
    owlMain.owlCarousel({
    	animateOut:'fastFadeOut',
	    animateIn:'fastFadeIn',
	    items:1,
	    dots:true,
	    mouseDrag:false,
        smartSpeed: 300,
        loop: true
    });

    $('.main-slider-block [data-direction="right"]').click(function() {
        owlMain.trigger('next.owl.carousel');
    });
    $('.main-slider-block [data-direction="left"]').click(function() {
        owlMain.trigger('prev.owl.carousel');
    });

    var owlSpecials = $('.specials-slider');
    owlSpecials.owlCarousel({
        items:1,
        dots:true,
        mouseDrag:false,
        smartSpeed: 300,
        loop: true
    });

    $('.specials-slider-block [data-direction="right"]').click(function() {
        owlSpecials.trigger('next.owl.carousel');
    });
	$('.specials-slider-block [data-direction="left"]').click(function() {
	    owlSpecials.trigger('prev.owl.carousel');
	});

   	// main-slider
   	$(function () {
        var outerDiv = $('.divvideo');
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

    $('.item__bonuce a, .tooltip-link a').popover();
    $('.que-tooltip').tooltip();
    
    $("#price_range").ionRangeSlider({
        type: "double",
        min: 1000,
        max: 700000,
        step: 1000,
        onStart: function (data) {
            $('.range input[name="min_range"]').val(data.from);
            $('.range input[name="max_range"]').val(data.to);
        },
        onChange: function (data) {
            $('.range input[name="min_range"]').val(data.from);
            $('.range input[name="max_range"]').val(data.to);
        },
        onFinish: function (data) {
            $('.range input[name="min_range"]').val(data.from);
            $('.range input[name="max_range"]').val(data.to);
        },
        onUpdate: function (data) {
            $('.range input[name="min_range"]').val(data.from);
            $('.range input[name="max_range"]').val(data.to);
        }
    });


    $('.range input').keyup(function(){
        changeInputs($('#price_range'), $(this));
    });

    $("#scale_range").ionRangeSlider({
        type: "double",
        min: 8,
        max: 20,
        step: 2,
        onStart: function (data) {
            $('.range input[name="min_scale"]').val(data.from);
            $('.range input[name="max_scale"]').val(data.to);
        },
        onChange: function (data) {
            $('.range input[name="min_scale"]').val(data.from);
            $('.range input[name="max_scale"]').val(data.to);
        },
        onFinish: function (data) {
            $('.range input[name="min_scale"]').val(data.from);
            $('.range input[name="max_scale"]').val(data.to);
        },
        onUpdate: function (data) {
            $('.range input[name="min_scale"]').val(data.from);
            $('.range input[name="max_scale"]').val(data.to);
        }
    });

    $('.range .scale').keyup(function(){
        changeInputs($('#scale_range'), $(this));
    });

    $("#size_range").ionRangeSlider({
        type: "double",
        min: 80,
        max: 3000,
        step: 2,
        onStart: function (data) {
            $('.range input[name="min_size"]').val(data.from);
            $('.range input[name="max_size"]').val(data.to);
        },
        onChange: function (data) {
            $('.range input[name="min_size"]').val(data.from);
            $('.range input[name="max_size"]').val(data.to);
        },
        onFinish: function (data) {
            $('.range input[name="min_size"]').val(data.from);
            $('.range input[name="max_size"]').val(data.to);
        },
        onUpdate: function (data) {
            $('.range input[name="min_size"]').val(data.from);
            $('.range input[name="max_size"]').val(data.to);
        }
    });
    
    $('.range .size').keyup(function(){
        changeInputs($('#size_range'), $(this));
    });

    $("#speed_range").ionRangeSlider({
        type: "double",
        min: 100,
        max: 2000,
        step: 2,
        onStart: function (data) {
            $('.range input[name="min_speed"]').val(data.from);
            $('.range input[name="max_speed"]').val(data.to);
        },
        onChange: function (data) {
            $('.range input[name="min_speed"]').val(data.from);
            $('.range input[name="max_speed"]').val(data.to);
        },
        onFinish: function (data) {
            $('.range input[name="min_speed"]').val(data.from);
            $('.range input[name="max_speed"]').val(data.to);
        },
        onUpdate: function (data) {
            $('.range input[name="min_speed"]').val(data.from);
            $('.range input[name="max_speed"]').val(data.to);
        }
    });
    
    $('.range .speed').keyup(function(){
        changeInputs($('#size_range'), $(this));
    });

});

//funcs

function changeInputs(slider, input){
    var slider = slider.data('ionRangeSlider');
    var val = input.val();
    var name = input.attr('name');

    if (name.slice(0, 3) == "min") {
        slider.update({
            from: val
        });
    }

    if (name.slice(0, 3) == "max"){
        slider.update({
            to: val
        });
    }
    
}

function sliderInputChanges(input, data){
    var name = input.attr('name');

    if (name.slice(0, 3) == "min") {
        input.val(data.from);
    }
    if (name.slice(0, 3) == "max"){
        input.val(data.to);
    }
}
// animation

var controller = new ScrollMagic.Controller();

var scene1 = new ScrollMagic.Scene({
    triggerElement: "#trigger_camera",
    reverse: false
}).setClassToggle('#camera_animate', 'camera')
  .addTo(controller);

var scene2 = new ScrollMagic.Scene({
    triggerElement: "#trigger_card",
    reverse: false
}).setClassToggle('#card_animate', 'card_animation')
  .addTo(controller);