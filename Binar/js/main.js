var over = false;
$(document).ready(function(){

    $('.header-placeholder').height($('header').height());

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

    // addParams
    $(document).on('click', '.js-hideParams', function(){
         $(this).find('span').text(function(i, text){
          return text === "Показать доп. параметры" ? "Скрыть доп. параметры" : "Показать доп. параметры";
        });
        $(this).find('.fa').toggleClass('fa-angle-down fa-angle-up')
        $('.hidden-params').slideToggle('300');
        return false;
    });

    $(document).on('click', '.js-toggle-price', function(){
        $(this).find('.fa').toggleClass('fa-sort-amount-desc fa-sort-amount-asc');
        return false;
    });


    // gallery Owl
    

    $('.goods-gallery').owlCarousel({
        thumbs: true,
        thumbsPrerendered: true,
        items: 1,
        dots: false
      });

    $(document).on('click', '.goods-gallery .item', function(){
        $('.big-gallery').fadeIn(500);
        // $('.big-gallery .goods-gallery').trigger('destroy.owl.carousel');
        $('.small-goods-thumbs .owl-thumb-item.active').click();
    });

    $('.big-gallery .close').click(function(){
        $('.big-gallery').fadeOut(300);
        return false;
    });

    $('.small-goods-thumbs .owl-thumb-item').click(function(){
        var id = $(this).data('thumb-id');
        if ($('.big-gallery').css('display') === 'none'){
            $('.big-goods-thumbs div[data-thumb-id="'+id+'"]').click();
        }
    });

    $('.big-goods-thumbs .owl-thumb-item').click(function(){
        var id = $(this).data('thumb-id');
        if ($('.big-gallery').css('display') === 'block'){
            $('.small-goods-thumbs div[data-thumb-id="'+id+'"]').click();
        }
    });

    $(document).keyup(function(e){
        if (e.keyCode === 27){
            $('.big-gallery .close').click();
            $('.bottom-add-view .close').click();
        } 

    });

    $(document).on('click', '.js-reviews-toggle', function(){
        $('.reviews').slideToggle(300);
        $(this).children('.fa').toggleClass('fa-angle-right fa-angle-down');
        return false;
    });

    $('.card-left-block.affix').css({width: $('.card-left-block').parent().width()});

    $('.card-left-block.affix').affix({
        offset:{
            top: 540
        }
    });

    $(document).scroll(function(){
        //scroll top
        var st = $(this).scrollTop();
        // появление товара
        if ($('.card-wrap').length){
            var anchor1 = $('.small-goods-thumbs').offset().top - $('header').height();
            // вставание товара на место к сопуткам
            var anchor2 = $('.co-goods .js-invis-toggle').offset().top - 50;
            if (st > anchor1){
                $('.float .item__head').slideDown(250);
                $('.float .zero-count').slideUp(250);
                $('.float .primary-btn').css('margin-bottom', '0px')
            } else {
                $('.float .item__head').slideUp(250);
                $('.float .zero-count').slideDown(250);
                $('.float .primary-btn').css('margin-bottom', '18px')
            }

            if (st > anchor2){
                $('.co-goods .js-invis-toggle').removeClass('invisible');
                $('.card-left-block.affix').css('display', 'none');
            } else {
                $('.co-goods .js-invis-toggle').addClass('invisible');
                $('.card-left-block.affix').css('display', 'block');
            }
        }

        //header fixed
        if (st > 1) {
            $('header').addClass('fixed');
            $('.top-menu').slideUp(200);
            // $('.header-placeholder').css('display', 'block');
        } else {
            $('header').removeClass('fixed');
            $('.top-menu').slideDown(200);
            // $('.header-placeholder').css('display', 'none');
        }

    });

    $('.co-item input[type="checkbox"]').change(function(){
        var prices = [],
            new_price = 0;
        $(this).parents('.co-item').toggleClass('disabled');

        $('.co-item').each(function(){
            if (!$(this).hasClass('disabled')){
                prices.push($(this).find('.actual-price').text());
            }
        })

        $('.result .actual-price').addClass('price-change');
        for (var i = 0; i < prices.length; i++){
            value = prices[i].replace(/\s/g, '');
            new_price = new_price + parseInt(value);
        }
        new_price = new_price+' .-'
        setTimeout(function(){
            $('.result .actual-price').text(new_price);
            $('.result .actual-price').removeClass('price-change');
        }, 200)

    });



    //bottom modals
    $('.js-view-toggler').click(function(){
        $('.list-view').addClass('active');
        return false;
    });
     $('.js-compare-toggler').click(function(){
        $('.compare-view').addClass('active');
        return false;
    });

    $(document).on('click', '.bottom-add-view .close', function(){
        $('.list-view').removeClass('active');
        $('.compare-view').removeClass('active');
        return false;
    });

    $(document).on('mouseover', '.js-highlite tr', function(){
        var id = $('.js-highlite tr').index(this);
        var self = $(this);
        self.addClass('highlighted');
        $('.compare-info-frame li table').each(function(){
            $(this).find('tr:eq('+id+')').addClass('highlighted');
        });
    }).on('mouseout', '.js-highlite tr', function(){
        $('tr').removeClass('highlighted')
    });

    $('.compare-info-frame li table').find('tr').mouseover(function(){
        var id = this.rowIndex;
        $('.compare-info-frame li table tr').each(function(){
            if (this.rowIndex == id){
                $(this).addClass('highlighted');
            }
        });
        $('.js-highlite tr:eq('+id+')').addClass('highlighted');
    }).mouseout(function(){
        $('tr').removeClass('highlighted');
    });

    // корзина
    $('.basket-block .count a').click(function(){
        var self = $(this);
        var id = $(this).data('id');
        var val = parseInt($(this).parent().find('input').val());
        var price = parseInt($(this).parents('.row').find('.price span').text().replace(/\s/g, ''));
        var price_space = $(this).parents('.row').find('.price span');

        if (id == 'asc'){
            if (val <= 99){
                $(this).parent().find('input').val(val+1);
                price_space.addClass('remath');
                setTimeout(function(){
                    var one_elem = price/val;
                    var new_price = price + one_elem; 
                    new_price = new_price.toLocaleString();
                    new_price = new_price + ' .-';
                    price_space.text(new_price).removeClass('remath');                    
                }, 200);
            }
        }

        if (id == 'desc'){
            if (val > 1){
                $(this).parent().find('input').val(val-1);
                 price_space.addClass('remath');
                 setTimeout(function(){
                    var one_elem = price/val;
                    var new_price = price - one_elem; 
                    new_price = new_price.toLocaleString();
                    new_price = new_price + ' .-';
                    price_space.text(new_price).removeClass('remath');
                }, 200);
            }
        }
        basketResult();
        return false;
    });

    $(document).on('click', '.basket-block .row .delete', function(){
        var parent = $(this).parents('.row');
        if (parent.hasClass('deleted')){
            parent.removeClass('deleted');
            $(this).parent().removeClass('remove');
            $(this).empty();
            $('<i class="fa fa-trash-o" aria-hidden="true"></i>').appendTo($(this));
        } else {
            parent.addClass('deleted');
            $(this).parent().addClass('remove');
            $(this).empty().text('отменить');
        }
        basketResult();
        return false;
    });
    var bill_anchor = $('.white-wrapper').offset().top;    
    $('.bill-block.affix').width($('.bill-block').parent().width());
    $('.bill-block.affix').affix({
        offset:{
            top: bill_anchor - 120
        }
    });

    $('.tel').mask('+7 000 000 00 00', {placeholder: "+7 ___ ___ __ __"});
    $('.city-phone').mask('200 00 00', {placeholder: "2__ __ __"})
    $('.date').mask('00/00/0000', {placeholder: 'дд/мм/гггг'});
    $('.series').mask('0000');
    $('.pasport-number').mask('000000');
    $('.code').mask('000 00 00');

    $(document).on('click', '.add-info a', function(){

        $('.additional-info').slideToggle(300);
        return false;

    });

    $('input[name="person"]').change(function(){
       var id =  $('input[name="person"]').index($('input[name="person"]:checked'));
       $('.personal-item.active').fadeOut(300, function(){
            $('.personal-item.active').removeClass('active');
            $('.personal-item:eq('+id+')').fadeIn(300).addClass('active');
       });
    })

});

