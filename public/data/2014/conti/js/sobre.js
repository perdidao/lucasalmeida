$('#fotos-sobre li a').hover(function(){
    $(this).find('.hover').stop(true,true).fadeToggle();
});

$(document).ready(function(){
    $('.lightbox').fancybox();
});

// ++++++
// MAPA
var latMap = -22.7475705;
var longMap = -50.3878004;

var map;
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();

function initialize(lat, lng) {
	directionsDisplay = new google.maps.DirectionsRenderer();
	
    var mapOptions = {
        center: new google.maps.LatLng(lat, lng),
        zoom: 17,
        scrollwheel: false,
        disableDefaultUI: true,
    };

    var map = new google.maps.Map(document.getElementById("gmap"),
        mapOptions);

    var marker = new google.maps.Marker({
	    position: new google.maps.LatLng(lat, lng),
	    map: map
	});
    
    directionsDisplay.setMap(map);

};

initialize(latMap, longMap);