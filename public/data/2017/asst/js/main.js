// Saudações
console.log('feito com ♥ pelo estudioffw.com');

// Interação do menu
$('#btn-menu').click(function(e){
	e.preventDefault();

	$(this).toggleClass('active');
	$('#nav').fadeToggle();
	$('#blur').toggleClass('active');

});

// Rotação de notícias
$('#noticias ul').owlCarousel({
	items:1,
	singleItem:true,
	loop:true,
	autoplay:true,
	autoplayTimeout:7000,
	dots:true
});

// Rotação de clientes
$('#clientes ul').owlCarousel({
	items:6,
	loop:true,
	autoplay:true,
	autoplayTimeout:7000,
	nav:true,
	responsive:{
        0:{
            items:1
        },
        600:{
        	items:2
        },
        800:{
            items:3
        },
        1000:{
        	items:4
        },
        1300:{
            items:6
        }
    }
});

// Rotação de fotos
$('#lista-galerias').owlCarousel({
	items:1,
	singleItem:true,
	loop:true,
	nav:true
});

// Rotação de videos
$('#videos ul').owlCarousel({
	items:1,
	singleItem:true,
	loop:true,
	nav:true
});

// Scroll
if (window.matchMedia("(min-width:1120px)").matches) {
	$('#scroll').jScrollPane();
}