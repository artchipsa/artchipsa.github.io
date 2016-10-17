// THIS SETS UP THE INITIAL ARRAY VARIABLE
// Array of images to swap between
var images = [];
var length = $('#load').data('img');
//preloader
setTimeout(function(){
    window.scrollBy(0, 40000);
},1500);

setTimeout(function(){
    $(window).scrollTop(0);
}, 2000);

setTimeout(function(){
    $('.preloader').fadeOut();
    window.preventAction = false;
},5500);

// THIS LOOKS AT THE DATA ATTRIBUTES IN THE load element AND GENERATES 
// THE IMAGE NAMES BASED ON A GIVEN RANGE 
// THEN PUSHES THEM INTO THE ARRAY
for (var i = 1; i <= length; i++) {
    images.push('Track/Track_' + i + '.jpg');
    var image = document.images[0];
    var downloadingImage = new Image();
    downloadingImage.onload = function(){
        image.src = this.src;   
    };
    downloadingImage.src = "Track/Track_' + i + '.jpg";
}


// THIS TAKES EACH IMAGE NAME FROM THE ARRAY AND CREATES A CLUSTER OF
// PRELOADED HIDDEN IMAGES ON THE PAGE USING JQUERY
$(images).each(function () {
    $('<img />')[0].src = this;
});


var totalImages = images.length;
console.log('totalImages', totalImages);

var pageHeight = $(document).height();

// Work out how often we should change image (i.e. how far we scroll between changes)
var scrollInterval = Math.floor(pageHeight / totalImages);

var viewport = $(window),
    slowdown;

viewport.on('scroll', function () {
    // Which one should we show at this scroll point?
    i = Math.floor($(this).scrollTop() / scrollInterval);
    console.log('i', i);
    // Show the corresponding image from the array
    $('.divvideo img').attr('src', images[i]);
    //$('b').text('Frame: ' + i);

    // IN THIS EXAMPLE WE WANT TO START OUR IMAGE SEQUENCE AT 160 AND ADVANCE TO THE NEXT IMAGE
    // AFTER WE SCROLL 20 PIXELS
    slowdown = Math.ceil(viewport.scrollTop() / 20);



    // THIS IS WHERE WE'RE SETTING OUR ACTIVE STATES FOR THE SIDE NAVIGATION BASED ON 
    // SLOWDOWN POSITION
/*    if (slowdown >= 1 && slowdown <= 100 || slowdown >= 300) {
        $('.box').removeClass('active');
        $('#front').addClass('active');
    } else if (slowdown >= 100 && slowdown <= 200) {
        $('.box').removeClass('active');
        $('#left').addClass('active');
    } else if (slowdown >= 201 && slowdown <= 299) {
        $('.box').removeClass('active');
        $('#back').addClass('active');
    }*/
});