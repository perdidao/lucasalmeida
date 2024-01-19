// Saudações
console.log('feito com ♥ pelo estudioffw.com');

// Banners
$('#banners').owlCarousel({
	items:1,
	singleItem:true
});

// Cardápio
$('#pratos ul').owlCarousel({
	items:3,
	center:true,
	loop:true,
	nav:true,
	margin:20,
	responsiveClass:true,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:2,
            nav:false
        },
        1000:{
            items:3
        }
    }
});

//---- Interação entre seção e pratos
$('#tipos li a').click(function(e){
	e.preventDefault();

	// Capta a seção selecionada
	var secao = '.'+$(this).attr('data-lista');

	// Limpa a seleção anterior
	$('#tipos li a').removeClass('active');
	$('#pratos ul').removeClass('shown');

	// Mostra a nova seleção
	$(this).addClass('active');
	$(secao).addClass('shown');

});

// Menu
var item = $('#menu a');

item.click(function(){
    var ancora = $(this).attr('href');
    var distancia = $(ancora).offset().top;
    $('html, body').animate({
        scrollTop: distancia
    }, 1000);
    return false;
});

$(document).scroll(function(){

    var documento = $(document).scrollTop() + 10;
    var inicio = $('#header').offset().top;
    var sobre = $('#sobre').offset().top;
    var cardapio = $('#cardapio').offset().top;
    var redes = $('#facebook').offset().top;
    var contato = $('#fotos').offset().top;

    if(documento < inicio){
        item.removeClass('active');
    }
    if(documento >= inicio && documento < sobre){
        item.removeClass('active');
        item.eq(0).addClass('active');
    }
    if(documento >= sobre && documento < cardapio){
        item.removeClass('active');
        item.eq(1).addClass('active');
    }
    if(documento >= cardapio && documento < redes){
        item.removeClass('active');
        item.eq(2).addClass('active');
    }
    if(documento >= redes && documento < contato){
        item.removeClass('active');
        item.eq(3).addClass('active');
    }
    if(documento >= contato){
        item.removeClass('active');
        item.eq(4).addClass('active');
    }

});