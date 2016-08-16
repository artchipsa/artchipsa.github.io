$(function() {
    $('.branding-block').find('img').attr('draggable', false);

    //Функционал календаря 

    function calendar(id, year, month){

    var Dlast = new Date(year,month+1,0).getDate(),
        D = new Date(year,month,Dlast),
        DNlast = new Date(D.getFullYear(),D.getMonth(),Dlast).getDay(),
        DNfirst = new Date(D.getFullYear(),D.getMonth(),1).getDay(),
        calendar = '<tr>',
        month=["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];
        
        //Если месяц начинается не с понедельника. 
        if (DNfirst != 0) {
           for(var  i = 1; i < DNfirst; i++) calendar += '<td class="empty">';
        }else{
           for(var  i = 0; i < 6; i++) calendar += '<td>';
        }
        //заполнение календаря
        for(var  i = 1; i <= Dlast; i++) {
            if (i == new Date().getDate() && D.getFullYear() == new Date().getFullYear() && D.getMonth() == new Date().getMonth()) {
              calendar += '<td class="today">' + '<div class="day-content">' + '<span>' + i;
             //Эти 2 ифа для того, чтобы показать как будут вставляться события. Не знаю как это будет реализовано в связске с данными.
            }else if ( i == 7 && D.getMonth() == 7){
                calendar += '<td>' + '<div class="day-content event-cont">' + '<span>' + i + '</span>' +'<div class="event self"><a href="#" class="link">День отказа от курения</a></div>' +
                '<div class="event common"><a href="#" class="link">День закаливания</a></div>' +
                '<div class="event common"><a href="#" class="link">День закаливания</a></div>' +
                '<div class="event common"><a href="#" class="link">День закаливания</a></div>';
            } else if ( i == 11 && D.getMonth() == 7){
                calendar += '<td>' + '<div class="day-content event-cont">' + '<span>' + i + '</span>' +'<div class="event self"><a href="#" class="link">День отказа от курения</a></div>' +
                '<div class="event common"><a href="#" class="link">День закаливания</a></div>' + '<div class="event common"><a href="#" class="link">День закаливания</a></div>' +
                '<div class="event common"><a href="#" class="link">День закаливания</a></div>';
            }else {
              calendar += '<td>' + '<div class="day-content">' + '<span>' + i;
            } 
            
            if (new Date(D.getFullYear(),D.getMonth(),i).getDay() == 0) {
              calendar += '<tr>';
            }
        }
        document.querySelector('#'+id+' tbody').innerHTML = calendar;
        //вывод месяца и года в переключатор
        document.querySelector('.month').innerHTML = month[D.getMonth()] +' '+ D.getFullYear();
        document.querySelector('.month').dataset.month = D.getMonth();
        document.querySelector('.month').dataset.year = D.getFullYear();;
    /*  if (document.querySelectorAll('#'+id+' tbody tr').length < 6) {  // чтобы при перелистывании месяцев не "подпрыгивала" вся страница, добавляется ряд пустых клеток. Итог: всегда 6 строк для цифр
            document.querySelector('#'+id+' tbody').innerHTML += '<tr><td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;';
        }*/
    }
    calendar("calendar", new Date().getFullYear(), new Date().getMonth());
    eventday();
    //переключение месяца на один назад 
    $(document).on('click', '.calendar .switcher.left', function(){
        setTimeout(function(){
            var year = $('.month').attr('data-year');
            var month = parseFloat($('.month').attr('data-month')) - 1;
            calendar('calendar', year, month);
            $('#calendar').fadeIn();    
            eventday();
        }, 250);
        $('#calendar').fadeOut(250);
    });
    //переключатель месяца вперед
    $(document).on('click', '.calendar .switcher.right', function(){
        $('#calendar').fadeOut(250);
        setTimeout(function(){
            var year = $('.month').attr('data-year');
            var month = parseFloat($('.month').attr('data-month')) + 1;
            calendar('calendar', year, month);
            $('#calendar').fadeIn();
            eventday();
        }, 250);
    });
    //more 

    function eventday(){
        $('.day-content.event-cont').each(function(){
            var ths = $(this);
            var day = $(this).children('span').text();
            var eventCount = ths.find('.event').length;
            var elems = ths.find('.event')
            var elems_to_hide = ths.find('.event:gt(1)');
            if( eventCount > 3 ){
                elems_to_hide.hide();
                $('<div class="event more"><a href="#" class="link">Еще</a><div>').appendTo(ths);
                var link = $(this).find('.more a');
                link.click(function(e){
                    e.preventDefault();
                    var app_block = ths.find('.more-events-block');
                    app_block.remove();
                    $('<div class="more-events-block"><a href="#" class="close"><img src="images/close.svg" alt="" /></a></div>').appendTo(ths);
                    var more_events = ths.find('.more-events-block');
                    $('<span>'+day+'</span>').appendTo(more_events);
                    $(elems).each(function(){
                        $(this).clone().appendTo(more_events);
                    });
                    ths.find('.more-events-block').show().animate({opacity: 1}, 350);
                });
            }
        }); 
    }

    $(document).on('click', '.more-events-block .close', function(){
        $(this).parent().animate({opacity: 0}, 350, function(){
            $(this).hide();
        });
        return false;
    });

    $('a[data-role="tooltip"]').hover(function(){
        var ths = $(this);
        var text = $(this).data('text');
        if (ths.find('.gradient-tooltip').length == 0){
            $('<div class="gradient-tooltip"><div>'+text+'</dvi></div>').appendTo(ths);
        }
        ths.find('.gradient-tooltip').animate({opacity: 1}, 250);
    }, function(){
        var ths = $(this);
        ths.find('.gradient-tooltip').animate({opacity: 0}, 200, function(){
            ths.find('.gradient-tooltip').remove();
        });
    });





    //Маска телефона 

    $('input[type="tel"]').inputmask("+7-(999)-999-99-99");

    $(".cs-select").each(function() {
        var options = $.extend({
            sortField: 'text',
            searchField: false,
            placeholder: true
        }, $(this).data());
        $(this).selectize(options);
    });

    $('#city-choose').selectize({
        create: true,
        sortField: 'text'
    });

    var $searchInput = $('.header .search-block').find('input'),
        $searchButton = $('.header .search-block').find('.search-button');
    $searchInput.on('focus', function() {
        $('.header .search-block').animate({
            width: 300,
            marginRight: 100
        }, 350);
        $searchButton.animate({
            width: 100,
            right: -120
        }, 350);
    });
    $searchInput.on('focusout', function() {
        $('.header .search-block').animate({
          width: 400,
          marginRight: 0
        }, 350);
        $searchButton.animate({
          width: 0,
          right: -20
        }, 350);
    });

    if ($.datepicker) {
        $.datepicker.regional['ru'] = {
            closeText: 'Закрыть',
            prevText: '&#x3c;Пред',
            nextText: 'След&#x3e;',
            currentText: 'Сегодня',
            monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
                'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
            monthNamesShort: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
                'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
            dayNames: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
            dayNamesShort: ['вск', 'пнд', 'втр', 'срд', 'чтв', 'птн', 'сбт'],
            dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
            weekHeader: 'Не',
            dateFormat: 'dd.mm.yy',
            firstDay: 1,
            isRTL: false,
            showMonthAfterYear: false,
            yearSuffix: '',
            changeMonth: true,
            changeYear: true,
            yearRange: "-80y:-16y",
            defaultDate: "-30y"
        };
        $.datepicker.setDefaults($.datepicker.regional['ru']);
    }

    $(".input-datepicker").datepicker({
        beforeShow: function (input, instance) {
            var $dpDiv = $("#ui-datepicker-div");
            $dpDiv.addClass("datepicker-pad");
        }
    });

    var authPopup = new Popup({
        $popup: $(".popup.auth")
    });

    $(".link.auth").on("click", function(event) {
        authPopup.open();
        event.stopPropagation();
    });

    var ordinatoryPopup = new Popup({
        $popup: $(".popup.ordinatory")
    });

    $(".link.ordinatory").on("click", function(event) {
        ordinatoryPopup.open();
        event.stopPropagation();
    });

    var appointment = new Popup({
        $popup: $('.popup.appointment')
    });

    $('.toAppointment').on('click', function(event){
        appointment.open();
        event.stopPropagation();
    });

    $(".menu-link").on("mouseenter", function() {
        var $this = $(this);
        $this.addClass("js-hover");
        setTimeout(function() {
            if ($this.hasClass("js-hover")) {
                $this.siblings(".tooltip").show();
            }
        }, 1500);
    }).on("mouseleave", function() {
        $(this).removeClass("js-hover");
        $(this).siblings(".tooltip").hide();
    });

    $(".substrate").click(function() {
        $(".menu-link").parent().siblings().removeClass("open");
        $(this).hide();
    });

    var $tabControl = $(".tab-control");
    $tabControl.find(".sheets .sheet").eq(0).addClass("active").siblings().removeClass("active");
    $tabControl.find(".tabs .tab").eq(0).addClass("active").siblings().removeClass("active");
    $tabControl.find(".sheets-deep .sheet").eq(0).addClass("active").siblings().removeClass("active");
    $tabControl.find(".tabs-deep .tab").eq(0).addClass("active").siblings().removeClass("active");
    var $tabControlDeep = $('.tab-control .tab-control');
    $tabControl.each(function() {
       var $tc = $(this);
        $tc.find(".tabs .tab").on("click", function() {
            var index = $(this).index();
            $tc.find(".sheets .sheet").eq(index).addClass("active").siblings().removeClass("active");
            $tc.find(".tabs .tab").eq(index).addClass("active").siblings().removeClass("active");
        });
        $tc.find(".tabs-deep .tab").on('click', function() {
            var index = $(this).index();
            $tc.find(".sheets-deep .sheet").eq(index).addClass("active").siblings().removeClass("active");
            $tc.find(".tabs-deep .tab").eq(index).addClass("active").siblings().removeClass("active");
        });
    });

    $(".add-comment").hide();
    $(".add-comment-button").on("click", function(){
        if ($(this).hasClass("active")) {
            $(this).removeClass("active")
            $(".add-comment").hide(300);
        } else {
            $(this).addClass("active")
            $(".add-comment").show(300);
        }
    });

    $(".add-review").hide();
    $(".add-review-button").on("click", function(){
        if ($(this).hasClass("active")) {
            $(this).removeClass("active")
            $(".add-review").hide(300);
        } else {
            $(this).addClass("active")
            $(".add-review").show(300);
        }
    });

    $(".add-review .rating-stars").each(function() {
        var $this = $(this);
        var $stars = $this.find(".star");
        var $value = $this.find(".rating-value");
        $stars.on("mouseenter", function () {
            var $this = $(this);
            $stars.addClass("empty").removeClass("full").removeClass("chosen");
            for (i = 0; i <= $this.index(); i++) {
                $stars.eq(i).addClass("full").removeClass("empty");
            }
        }).on("click", function () {
            var $this = $(this);
            for (i = 0; i <= $this.index(); i++) {
                $stars.eq(i).addClass("chosen").removeClass("empty");
            }
            $value.val($this.index() + 1);
        });
        $this.on("mouseleave", function () {
            $stars.addClass("empty").removeClass("full");
            for (i = 0; i < $value.val(); i++) {
                $stars.eq(i).addClass("chosen").removeClass("empty");
            }
        });
    });

    $('.gallerywrap').slick({
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 3,
        responsive: [
            {
                breakpoint: 1260,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            }]
    });

    var rtree = document.forms.rtree;
    if (rtree) {
        var fieldset = [].filter.call(rtree.querySelectorAll('fieldset'), function (element) {
            return element;
        });
        fieldset.forEach(function (eFieldset) {
            var main = [].filter.call(rtree.querySelectorAll('[type="checkbox"]'), function (element) {
                return element.parentNode.nextElementSibling == eFieldset;
            });
            main.forEach(function (eMain) {
                var all = eFieldset.querySelectorAll('[type="checkbox"]');
                eFieldset.onchange = function () {
                    var allChecked = eFieldset.querySelectorAll('[type="checkbox"]:checked').length;
                    eMain.checked = allChecked > 0 && allChecked <= all.length;
                };
                eMain.onclick = function () {
                    for (var i = 0; i < all.length; i++)
                        all[i].checked = this.checked;
                }
            });
        });
    }

    $(".image-wrap").each(function() {
        var $this = $(this);
        var $fileInput = $this.find("input[type=file]");
        var $selectImage = $this.find(".select-image");
        var $noFile = $this.find(".nofile");
        var $previewWrap = $this.find(".preview-wrap");

        $this.find(".select-image").on("click", function() {
            $fileInput.click();
        });

        $this.find(".remove").on("click", function() {
            $fileInput.wrap('<form>').closest('form').get(0).reset();
            $fileInput.unwrap();

            $(".image-wrap").find(".remove").hide();
            $previewWrap.css({
                backgroundImage: "url(../images/userpic.svg)",
                backgroundColor: "#dce4f5",
                backgroundSize: "42px 55px"
            });
            $selectImage.html('Загрузить фото');
            $noFile.show();
        });

        $fileInput.on("change", function() {
            loadPreview(this);
        });

        var loadPreview = function(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                $this = $(input);
                reader.trg = $this;
                reader.onload = function (e) {

                    $(".image-wrap").find(".remove").show();
                    $previewWrap.css({
                        backgroundImage: "url(" + e.target.result + ")",
                        backgroundColor: "#fff",
                        backgroundSize: "cover"
                    });
                    $selectImage.html('Изменить фото');
                    $noFile.hide();
                };
                reader.readAsDataURL(input.files[0]);
            }
        }
    });

    $('.photos-wrap').on('click', ".select-photo", function(){
        $('.photos-wrap input[type=file]').trigger('click');
    });

    $("#uploader").plupload({
        // General settings
        runtimes : 'html5,flash,silverlight,html4',
        url : 'js/plugins/plupload-2.1.8/examples/upload.php',

        // User can upload no more then 20 files in one go (sets multiple_queues to false)
        max_file_count: 20,

        chunk_size: '1mb',

        // Resize images on clientside if we can
        resize : {
            width : 200,
            height : 200,
            quality : 90,
            crop: true // crop to exact dimensions
        },

        filters : {
            // Maximum file size
            max_file_size : '1000mb',
            // Specify what files to browse for
            mime_types: [
                {title : "Image files", extensions : "jpg,gif,png"}/*,
                 {title : "Zip files", extensions : "zip"}*/
            ]
        },

        // Rename files by clicking on their titles
        rename: true,

        // Sort files
        sortable: true,

        // Enable ability to drag'n'drop files onto the widget (currently only HTML5 supports that)
        dragdrop: true,

        // Views to activate
        views: {
            list: false,
            thumbs: true, // Show thumbs
            active: 'thumbs'
        },

        // Flash settings
        flash_swf_url : 'js/plugins/plupload-2.1.8/js/Moxie.swf',

        // Silverlight settings
        silverlight_xap_url : 'js/plugins/plupload-2.1.8/js/Moxie.xap'
    });


    // Handle the case when form was submitted before uploading has finished
    $('#upload').submit(function(e) {
        // Files in queue upload them first
        if ($('#uploader').plupload('getFiles').length > 0) {

            // When all files are uploaded submit form
            $('#uploader').on('complete', function() {
                $('#upload')[0].submit();
            });

            $('#uploader').plupload('start');
        } else {
            alert("You must have at least one file in the queue.");
        }
        return false; // Keep the form from submitting
    });

    // calendar 

    

});