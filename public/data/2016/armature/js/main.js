// INTERAÇÃO DO MENU

var item = $('#menu-fixed .menu a');

item.click(function(){
	var distancia = $($(this).attr('href')).offset().top - 80; 
    $('html, body').animate({
        scrollTop: distancia
    }, 1000);
    return false;
});

$(document).scroll(function(){

	var altura = $(document).scrollTop();

	if(altura >= 120){

		$('#menu-fixed').removeClass('hidden');

	} else if(altura < 120) {

		$('#menu-fixed').addClass('hidden');

	}

	var documento = $(document).scrollTop() + 80;
	var wedo = $('#we-do').offset().top;
	var vantagens = $('#vantagens').offset().top;
	var seguranca = $('#seguranca').offset().top;
	var clientes = $('#clientes').offset().top;
	var contato = $('#contato').offset().top;
	var conviso = $('#conviso').offset().top;

	if(documento >= wedo && documento < vantagens){
		item.removeClass('active');
		item.eq(0).addClass('active');
	}
	if(documento >= vantagens && documento < seguranca){
		item.removeClass('active');
		item.eq(1).addClass('active');
	}
	if(documento >= seguranca && documento < clientes){
		item.removeClass('active');
		item.eq(2).addClass('active');
	}
	if(documento >= clientes && documento < contato){
		item.removeClass('active');
		item.eq(3).addClass('active');
	}
	if(documento >= contato && documento < conviso){
		item.removeClass('active');
		item.eq(4).addClass('active');
	}
	if(documento >= conviso && documento < contato){
		item.removeClass('active');
		item.eq(5).addClass('active');
	}

});

// CARROSSEL DE CLIENTES
var carousel = $('#lista-clientes');

carousel.owlCarousel({
	items:3,
	itemsDesktop:[1000,3],
	itemsDesktopSmall:[900,2],
	itemsTablet:[600,1],
	itemsMobile:false
});

$('#prev').click(function(e){
	e.preventDefault();

	carousel.trigger('owl.prev');

});

$('#next').click(function(e){
	e.preventDefault();

	carousel.trigger('owl.next');

});