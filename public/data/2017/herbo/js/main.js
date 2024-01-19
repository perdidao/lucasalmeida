// Saudações
console.log('feito com ♥ pelo estudioffw.com');

// Interação do menu
$('#btn-menu').click(function(){
    $(this).toggleClass('active');
    $('#menu').toggleClass('opened');
    $('#global-wrapper').toggleClass('opened');
});

// Parallax do topo
if (window.matchMedia("(min-width: 1024px)").matches) {
	var rellax = new Rellax('.rellax');
}

// Slider de resultados
$('#resultados').owlCarousel({
	items:1,
	singleItem:true,
	dots:true
});