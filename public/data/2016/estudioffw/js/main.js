// Saudações
console.log('feito com ♥ pelo estudioffw.com');

// Menu
$(document).scroll(function(){

	var top = $(document).scrollTop();

	if(top >= 100){
		$('#menu-wrapper').addClass('scrolled');
	} else if(top < 100){
		$('#menu-wrapper').removeClass('scrolled');
	}

});

var item = $('#menu a');

item.click(function(){
    var ancora = $(this).attr('href');
    var distancia = $(ancora).offset().top - 90;
    $('html, body').animate({
        scrollTop: distancia
    }, 1000);
    return false;
});

$(document).scroll(function(){

    var documento = $(document).scrollTop() + 95;
    var servicos = $('#servicos').offset().top;
    var sobre = $('#sobre').offset().top;
    var parceiros = $('#parceiros').offset().top;
    var contato = $('#contato').offset().top;

    if(documento < servicos){
        item.removeClass('active');
    }
    if(documento >= servicos && documento < sobre){
        item.removeClass('active');
        item.eq(0).addClass('active');
    }
    if(documento >= sobre && documento < parceiros){
        item.removeClass('active');
        item.eq(1).addClass('active');
    }
    if(documento >= parceiros && documento < contato){
        item.removeClass('active');
        item.eq(2).addClass('active');
    }
    if(documento >= contato){
        item.removeClass('active');
        item.eq(3).addClass('active');
    }

});

// Máscara de telefone
$('#fone').mask('(99) 99999999?9');

// Mapa
var latMap = '-23.3082835';
var longMap = '-51.1782801';

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
    
    var styles = [{"featureType":"road","stylers":[{"hue":"#5e00ff"},{"saturation":-79}]},{"featureType":"poi","stylers":[{"saturation":-78},{"hue":"#6600ff"},{"lightness":-47},{"visibility":"off"}]},{"featureType":"road.local","stylers":[{"lightness":22}]},{"featureType":"landscape","stylers":[{"hue":"#6600ff"},{"saturation":-11}]},{},{},{"featureType":"water","stylers":[{"saturation":-65},{"hue":"#1900ff"},{"lightness":8}]},{"featureType":"road.local","stylers":[{"weight":1.3},{"lightness":30}]},{"featureType":"transit","stylers":[{"visibility":"simplified"},{"hue":"#5e00ff"},{"saturation":-16}]},{"featureType":"transit.line","stylers":[{"saturation":-72}]},{}];
    
    map.setOptions({styles: styles});

    directionsDisplay.setMap(map);

}

initialize(latMap, longMap);