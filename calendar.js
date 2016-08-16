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
/*	if (document.querySelectorAll('#'+id+' tbody tr').length < 6) {  // чтобы при перелистывании месяцев не "подпрыгивала" вся страница, добавляется ряд пустых клеток. Итог: всегда 6 строк для цифр
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