function tamanhoTela(){
	var l = $(window).width();
	var a = $(window).height();

	$('.page').css({
		'width':l,
		'height':a
	});

	$('#banners li').css({
		'width':l,
		'height':a
	});

	$('#case-hover').css({
		'width':l,
		'height':a
	});
}

// $(window).load(function(){
// 	$('#preloader').fadeOut();
// });

$(document).ready(function(){
	tamanhoTela();

	// MENU
	$('#btn-menu').click(function(e){
		e.preventDefault();
		$(this).toggleClass('active');
		$('#menu').toggleClass('active');
	});

	$('#links li a').click(function(e){
		e.preventDefault();

		var elem = $(this).attr('href');
		var distancia = $(elem).offset().top;

		$('html,body').animate({
			scrollTop:distancia
		},2000);

		$('#btn-menu').removeClass('active');
		$('#menu').removeClass('active');

	});

	// BANNERS
	var banners = $('#banners');
	banners.owlCarousel({
		items:1,
		singleItem:true,
		autoPlay:5000
	});

	$('#prev').click(function(){
		banners.trigger('owl.prev');
	});

	$('#next').click(function(){
		banners.trigger('owl.next');
	});

	// EQUIPE
	var equipe = $('#lista-equipe');
	equipe.owlCarousel({
		items:1,
		slideSpeed : 1000,
		itemsDesktop : [1000,2],
		itemsTablet: [800,1],
		itemsMobile : false
	});

	$('#link-choca').click(function(){
		$('#link-galada').removeClass('active');
		$(this).addClass('active');
		equipe.trigger('owl.goTo', 0);
	});

	$('#link-galada').click(function(){
		$('#link-choca').removeClass('active');
		$(this).addClass('active');
		equipe.trigger('owl.goTo', 1);
	});

	// PORTIFÓLIO
	var portfolio = $('#lista-jobs');
	portfolio.owlCarousel({
		items:3,
		itemsDesktop : [1000,3],
		itemsTablet: [800,1],
		itemsMobile : false
	});

	$('#prev-job').click(function(){
		portfolio.trigger('owl.prev');
	});

	$('#next-job').click(function(){
		portfolio.trigger('owl.next');
	});

	$('#lista-jobs li').hover(function(){
		$(this).find('.hover').stop(true,true).fadeToggle();
	});

	// CASES
	$('#rotatescroll').tinycircleslider({
		dotsSnap : true,
		dotsHide : false,
		radius   : 240
	});

	var rotate, atual, obj, titulo, conteudo;
	function atualizaTexto(a){
		obj = $('.overview li a').eq(a);
		titulo = obj.attr('data-title');
		conteudo = obj.attr('data-content');

		$('#case-info').html('<h3>'+titulo+'</h3><p>'+conteudo+'</p>');
	}

	rotate = $('#rotatescroll').data('plugin_tinycircleslider');
	atual = rotate.slideCurrent;
	atualizaTexto(atual);
	
    $('#rotatescroll').bind("move", function(){
    	atual = rotate.slideCurrent;
    	atualizaTexto(atual);
    });

    // OVERLAY CASES
    var fotos = $('#lista-fotos-case');
    fotos.owlCarousel({
    	items:1,
    	singleItem:true,
    	autoPlay:5000
    });

    $('#prev-foto').click(function(){
		fotos.trigger('owl.prev');
	});

	$('#next-foto').click(function(){
		fotos.trigger('owl.next');
	});

	$('.overview li a').click(function(e){
		e.preventDefault();
		$('#case-hover').fadeIn();
	});

	$('#fechar').click(function(e){
		e.preventDefault();
		$('#case-hover').fadeOut();
	});

	// TIMELINE
	var eventos = $('#eventos');
	eventos.owlCarousel({
		items:8,
		pagination:true,
		itemsDesktop : [1000,7],
		itemsTablet: [800,3],
		itemsMobile : false
	});

	// TIMELINE
	var clientes = $('#lista-clientes');
	clientes.owlCarousel({
		items:4,
		pagination:true,
		itemsDesktop : [1000,3],
		itemsTablet: [800,2],
		itemsMobile : false
	});

	// CONTATO
	$('#map-toggle').click(function(e){
		e.preventDefault();
		$(this).toggleClass('active');
		$('#overlay-mapa').fadeToggle();
	});

	var latMap = -23.3072125;
	var longMap = -51.1775994;

	var map;

	function initialize(lat, lng) {
		
	    var mapOptions = {
	        center: new google.maps.LatLng(lat, lng),
	        zoom: 18,
	        scrollwheel: false,
	        disableDefaultUI: true,
	    };
	    $('#mapa').attr('lat', lat);
	    $('#mapa').attr('lng', lng);

	    var map = new google.maps.Map(document.getElementById("mapa"),
	        mapOptions);

	    var marker = new google.maps.Marker({
		    position: new google.maps.LatLng(lat, lng),
		    map: map,
	        icon: 'static/img/marker.png'
		});

	    map.setMapTypeId(google.maps.MapTypeId.HYBRID);

	}

	initialize(latMap, longMap);

});

$(window).resize(function(){
	tamanhoTela();
	
});

// Trocar svg objeto para inline

jQuery('img.svg').each(function(){
	var $img = jQuery(this);
	var imgID = $img.attr('id');
	var imgClass = $img.attr('class');
	var imgURL = $img.attr('src');

	jQuery.get(imgURL, function(data) {
	
		// Seleciona só o SVG
		var $svg = jQuery(data).find('svg');

		// Adiciona o id da imagem
		if(typeof imgID !== 'undefined') {
			$svg = $svg.attr('id', imgID);
		}

		// Adiciona a classe da imagem no SVG
		if(typeof imgClass !== 'undefined') {
			$svg = $svg.attr('class', imgClass+' replaced-svg');
		}

		// Tira os XML inválidos
		$svg = $svg.removeAttr('xmlns:a');

		// Troca as imagens pelos svgs
		$img.replaceWith($svg);

	}, 'xml');

});