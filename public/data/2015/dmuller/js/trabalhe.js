$(document).ready(function(){

	// INTERAÇÃO DA AGENDA
	$('#vagas li a').click(function(e){
		e.preventDefault();

		var content = $('.job-info');
		var localContent = $(this).parent().find('.job-info');

		$('#vagas li a').not(this).removeClass('opened');
		$(this).toggleClass('opened');

		content.not(localContent).slideUp();
		localContent.slideToggle();

	});

});