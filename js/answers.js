$.fn.toggleHTML = function(a, b) {
    return this.html(function(_, html) {
        return $.trim(html) === a ? b : a;
    });
};

$(document).on('click', '.show-answer', function(e){
	e.preventDefault();
	var ths = $(this);
	if (ths.parents('.entity').find('.link.with').length == 1){
		ths.toggleHTML('Ответить', 'Скрыть');
		ths.parent().find('.answer-body').slideToggle(300);
	} else {
		ths.toggleHTML('Показать мой ответ', 'Скрыть мой ответ');
		ths.parent().find('.answer-body').slideToggle(300);
	}
});