//funcs

(function(){
    if ($('.frame').length){
        var frame = $('.frame');
        var sly = new Sly(frame, {
            horizontal: 1,
            itemNav: 'basic',
            activateMiddle: 1,
            smart: 1,
            activateOn: 'click',
            mouseDragging: 1,
            touchDragging: 1,
            releaseSwing: 1,
            scrollBar: $('.list-view .frame-scrollbar'),
            speed: 300,
            elasticBounds: 1,
            dragHandle: 1,
            dynamicHandle: 1,
            clickBar: 1
        }).init();
    }
}());

(function(){
    if ($('.compare-frame').length){
        var frame2 = $('.compare-frame');
        var sly2 = new Sly(frame2, {
            horizontal: 1,
            itemNav: 'basic',
            activateMiddle: 1,
            smart: 1,
            activateOn: 'click',
            mouseDragging: 1,
            touchDragging: 1,
            releaseSwing: 1,
            scrollBar: $('.compare-view .frame-scrollbar'),
            speed: 300,
            elasticBounds: 1,
            dragHandle: 1,
            dynamicHandle: 1,
            clickBar: 1
        }).init();

        if ($('.compare-frame li').length < 4){
            $('.pre-compare .frame-scrollbar').hide();
        }
    }
}());

(function(){
    if ($('.compare-info-frame').length){
        var frame3 = $('.compare-info-frame');
        var sly3 = new Sly(frame3, {
            horizontal: 1,
            itemNav: 'basic',
            activateMiddle: 1,
            smart: 1,
            activateOn: 'click',
            mouseDragging: 1,
            touchDragging: 1,
            releaseSwing: 1,
            scrollBar: $('.compare-slide .frame-scrollbar'),
            speed: 300,
            elasticBounds: 1,
            dragHandle: 1,
            dynamicHandle: 1,
            clickBar: 1
        }).init();
    }
    
    $(document).on('click', '.remove-elem', function(e){
        e.preventDefault();
        var elem = $(this).parents('li');
        sly3.remove(elem);
        if ($('.compare-info-frame li').length < 4){
            $('.compare-slide .frame-scrollbar').fadeOut(300);
        }

        if ($('.compare-info-frame li').length < 1){
            sly3.destroy();
            $('<h3 class="title">Этот список сравнения пуст</h3>').appendTo($('.compare-info-frame'));
        }
    });

    $('.compare-frame a').click(function(){
        var id = $(this).data('category');
        $('.pre-compare').fadeOut(300);
        $('.compare-block-wrapper div[data-category="'+id+'"]').fadeIn(300, function(){
            sly3.reload();
        });
        return false; 
    });

    $('.back').click(function(){
        $('.compare-block-wrapper .compare-block').fadeOut(300);
        $('.pre-compare').fadeIn(300);
        return false;
    });

}());

setTimeout(function(){
    $('.big-gallery').css({display: 'none', visibility: 'visible'});
}, 200);

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

function basketResult(){
    var result_space = $('.result-string span');
    var result = 0;
    setTimeout(function(){
        $('.price').each(function(){
            if (!$(this).parents('.row').hasClass('deleted')){
                result = result + parseInt($(this).text().replace(/\s/g, ''));
            }
        });
        result = result.toLocaleString();
        result = result + " .-";
        result_space.addClass('remath');
        setTimeout(function(){
            result_space.text(result).removeClass('remath');
        }, 200);
    }, 200);
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