// Saudações
console.log('feito com ♥ pelo estudioffw.com');

// Interação do topo
$('#btn-menu').click(function(e){
	e.preventDefault();

	$(this).toggleClass('active');
	$('#header').toggleClass('active');
	$('#menu-wrapper').fadeToggle();

});

$('.subbed > a').click(function(e){
	e.preventDefault();

	$(this).toggleClass('active');
	$(this).parent().find('.sub').stop(true,true).slideToggle();

});

// Banner
$('#banners').owlCarousel({
	items:true,
	singleItems:true,
	nav:true,
	dots:true,
	loop:true
});