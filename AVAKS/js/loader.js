/*setTimeout(function(){
    $(window).scrollTop(0);
}, 500);

setTimeout(function(){
    $('.preloader').fadeOut();
    window.preventAction = false;
},12800);*/

var canvas = document.getElementById('scene'),
	ctx = canvas.getContext('2d'),
	particles = [];

function drawScene(){
	canvas.width = png.width*8;
 	canvas.height = png.height*8;

	ctx.drawImage(png, 0, 0);

	var data = ctx.getImageData(0, 0, png.width, png.height);
	ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  	ctx.fillStyle = "black";
  
	for (var y = 0, y2 = data.height; y < y2; y++) {
	    for (var x = 0, x2 = data.width; x < x2; x++) {
	      if (data.data[(y * 4 * data.width) + (x * 4) + 3] > 128) {
	        var particle = {
	          x0: x,
	          y0: y,
	          x1: png.width / Math.random() * (0),
     		  y1: png.height / Math.random() * (-10),
	          speed: Math.random() * 4
	        };
	        TweenMax.to(particle, particle.speed, {
	          x1: particle.x0,
	          y1: particle.y0,
	          delay: y / 26,
	          ease: Elastic.easeOut
	        });
	        particles.push(particle);
	      }
	    }
	}

  requestAnimationFrame(render);

}
var render = function() {
  requestAnimationFrame(render);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (var i = 0, j = particles.length; i < j; i++) {
    var particle = particles[i];
    ctx.fillRect(particle.x1 * 8, particle.y1 * 8, 2, 2);
  }

};

var png = new Image();
png.onload = drawScene;
png.src = 'data:image/png;base64,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';