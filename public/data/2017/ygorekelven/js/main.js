// Saudações
console.log('feito com ♥ pelo estudioffw.com');

// Parallax
if (window.matchMedia("(min-width:640px)").matches){
	$('#header .parallax').parallax({
		mouseport: $('#header'),
		xparallax:'200px',
		yparallax:'100px'
	},{
		mouseport: $('#header'),
		xparallax:'100px',
		yparallax:'0px'
	});
}

// Sobre
$('#sobre').owlCarousel({
	items:1,
	singleItem:true,
	nav:true
});

// Sobre
$('#agenda ul').owlCarousel({
	items:3,
	dots:true,
	responsive:{
        0:{
            items:1
        },
        600:{
        	items:2
        },
        900:{
            items:3
        }
    }
});