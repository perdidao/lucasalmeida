$(document).ready(function(){

	// Abas
	$('#abas li a').click(function(e){
		e.preventDefault();

		$('#abas li a').removeClass('active');
		$(this).addClass('active');

		var aba = $(this).attr('data-aba');

		$('.aba').hide();
		$('#'+aba).show();
	});

	// Representantes
	$('#uf-dropdown').click(function(e){
		e.preventDefault();

		$('#lista-estados').slideToggle();

	});

	$('#lista-estados li a').click(function(e){
		e.preventDefault();

		var valor = $(this).text();
		$('#estado').val(valor);

		$('#lista-estados').slideUp();

	});

});