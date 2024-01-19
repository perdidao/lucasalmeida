// Saudações
console.log('feito com ♥ pelo estudioffw.com');

// Clique do Veja Mais
$('#header .btn').click(function(e){
	e.preventDefault();

	var anc = $(this).attr('href');
	var dist = $(anc).offset().top - 135;
    $('html, body').animate({
        scrollTop: dist
    }, 1000);
    return false;

});

// Clique do menu
var item = $('#nav a');

item.click(function(){
	var ancora = $(this).attr('href');
	var distancia = $(ancora).offset().top - 135;
    $('html, body').animate({
        scrollTop: distancia
    }, 1000);
    return false;
});

// Interação do menu no scroll
var distanciaTopo;
var distanciaNav = $('#nav').offset().top;
$(document).scroll(function(){
	distanciaTopo = $(document).scrollTop();

	if(distanciaTopo >= distanciaNav){

		$('#nav').addClass('fixed');
		$('#header').addClass('hack');

	} else if(distanciaTopo < distanciaNav){

		$('#nav').removeClass('fixed');
		$('#header').removeClass('hack');

	}

	// Rolagem dos links do menu

	var documento = $(document).scrollTop() + 140;
	var sobre = $('#sobre').offset().top;
	var pratos = $('#pratos').offset().top;
	var localizacao = $('#localizacao').offset().top;
	var contato = $('#localizacao').offset().top + 600;

	console.log(documento, sobre, pratos, localizacao, contato);

	if(documento < sobre){
		item.removeClass('active');
	}
	if(documento >= sobre && documento < pratos){
		item.removeClass('active');
		item.eq(0).addClass('active');
	}
	if(documento >= pratos && documento < localizacao){
		item.removeClass('active');
		item.eq(1).addClass('active');
	}
	if(documento >= localizacao && documento < contato){
		item.removeClass('active');
		item.eq(2).addClass('active');
	}
	if(documento >= contato){
		item.removeClass('active');
		item.eq(3).addClass('active');
	}

});

// Parallax
$('#parallax').parallax("0%", -0.2);

// Pratos
$('#lista-pratos').owlCarousel({
	items:3
});

// Localização
$('#lista-locais li a').click(function(e){
	e.preventDefault();

	var item = '#mapa-' + $(this).attr('data-item');

	// Troca o menu ativo
	$('#lista-locais li a').removeClass('active');
	$(this).addClass('active');

	$('.mapa').hide();
	$(item).fadeIn();

});