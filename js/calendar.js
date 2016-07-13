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
	    }else if ( i == 7 && D.getMonth() == 6){
	    	calendar += '<td>' + '<div class="day-content event-cont">' + '<span>' + i + '</span>' +'<div class="event self"><a href="#" class="link">День отказа от курения</a></div>' +
	    	'<div class="event common"><a href="#" class="link">День закаливания</a></div>';
	    } else if ( i == 3 && D.getMonth() == 6){
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
//переключение месяца на один назад 
$(document).on('click', '.calendar .switcher.left', function(){
	eventday();
	$('#calendar').fadeOut(function(){
		var year = $('.month').attr('data-year');
		var month = parseFloat($('.month').attr('data-month')) - 1;
		calendar('calendar', year, month);
		$('#calendar').fadeIn();	
	});
});
//переключатель месяца вперед
$(document).on('click', '.calendar .switcher.right', function(){
	eventday();
	$('#calendar').fadeOut(function(){
		var year = $('.month').attr('data-year');
		var month = parseFloat($('.month').attr('data-month')) + 1;
		calendar('calendar', year, month);
		$('#calendar').fadeIn();
	});
});
//more 

function eventday(){
	$('.day-content').each(function(){
	var ths = $(this);
	var day = $(this).children('span');
	if (ths.hasClass('event-cont')){
		var eventCount = ths.find('.event').length;
		var elems = ths.find('.event')
		var elems_to_hide = ths.find('.event:gt(1)');
		if( eventCount > 3 ){
			elems_to_hide.hide();
			$('<div class="event more"><a href="#" class="link">Еще</a><div>').appendTo(ths);
			$('.more a').click(function(e){
				e.preventDefault();
				$('<div class="more-events-block"><a href="#" class="close">X</a></div>').appendTo(ths);
				$(day).appendTo(ths);
				var more_events = ths.find('.more-events-block');
				$(elems).each(function(){
					$(this).clone().appendTo(more_events);
				});
			});
		}
	}
	});	
}

eventday();