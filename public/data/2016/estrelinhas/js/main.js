// Saudações
console.log('feito com ♥ pelo estudioffw.com');

// Menu
var item = $('#menu a').not('not');

item.click(function(){
	var ancora = $(this).attr('href');
	var distancia = $(ancora).offset().top - 135;
    $('html, body').animate({
        scrollTop: distancia
    }, 1000);
    return false;
});

$(document).scroll(function(){

	var documento = $(document).scrollTop() + 140;
	var sobre = $('#sobre').offset().top;
	var servicos = $('#servicos').offset().top;
	var blog = $('#blog').offset().top;
	var fotos = $('#fotos').offset().top;
	var contato = $('#newsletter').offset().top;

	if(documento < sobre){
		item.removeClass('active');
	}
	if(documento >= sobre && documento < servicos){
		item.removeClass('active');
		item.eq(0).addClass('active');
	}
	if(documento >= servicos && documento < blog){
		item.removeClass('active');
		item.eq(1).addClass('active');
	}
	if(documento >= blog && documento < fotos){
		item.removeClass('active');
		item.eq(2).addClass('active');
	}
	if(documento >= fotos && documento < contato){
		item.removeClass('active');
		item.eq(3).addClass('active');
	}
	if(documento >= contato){
		item.removeClass('active');
		item.eq(4).addClass('active');
	}

});

// Banners
var banners = $('#banners');
banners.owlCarousel({
	items:1,
	singleItem:true
});

$('#prev').click(function(e){
	e.preventDefault();

	banners.trigger('owl.prev');

});

$('#next').click(function(e){
	e.preventDefault();

	banners.trigger('owl.next');

});

// Serviços
$('#lista-servicos li a').fancybox();

// Galeria de fotos
$('#fotos li a').fancybox();

// Esclarecimento
$('#fechar').click(function(e){
	e.preventDefault();

	$('#disclaimer').fadeOut();

});