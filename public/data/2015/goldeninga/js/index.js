// CARREGA O HTML DA RESERVA
$('#reserva-wrapper').load("reserva.html");

$(document).ready(function(){
	
	// BANNER
	$('#banners').cycle({
		timeout: 6000,
		fx:'scrollHorz',
		pager:'#banner-nav'
	});

	// ESTRUTURA
	$('#opcoes-estrutura a').click(function(e){
		e.preventDefault();

		var elem = $(this).attr('class');
		
		$('.complementar').fadeOut().removeClass('active');
		$('.foto-estrutura').fadeOut().removeClass('active');

		$('#opcoes-estrutura a').removeClass('active');
		$(this).addClass('active');
		
		setTimeout(function(){
			$('#'+elem+'-c').fadeIn().addClass('active');
			$('#'+elem).fadeIn().addClass('active');
		},300);

	});

	// APARTAMENTOS
	$('#lista-apartamentos li').hover(function(){
		$(this).find('.hover').stop(true,true).fadeToggle();
	});

	$('.apartamento').fancybox();

	$('#lista-apartamentos li a').click(function(e){
		e.preventDefault();

		$('#fotos-apartamentos li:first a').click();

	});

});