$('.btn-ghost').click(function(e){
	e.preventDefault();
	
	$('.overlay-reserva').fadeIn();	
});

$('#reservar').click(function(e){
	e.preventDefault();

	$('.overlay-reserva').fadeIn();

});

$('.btn-formulario').click(function(e){
	e.preventDefault();

	$('.overlay-reserva').fadeIn();

});

// PF OU PJ
$('#pf').click(function(e){
	e.preventDefault();

	$('.step').hide();
	$('.step1pf').show();
	$(this).addClass('active');
	$('#pj').removeClass('active');

});

$('#pj').click(function(e){
	e.preventDefault();

	$('.step').hide();
	$('.step1pj').show();
	$(this).addClass('active');
	$('#pf').removeClass('active');

});

// AVANÇAR
$('.avancar').click(function(e){
	e.preventDefault();

	var proximo = $(this).attr('data-step');
	var passo = $(this).attr('data-passo');
	$('.step').hide();
	$('.'+proximo).show();

	$('#reserva .passos').removeClass('passo1 passo2 passo3');
	$('#reserva .passos').addClass(passo);

});

// FECHAR
$('#fechar').click(function(e){
	e.preventDefault();

	$('.overlay-reserva').fadeOut();

});