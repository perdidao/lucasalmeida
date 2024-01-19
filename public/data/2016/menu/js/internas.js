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
