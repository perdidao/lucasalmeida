// Saudações
console.log('feito com ♥ pelo estudioffw.com');

// Clique do menu
var item = $('#menu li a');

item.click(function(){
	var ancora = $(this).attr('href');
	var distancia = $(ancora).offset().top;
    $('html, body').animate({
        scrollTop: distancia
    }, 1000);
    return false;
});

// Interação do menu no scroll
$(document).scroll(function(){

	var documento = $(document).scrollTop() + 10;
	var home = $('#header').offset().top;
	var sobre = $('#sobre').offset().top;
	var proposta = $('#proposta').offset().top;
	var contato = $('#contato').offset().top;

	if(documento < home){
		item.removeClass('active');
	}
	if(documento >= home && documento < sobre){
		item.removeClass('active');
		item.eq(0).addClass('active');
	}
	if(documento >= sobre && documento < proposta){
		item.removeClass('active');
		item.eq(1).addClass('active');
	}
	if(documento >= proposta && documento < contato){
		item.removeClass('active');
		item.eq(2).addClass('active');
	}
	if(documento >= contato){
		item.removeClass('active');
		item.eq(3).addClass('active');
	}

});

// Banners
$('#banner').owlCarousel({
	items:1,
	singleItem:true,
	nav:true
});

// Áreas de atuação
$('#atuacao li a').click(function(e){
	e.preventDefault();

	$('.tooltip').fadeOut();
	$(this).parent().find('.tooltip').fadeIn();

});

$('.fechar').click(function(e){
	e.preventDefault();

	$(this).parent().fadeOut();

});