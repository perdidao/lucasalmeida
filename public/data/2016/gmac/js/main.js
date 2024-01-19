// Saudações
console.log('feito com ♥ pelo estudioffw.com');

// Menu
$('#btn-menu').click(function(){
    $(this).toggleClass('active');
    $('#menu').slideToggle();
});

// Banner
$('#banners').owlCarousel({
	items:1,
	singleItems:true,
	nav:true,
	autoplay:true,
	autoplayTimeout:6000,
	loop:true
});