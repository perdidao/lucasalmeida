$(document).ready(function(){

	// Interação do menu
	$('#btn-menu').click(function(e){
		e.preventDefault();

		$('#menu').slideToggle();
		$(this).toggleClass('aberto');

	});

});