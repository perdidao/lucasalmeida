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
	if(documento >= blog && documento < contato){
		item.removeClass('active');
		item.eq(2).addClass('active');
	}
	if(documento >= contato){
		item.removeClass('active');
		item.eq(4).addClass('active');
	}

});

// Banner
$('#banner').owlCarousel({
	items:1,
	singleItem:true,
	nav:true,
	loop:true,
	autoplay:true,
	autoplayTimeout:4000
});

// Sobre
$('#topicos li a').click(function(e){
	e.preventDefault();

	var item = '#' + $(this).attr('data-item');

	console.info(item);

	$('#topicos li a').removeClass('active');
	$(this).addClass('active');

	$('#sobre article').hide();
	$(item).fadeIn();

});

// Serviços
$('#servicos a').fancybox();