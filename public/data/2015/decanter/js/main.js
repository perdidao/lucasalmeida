// MENU
$('#menu a').click(function(){
	var distancia = $($(this).attr("href")).offset().top - 90; 
    $('html, body').animate({
        scrollTop: distancia
    }, 1000);
    return false;
});

$('#btn-menu').click(function(){
    $(this).toggleClass('active');
    $('#menu').slideToggle();
});

var topo;
$(document).scroll(function(){

	topo = $(document).scrollTop();
	if(topo >= 100){
		
		$('#header').addClass('onScroll');

	} else if(topo < 100){

		$('#header').removeClass('onScroll');

	}

});

// BANNERS
$('#banner ul').royalSlider({
	autoScaleSlider:false,
	arrowsNav:true,
	arrowsNavAutoHide:false,
	imgHeight:594,
	loop:true,
	autoPlay: {
		enabled: true,
		pauseOnHover: false,
		delay:5000
	}
});

$('#banner ul li .imagem').addClass('animated fadeInLeft');
setTimeout(function(){
	$('#banner ul li .texto').addClass('animated fadeInRight');
},500);

var slider = $('#banner ul').data('royalSlider');

slider.ev.on('rsBeforeAnimStart', function(event) {
	$('#banner ul li .imagem').removeClass('animated fadeInLeft');
	$('#banner ul li .texto').removeClass('animated fadeInRight');
});

slider.ev.on('rsDragStart', function(event) {
	$('#banner ul li .imagem').removeClass('animated fadeInLeft');
	$('#banner ul li .texto').removeClass('animated fadeInRight');
});

slider.ev.on('rsAfterSlideChange', function(event) {
	$('#banner ul li .imagem').addClass('animated fadeInLeft');
	setTimeout(function(){
		$('#banner ul li .texto').addClass('animated fadeInRight');
	},500);
});


// VITRINE
var vinhos = $('#vinhos');
vinhos.owlCarousel({
	items:1,
	singleItem:true
});

$('#prev-galeria').click(function(){
	vinhos.trigger('owl.prev');
});

$('#next-galeria').click(function(){
	vinhos.trigger('owl.prev');
});

// HARMONIZAÇÃO
$('#refeicoes li a').click(function(e){
	e.preventDefault();

	$('#refeicoes li a').removeClass('active');
	$(this).addClass('active');

	var item = $(this).attr('href');
	$('.harmonizacao').hide();
	$(item).fadeIn();

});

// ++++++
// MAPA
var latMap = '-23.3110778';
var longMap = '-51.1695988';

var map;

function initialize(lat, lng) {
	
    var mapOptions = {
        center: new google.maps.LatLng(lat, lng),
        zoom: 17,
        scrollwheel: false,
        disableDefaultUI: true,
    };

    var map = new google.maps.Map(document.getElementById("mapa"),
        mapOptions);

    var marker = new google.maps.Marker({
	    position: new google.maps.LatLng(lat, lng),
	    map: map,
        icon: 'static/img/marker.png'
	});
    

    directionsDisplay.setMap(map);

};

initialize(latMap, longMap);