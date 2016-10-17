$(document).ready(function(){
	//feature hover
	$('.keyfeatures-block .item').hover(function(){
		$(this).addClass('hovered');
		$('.keyfeatures-block .item').addClass('another-hovered');
	}, function(){
		$(this).removeClass('hovered')
		$('.keyfeatures-block .item').removeClass('another-hovered');
	});


	$(function(){	
        var $window = $(window);
		var scrollTime = 0.5;
		var scrollDistance = 500;

		$window.on("mousewheel DOMMouseScroll", function(event){

			event.preventDefault();	

			if ($(window).scrollTop() < 26999){
				console.log('1');
				scrollTime = 0.5;
				scrollDistance = 500;
			} else {
				console.log('2');
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

});