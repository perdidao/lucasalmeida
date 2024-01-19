// Saudações
console.log('feito com ♥ pelo estudioffw.com');

// Menu
$('#btn-menu').click(function(e){
	e.preventDefault();

	$(this).toggleClass('active');
	$('#menu').slideToggle();

});

// Banner
$('#banner').owlCarousel({
	items:1,
	singleItem:true,
	autoplay:true,
	autoplayTimeout:5000,
	loop:true
});

// Depoimentos
$('#depoimentos ul').owlCarousel({
	items:1,
	singleItem:true,
	autoplay:true,
	autoplayTimeout:5000,
	loop:true
});

// Perguntas
$('#lista-perguntas li a').click(function(e){
	e.preventDefault();

	$('#lista-perguntas li a').removeClass('active');
	$(this).addClass('active');

	$('.resp').slideUp();
	$(this).parent().find('.resp').stop(true,true).slideDown();

});