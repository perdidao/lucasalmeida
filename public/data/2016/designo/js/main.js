// Saudações
console.log('feito com ♥ pelo estudioffw.com');

// Banners
$('#banners').owlCarousel({
	items:1,
	singleItem:true
});

// Encaixe do showroom
$('#showroom').masonry({
  itemSelector: 'li'
});

$(document).ready(function(){

	var altura;

	$('#showroom li').each(function(e){

		altura = $(this).height()+'px';

		$(this).find('.tble').css('height',altura)

	});

});

// Mapa
var latMap = '-23.331704';
var longMap = '-51.144441';

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
    
    var styles = [{"featureType":"administrative","elementType":"all","stylers":[{"saturation":"-100"}]},{"featureType":"administrative.province","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"all","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","elementType":"all","stylers":[{"saturation":-100},{"lightness":"50"},{"visibility":"simplified"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":"-100"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"all","stylers":[{"lightness":"30"}]},{"featureType":"road.local","elementType":"all","stylers":[{"lightness":"40"}]},{"featureType":"transit","elementType":"all","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]},{"featureType":"water","elementType":"labels","stylers":[{"lightness":-25},{"saturation":-100}]}];
    
    map.setOptions({styles: styles});

    directionsDisplay.setMap(map);

}

initialize(latMap, longMap);