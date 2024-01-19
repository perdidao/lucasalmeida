// Saudações
console.log('desenvolvido com ♥ pelo Estúdio Álamo');

// Interação do menu
$('#btn-menu').click(function(e){
	e.preventDefault();

	$(this).toggleClass('active');
	$('#menu-wrapper').stop(true,true).fadeToggle();

});

// Carrossel de Banners
$('#banners ul').owlCarousel({
	items:1,
	singleItem:true,
	dots:true,
	loop:true,
	autoplay:true,
	autoplayTimeout:7000
});

// Organização dos projetos
$('#lista-projetos').masonry({
  itemSelector: '#lista-projetos li',
  columnWidth: '#lista-projetos li',
  percentPosition:true
});

// Carrossel de marcas
$('#clientes ul').owlCarousel({
	items:5,
	dots:true,
	loop:true,
	autoplay:true,
	autoplayTimeout:5000,
	responsive:{
        0:{
            items:1,
            dots:false
        },
        360:{
            items:2,
            dots:false
        },
        640:{
            items:3,
            dots:false
        },
        860:{
            items:5
        }
    }
});

// Carrossel de fotos
$('#galeria').owlCarousel({
    items:2,
    nav:true,
    loop:true,
    autoplay:true,
    autoplayTimeout:7000,
    responsive:{
        0:{
            items:1,
            nav:false
        },
        540:{
            items:2
        }
    }
});