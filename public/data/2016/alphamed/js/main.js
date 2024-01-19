// Saudações
console.log('feito com ♥ pelo estudioffw.com');

// Menu
var item = $('#nav a');

item.click(function(){
	var ancora = $(this).attr('href');
	var distancia = $(ancora).offset().top - 140;
    $('html, body').animate({
        scrollTop: distancia
    }, 1000);
    return false;
});

// Banners
$('#banner').owlCarousel({
	items:1,
	singleItem:true,
	loop:true,
	autoplay:true,
	autoplayTimeout:6000,
	nav:true
});

// Especialidades
$('#lista-especialidades li .icone').click(function(){

	$('#lista-especialidades li').removeClass('active');
	$(this).parent().addClass('active');

	$('#lista-especialidades li .tooltip').fadeOut();
	$(this).parent().find('.tooltip').fadeIn();

});

$('#lista-especialidades li .fechar').click(function(e){
	e.preventDefault();

	$('#lista-especialidades li').removeClass('active');
	$('#lista-especialidades li .tooltip').fadeOut();

});

// Exames
$('#exames li > a').click(function(e){
	e.preventDefault();

	$('#exames .tooltip').fadeOut();
	$(this).parent().find('.tooltip').fadeIn();

});

$('#exames .fechar').click(function(e){
	e.preventDefault();

	$(this).parent().fadeOut();

});

// Contato
$('#contato li').click(function(){

	var item = '#' + $(this).attr('data-item');

	$('#contato li').removeClass('active');
	$(this).addClass('active');

	$('.mapa').hide();
	$(item).fadeIn();

});