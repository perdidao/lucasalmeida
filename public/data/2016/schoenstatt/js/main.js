// Saudações
console.log('feito com ♥ pelo estudioffw.com');

// Interação do menu
$('#btn-menu').click(function(e){
	e.preventDefault();

	$(this).toggleClass('active');
	$('#menu').slideToggle();

});

// Gambiarra pra mudar o tamanho do menu lateral do santuário
$(document).ready(function(){
	var alturaMenu = $('#conteudo').height() - 100;
	
	if (window.matchMedia("(min-width: 720px)").matches) {

		if(alturaMenu > 510){
			$('.menu').css('height',alturaMenu);
		} else {
			alturaMenu = 510;
			$('.menu').css('height',alturaMenu);
		}

	} else {
	  
	}

});

// Abrir e fechar perguntas frequentes
$('.perguntas li a').click(function(e){
	e.preventDefault();

	$(this).toggleClass('active');
	$(this).parent().find('p').slideToggle();

});