$(document).ready(function(){

	// MENU
	var item = $('#menu a');
	item.click(function(){
		var distancia = $($(this).attr("href")).offset().top - 60; 
	    $('html, body').animate({
	        scrollTop: distancia
	    }, 1000);
	    return false;
	});

	// BANNERS
	var banners = $('#banners');
	banners.owlCarousel({
		items:1,
		singleItem:true,
		autoPlay:true
	});

	// COMPARTILHAMENTO DE POSTS
	$('.btn-share').click(function(e){
		e.preventDefault();

		$(this).hide();
		$(this).parent().find('ul').fadeIn();

	});

	// PARALLAX GLOBAL
	$('.parallax').parallax('1%', -0.1);

	// CARROSSEL DE FOTOS
	var fotos = $('#lista-fotos');
	fotos.owlCarousel({
		items:4
	});

	$('#prev-foto').click(function(){
		fotos.trigger('owl.prev');
	});

	$('#next-foto').click(function(){
		fotos.trigger('owl.next');
	});

	// FANCYBOX DAS FOTOS
	$('.galeria-fotos').fancybox();

	// CARROSSEL DE VÍDEOS
	var videos = $('#lista-videos');
	videos.owlCarousel({
		items:4
	});

	$('#prev-video').click(function(){
		videos.trigger('owl.prev');
	});

	$('#next-video').click(function(){
		videos.trigger('owl.next');
	});

	// FANCYBOX DOS VÍDEOS
	$('.galeria-videos').fancybox();

	// MAPA
	var latMap = -23.3168;
	var longMap = -51.183;

	var map,marker;

	function initialize(lat, lng) {
		
	    var mapOptions = {
	        center: new google.maps.LatLng(lat, lng),
	        zoom: 17,
	        scrollwheel: false,
	        disableDefaultUI: true,
	    };

	    map = new google.maps.Map(document.getElementById('mapa'),
	        mapOptions);

	    marker = new google.maps.Marker({
		    position: new google.maps.LatLng(lat, lng),
		    map: map,
	        icon: 'static/img/marker.png'
		});
	    
	    var styles = [
	        {
	            stylers: [
	                { hue: '#309CCA' },
	                { saturation: 50 }
	            ]
	        }
	    ];
	    
	    map.setOptions({styles: styles});

	}

	initialize(latMap, longMap);

	// MÁSCARA DO CONTATO
	$('.telefone').mask('(99) 9999-9999');

});

$(document).scroll(function(){
	var documento = $(document).scrollTop()+62;
	var mBlog = $('#blog').offset().top;
	var mSobre = $('#sobre').offset().top;
	var mModalidades = $('#modalidades').offset().top;
	var mFotos = $('#fotos').offset().top;
	var mEquipe = $('#equipe').offset().top;
	var mContato = $('#contato').offset().top;

	if(documento < mBlog){
		$('#menu ul li a').removeClass('active');
	}
	if(documento >= mBlog && documento < mSobre){
		$('#menu ul li a').removeClass('active');
		$('#menu ul li a').eq(0).addClass('active');
	}
	if(documento >= mSobre && documento < mModalidades){
		$('#menu ul li a').removeClass('active');
		$('#menu ul li a').eq(1).addClass('active');
	}
	if(documento >= mModalidades && documento < mFotos){
		$('#menu ul li a').removeClass('active');
		$('#menu ul li a').eq(2).addClass('active');
	}
	if(documento >= mFotos && documento < mEquipe){
		$('#menu ul li a').removeClass('active');
		$('#menu ul li a').eq(3).addClass('active');
	}
	if(documento >= mEquipe && documento < mContato){
		$('#menu ul li a').removeClass('active');
		$('#menu ul li a').eq(4).addClass('active');
	}
	if(documento >= mContato){
		$('#menu ul li a').removeClass('active');
		$('#menu ul li a').eq(5).addClass('active');
	}
});