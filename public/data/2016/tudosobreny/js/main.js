// BUSCA
$('#btn-busca').click(function(e){
	e.preventDefault();

	$(this).toggleClass('active');
	$('#busca').slideToggle();

});

// DESTAQUES
var destaque = $('#destaques');
destaque.owlCarousel({
	items:1,
	singleItem:true,
	autoPlay:7000
});

$('#destaques .post').hover(function(){

	$(this).find('.hover p').stop(true,true).slideToggle();

});