$('.imgUpload').on('change', function(){
     var upl = $(this);
     var countFiles = $(this)[0].files;
     var imgPath = $(this)[0].value;
     var extn = imgPath.substring(imgPath.lastIndexOf('.') + 1).toLowerCase();
     var image_holder = upl.parent().find('.img-holder');
     var btn = upl.parent().find('#uploadBtn')
     image_holder.empty();

     if (extn == "gif" || extn == "png" || extn == "jpg" || extn == "jpeg") {
         if (typeof (FileReader) != "undefined") {
 
             //loop for each file selected for uploaded.
             for (var i = 0; i < countFiles.length; i++) {
             	btn.hide();
 				var reader = new FileReader();
                 	reader.onload = function (e) {
                     	$("<img />", {
                         	"src": e.target.result,
                             	"class": "thumb-image"
                     	}).appendTo(image_holder);
                	 }
                	 var file = countFiles[i];
                	 setTimeout(function(){
                	 	$('<img class="refresh" src="./images/refresh.svg">').appendTo(image_holder);
                	 	$('<span style="display: block">'+file.name+'</span>').appendTo(image_holder);
                	 }, 200);

             	image_holder.show();
                reader.readAsDataURL($(this)[0].files[i]);
                
             }
 
         } else {
             alert("Ваш браузер не поддерживает FileReader API!");
         }
     } else {
         alert("Пожалуйста, выберите картинку (.gif, .png, .jpg, .jpeg)");
         $(".img-holder").hide();
         $("#uploadBtn").show();
     }

});