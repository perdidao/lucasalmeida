$('.btn-visita').click(function(e){
	e.preventDefault();

	$('#overlay-visita').fadeIn();
});

$('.btn-textos').click(function(e){
	e.preventDefault();

	var objeto = $(this).attr('id');

	$('#overlay-'+objeto).fadeIn();
});