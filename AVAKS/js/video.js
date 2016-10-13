$(document).ready(function(){

  //переменные
  const p1 = 1400;
  const p2 = 4900;
  const p3 = 8120;
  const p4 = 11600;

  var vid = document.getElementById('v0');
  var windowheight = $(window).height();
  //мотаем видео от начала до конца, пока висит прелоадер
  setTimeout(function(){
      window.scrollBy(0, 40000);
  },1500);

  setTimeout(function(){
    $(window).scrollTop(0);
  }, 2000);

  setTimeout(function(){
      window.scrollBy(0, 40000);
  },3000);

  setTimeout(function(){
    $(window).scrollTop(0);
  }, 4000);  

  setTimeout(function(){
    $('.preloader').fadeOut();
    window.preventAction = false;
  },5000);


  //появление всякой всячины
  $(window).scroll(function(){  
    scrolling();
    updateProgressBar();
  });

  scrolling();

  //Поинты для перехода
  $('.p1').click(function(e){
    pointClick($(this), p1);
    return false;
  });
  $('.p2').click(function(e){
    pointClick($(this), p2);
    return false;
  });
  $('.p3').click(function(e){
    pointClick($(this), p3);
    return false;
  });
  $('.p4').click(function(){
    pointClick($(this), p4);
    return false;
  });


  //функция перехода от поинта к поинту
  function pointClick(point, range){
    pointSwitcher(range, point);
    setTimeout(function(){
      updateProgressBar();
    }, 500);
    updateProgressBar();
  }

  //показывание различных элементов на скролл
  function scrolling(){
    var doc = $(window);
    if (doc.scrollTop() > 1400 && doc.scrollTop() < 3500 ) {
        $('.first').css("display", "block").removeClass('fadeOutUp').addClass('animated fadeInUp');
    } else {
      $('.first').removeClass('fadeInUp').addClass('animated fadeOutUp');
    }
    //second
    if (doc.scrollTop() > 4900 && doc.scrollTop() < 7550 ) {
        $('.second').css("display", "block").removeClass('fadeOutUp').addClass('animated fadeInUp');
    } else {
      $('.second').removeClass('fadeInUp').addClass('animated fadeOutUp');
    }
    //third
    if (doc.scrollTop() > 8120 && doc.scrollTop() < 11000 ) {
        $('.third').css("display", "block").removeClass('fadeOutUp').addClass('animated fadeInUp');
    } else {
      $('.third').removeClass('fadeInUp').addClass('animated fadeOutUp');
    }
    //four
    if (doc.scrollTop() > 11600 && doc.scrollTop() < 12537 ) {
        $('.four').css("display", "block").removeClass('fadeOutUp').addClass('animated fadeInUp');
    } else {
      $('.four').removeClass('fadeInUp').addClass('animated fadeOutUp');
    }

    if (doc.scrollTop() > 1400){
      $('.p1').addClass('active');
    } 
    if (doc.scrollTop() > 4900){
      $('.p2').addClass('active');
    }
    if (doc.scrollTop() > 8120){
      $('.p3').addClass('active');
    }
    if (doc.scrollTop() > 11600){
      $('.p4').addClass('active');
    }

    if (doc.scrollTop() < 1400){
      $('.p1').removeClass('active');
    } 
    if (doc.scrollTop() < 4900){
      $('.p2').removeClass('active');
    }
    if (doc.scrollTop() < 8120){
      $('.p3').removeClass('active');
    }
    if (doc.scrollTop() < 11600){
      $('.p4').removeClass('active');
    }
  }

  function pointSwitcher(scroll, point){
      $(window).scrollTop(scroll, function(){
        updateProgressBar();
        scrolling();
      });
      point.addClass('active');

  }

  var vid = document.getElementById('v0');
  // var windowheight = $(window).height();
  var windowheight = $(window).height()-20;


  var scrollpos = window.pageYOffset/400;
  var targetscrollpos = scrollpos;
  var accel = 0;


  // ---- Values you can tweak: ----
  var accelamount = 0.1; //How fast the video will try to catch up with the target position. 1 = instantaneous, 0 = do nothing.

  // pause video on load
  vid.pause();
   
  window.onscroll = function(){
      //Set the video position that we want to end up at:
      targetscrollpos = window.pageYOffset/400;
      updateProgressBar();
  };
  //Progress bar
  function updateProgressBar() {
      var progressBar = document.getElementById('progress-bar');
      var percentage = Math.floor((100 / vid.duration) *
      vid.currentTime);
      progressBar.value = percentage;
      if (vid.currentTime == 0){
        progressBar.value = 0;
      }
  }

  setInterval(function(){  
          
        
      //Accelerate towards the target:
      scrollpos += (targetscrollpos - scrollpos)*accelamount;
  
  
      //update video playback
      vid.currentTime = scrollpos;
      vid.pause();
      
  }, 40);  
});

//video resize
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
