// Saudações
console.log('feito com ♥ pelo estudioffw.com');

// Menu
$('#btn-menu').click(function(){
    $(this).toggleClass('active');
    $('#menu-principal').fadeToggle();
});

// Carrossel das últimas notícias
$('#lista-ultimas').owlCarousel({
	items:1,
	singleItem:true,
	loop:true,
	dots:true,
	autoplay:true,
	autoplayTimeout:10000
});

// Reduzindo o header
var topo;
var ultimoScroll = 0;

$(document).scroll(function(){

	topo = $(this).scrollTop();

	// Muda o tamano
	if(topo >= 1){

		$('body').addClass('smaller');
		$('#header').addClass('smaller');

		// Verifica o scroll
		if (topo < ultimoScroll){
			$('body').removeClass('smaller');
			$('#header').removeClass('smaller');
		}

	}

	if(topo >= 500){
		$('#erre').removeClass('hidden').addClass('fadeInLeftBig');
	}

	ultimoScroll = topo;

});

// Voltar ao topo
$('#voltar').click(function(e){
	e.preventDefault();

	var distancia = $('body').offset().top;
    $('html, body').animate({
        scrollTop: distancia
    }, 1000);
    
});