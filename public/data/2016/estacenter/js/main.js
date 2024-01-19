// Saudações
console.log('feito com ♥ pelo estudioffw.com');

// Menu
var item = $('#menu a');

item.click(function(){
	var ancora = $(this).attr('href');
	var distancia = $(ancora).offset().top - 80;
    $('html, body').animate({
        scrollTop: distancia
    }, 1000);

    return this.href + ancora;

});

$(document).scroll(function(){

	var documento = $(document).scrollTop() + 85;
	var sobre = $('#sobre').offset().top;
	var localizacao = $('#localizacao').offset().top;
	var clientes = $('#clientes').offset().top;
	var noticias = $('#noticias').offset().top;
	var servicos = $('#servicos').offset().top;
	var contato = $('#contato').offset().top;

	if(documento < sobre){
		item.removeClass('active');
	}
	if(documento >= sobre && documento < localizacao){
		item.removeClass('active');
		item.eq(0).addClass('active');
	}
	if(documento >= localizacao && documento < clientes){
		item.removeClass('active');
		item.eq(1).addClass('active');
	}
	if(documento >= clientes && documento < noticias){
		item.removeClass('active');
		item.eq(2).addClass('active');
	}
	if(documento >= noticias && documento < servicos){
		item.removeClass('active');
		item.eq(3).addClass('active');
	}
	if(documento >= servicos && documento < contato){
		item.removeClass('active');
		item.eq(3).addClass('active');
	}
	if(documento >= contato){
		item.removeClass('active');
		item.eq(5).addClass('active');
	}

});

// Banners
$('#banners').owlCarousel({
	items:1,
	singleItems:true,
	autoplay:true,
	autoplayTimeout:5000,
	loop:true
});


var secoes = $('#secoes');
secoes.owlCarousel({
	items:1,
	singleItems:true,
	nav:true
});

secoes.on('change.owl.carousel', function(event){
    
    setTimeout(function(){
	    var item = '#' + $('#secoes .owl-item.active').find('li').attr('item-id');
	    $('#tipos li').removeClass('active');
	    $(item).addClass('active');
    },300);

});