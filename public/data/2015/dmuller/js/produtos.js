$(document).ready(function(){

	// Filtros
	$('#filtro-dropdown').click(function(e){
		e.preventDefault();

		$('#lista-filtros').slideToggle();

	});

	$('#lista-filtros li a').click(function(e){
		e.preventDefault();

		var valor = $(this).text();
		$('#filtro').val(valor);

		$('#lista-filtros').slideUp();

	});

});