$(document).scroll(function(){
	// ALTERA O MENU
	var altura = $(document).scrollTop();

	if(altura >= 20){
		$('#menu').addClass('fixed');
	} else if(altura < 20) {
		$('#menu').removeClass('fixed');
	}

	var item = $('#nav li a');

	var documento = $(document).scrollTop();
	var sobre = $('#sobre').offset().top-200;
	var loja = $('#loja').offset().top-200;
	var endereco = $('#endereco').offset().top-200;
	var contato = $('#contato').offset().top-200;

	if(documento < sobre){
		item.removeClass('current');
	}
	if(documento >= sobre && documento < loja){
		item.removeClass('current');
		item.eq(0).addClass('current');
	}
	if(documento >= loja && documento < endereco){
		item.removeClass('current');
		item.eq(1).addClass('current');
	}
	if(documento >= endereco && documento < contato){
		item.removeClass('current');
		item.eq(2).addClass('current');
	}
	if(documento >= contato){
		item.removeClass('current');
		item.eq(3).addClass('current');
	}
});

$(document).ready(function(){

	$('#telefone').mask('(99) 9999-9999');

	$('#nav li a').click(function(){
		$('#nav li a').removeClass('current');
		$(this).addClass('current');
		var distancia = $($(this).attr("href")).offset().top-60; 
        $('html, body').animate({
            scrollTop: distancia
        }, 1000);
        return false;
    });

    $('#logo').click(function(){
		var distancia = $($(this).attr("href")).offset().top-60; 
        $('html, body').animate({
            scrollTop: distancia
        }, 1000);
        return false;
    });
	
	$('.abas-sobre').jScrollPane();
	$('.abas-endereco').jScrollPane();

	// ABAS DA ÁREA QUEM SOMOS
	$('.abas-sobre').hide();
	$('.aba-sobre').show();

	$('.sobre-nav li a').click(function(){
		var id = '.'+$(this).attr('data-aba');

		$('.sobre-nav li a').removeClass('current');
		$(this).addClass('current');

		$('.abas-sobre').hide();
		$(id).show();

		return false;

	});

	// ABAS DA ÁREA ONDE ESTAMOS
	$('.aba-pdv').hide();
	$('.aba-parceiros').hide();
	$('.aba-producao').show();

	$('.endereco-nav li a').click(function(){
		var id = '.'+$(this).attr('data-aba');

		$('.endereco-nav li a').removeClass('current');
		$(this).addClass('current');

		$('.abas-hide').hide();
		$(id).show();

		return false;

	});
});