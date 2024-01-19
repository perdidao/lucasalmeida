// Saudações
console.log('feito com ♥ pelo estudioffw.com');

// Background do menu
$(document).scroll(function(){

	var topo = $(document).scrollTop();

	if(topo > 100){
		$('#nav').addClass('scrolled');
	} else if(topo <= 100){
		$('#nav').removeClass('scrolled');
	}

});

// Clique do menu
$('#nav a').click(function(){
	var distancia = $($(this).attr("href")).offset().top - 80; 
    $('html, body').animate({
        scrollTop: distancia
    }, 1000);
    return false;
});

// Tooltip de serviços
$('#servicos li a').click(function(e){
	e.preventDefault();

	$(this).toggleClass('active');
	$(this).parent().find('.tooltip').stop(true,true).fadeToggle();

});

$('#servicos .fechar').click(function(e){
	e.preventDefault();

	$(this).parent().fadeToggle();
	$('#servicos li a').removeClass('active');

});

// Tooltip de serviços
$('#socios a').click(function(e){
	e.preventDefault();

	var item = $(this).attr('data-item');

	$('.socio').stop(true,true).slideUp();
	$(item).stop(true,true).slideDown();

});

$('.socio .fechar').click(function(e){
	e.preventDefault();

	$('.socio').slideUp();

});