// Saudações
console.log('feito com ♥ pelo estudioffw.com');

$('#banners').owlCarousel({
	items:1,
	singleItem:true,
	loop:true,
	autoplay:true,
	autoplayTimeout:5000,
	dots:true
});

$('.escolhas ul').owlCarousel({
	items:1,
	singleItem:true,
	loop:true,
	autoplay:true,
	autoplayTimeout:5000
});

// Parallax
if (window.matchMedia("(min-width: 1280px)").matches) {
	var rellax = new Rellax('.rellax');
}