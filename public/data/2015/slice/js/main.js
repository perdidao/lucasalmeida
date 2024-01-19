$(document).ready(function(){

	var autoScroll = function(elem){
		var item = '#'+elem;
		var distancia = $(item).offset().top;

		$('html,body').animate({
			scrollTop:distancia
		},500);
	};

	// MENU
	$('#btn-menu').click(function(e){
		e.preventDefault();
		$(this).toggleClass('active');
		$('#menu').toggleClass('active');
	});

	$('#menu a').click(function(e){
		e.preventDefault();
		var item = $(this).attr('href');
		var distancia = $(item).offset().top;

		$('html,body').animate({
			scrollTop:distancia
		},500);
	});

	$('#btn-sabores').click(function(e){
		e.preventDefault();
		autoScroll('produtos');
	});

	// GALERIA DE PRODUTOS (TOPO)
	var batatas = $('#batatas');
	batatas.owlCarousel({
		items:3,
		itemsDesktop:[1000,3],
		itemsDesktopSmall:[900,3],
		itemsTablet:[800,1],
		itemsMobile:false,
		addClassActive:true,
		rewindNav:false,
		afterAction:function(){
			$('.owl-item.active').removeClass('center');
			$('.owl-item.active').eq(0).addClass('controle');
			$('.owl-item.active').eq(1).addClass('center');
		}
	});

	$('#prev-batata').click(function(){
		batatas.trigger('owl.prev');
	});

	$('#next-batata').click(function(){
		batatas.trigger('owl.next');
	});

	// PRODUTOS
	// Abrir produto
	$('.btn-saiba-mais').click(function(e){
		e.preventDefault();
		var produto = $(this).attr('data-produto');
		$('.produto-aberto.'+produto).fadeIn();

	});

	// Fechar produto
	$('.produto-aberto .btn-fechar').click(function(e){
		e.preventDefault();
		$(this).parent().fadeOut();
	});

	// CAMPANHAS
	var campanha = $('#campanhas');
	campanha.owlCarousel({
		items:1,
		itemsDesktop:false,
		itemsDesktopSmall:false,
		itemsTablet:false,
		itemsMobile:false,
		singleItem:true,
		mouseDrag:false,
		touchDrag:false,
		autoPlay:6000
	});

	$('#prev-campanha').click(function(){
		campanha.trigger('owl.prev');
	});

	$('#next-campanha').click(function(){
		campanha.trigger('owl.next');
	});

});

var adicional = $('#menu').offset().top;
$(document).scroll(function(){

	var topo = $(document).scrollTop()+adicional;
	var header = $('#header').offset().top;
	var sobre = $('#sobre').offset().top;
	var produtos = $('#produtos').offset().top;
	var ondeComprar = $('#onde-comprar').offset().top;
	var campanhas = $('#campanha').offset().top;
	var contato = $('#estamos-online').offset().top;

	if(topo >= header && topo < sobre){
		$('#menu a').removeClass('active');
		$('#menu a').eq(0).addClass('active');
	}

	if(topo >= sobre && topo < produtos){
		$('#menu a').removeClass('active');
		$('#menu a').eq(1).addClass('active');
	}

	if(topo >= produtos && topo < ondeComprar){
		$('#menu a').removeClass('active');
		$('#menu a').eq(2).addClass('active');
		$('#menu').removeClass('alt');
	}

	if(topo >= ondeComprar && topo < campanhas){
		$('#menu a').removeClass('active');
		$('#menu a').eq(3).addClass('active');
		$('#menu').addClass('alt');
	}

	if(topo >= campanhas && topo < contato){
		$('#menu a').removeClass('active');
		$('#menu a').eq(4).addClass('active');
		$('#menu').removeClass('alt');
	}

	if(topo >= contato){
		$('#menu a').removeClass('active');
		$('#menu a').eq(5).addClass('active');
		$('#menu').addClass('alt');
	}

});