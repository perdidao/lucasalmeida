// Saudações
console.log('feito com ♥ pelo estudioffw.com');

 // -------------- ++
// Tamanho do topo
var lH, aH;

function resizeHeader(){
	lH = $(window).width();
	aH = $(window).height();

	$('#header').css({
		'width':lH,
		'height':aH
	});

}

// Altera o tamanho do topo quando o documento é carregado
$(document).ready(function(){
	resizeHeader();
});

// Altera o tamanho quando a tela é redimensionada
$(window).resize(function(){
	resizeHeader();
});

 // ----------------- ++
// Interações do menu
$('#btn-menu').click(function(){
    $(this).toggleClass('active');
    $('#menu-wrapper').toggleClass('active');
});

 // --------------- ++
// Player de música
var arquivo, musicaAtual;

$('.play').click(function(e){
	e.preventDefault();
	if(musicaAtual){
		musicaAtual.pause();
		$('.pause').hide();
		$('.play').fadeIn();
	}

	arquivo = $(this).attr('href');
	musicaAtual = new Audio(arquivo);

	musicaAtual.play();

	$(this).hide();
	$(this).parent().find('.pause').fadeIn();

	$('.pause').click(function(e){
		e.preventDefault();

		musicaAtual.pause();
		$(this).hide();
		$(this).parent().find('.play').fadeIn();

	});

});

 // --- ++
// Mapa
var latMap = '-23.1230';
var longMap = '-50.3689';

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
        icon: '../static/img/marker.png'
    });
    
    var styles = [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#fdeb06"},{"visibility":"on"}]}];
    
    map.setOptions({styles: styles});

    directionsDisplay.setMap(map);

}

initialize(latMap, longMap);