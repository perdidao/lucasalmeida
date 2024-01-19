// Saudações
console.log('feito com ♥ pelo estudioffw.com');

// Banners
$('#banners').owlCarousel({
	singleItem:true,
	items:1,
	autoPlay:5000
});

// Interação do menu
var gadget = window.matchMedia('(max-width: 680px)');

if(gadget.matches){

	$('#btn-menu').click(function(){
	    $(this).toggleClass('active');
	    $('#nav').slideToggle();
	});

} else {

	$('.sub > a').click(function(e){
		e.preventDefault();

		$('#submenu').stop(true,true).slideDown();
		$(this).addClass('active');

	});

	$('.sub').mouseleave(function(){

		$('#submenu').stop(true,true).slideUp();
		$(this).find('a').removeClass('active');

	});

}

// Fotos
var fotos = $('#lista-fotos');

fotos.owlCarousel({
	items:3,
	itemsDesktop:[1000,3],
	itemsDesktopSmall:[900,3],
	itemsTablet:[820,2],
	itemsMobile:[420,1]
});

$('#prev-foto').click(function(e){
	e.preventDefault();

	fotos.trigger('owl.prev');

});

$('#next-foto').click(function(e){
	e.preventDefault();

	fotos.trigger('owl.next');

});
