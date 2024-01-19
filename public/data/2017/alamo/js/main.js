// Saudações
console.log('desenvolvido com ♥ pelo Estúdio Álamo');

// Resize do menu
if(window.matchMedia("(min-width: 860px)").matches){
$(document).scroll(function(){
	var distancia = $(document).scrollTop();

	if(distancia >= 120){
		$('#header').addClass('scrolled');
	} else if(distancia < 120){
		$('#header').removeClass('scrolled');
	}
});
}

// Scroll do menu
var item = $('#menu a');

item.click(function(){
    var espaco = $($(this).attr('href')).offset().top - 120;
    $('html, body').animate({
        scrollTop: espaco
    }, 1000);
    return false;
});


// Rotação das headlines
$('#headlines').owlCarousel({
	items:1,
	singleItem:true,
	dots:true,
	autoplay:true,
	autoplayTimeout:10000,
	autoHeight:true,
	loop:true
});

// Rotação das frases
$('#quotes').owlCarousel({
	items:1,
	singleItem:true,
	autoplay:true,
	autoplayTimeout:5000,
	loop:true,
	autoHeight:true
});