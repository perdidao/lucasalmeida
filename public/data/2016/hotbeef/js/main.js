// Saudações
console.log('feito com ♥ pelo estudioffw.com');

// Banners
$('#banners ul').owlCarousel({
	items:1,
	singleItem:true,
	autoplay:true,
	autoplayTimeout:4000
});

// Surpresinha
var surpresa = new Konami();
surpresa.code = function(){ alert('Israel viado!'); };
surpresa.load();