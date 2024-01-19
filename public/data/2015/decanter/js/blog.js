// ARQUIVOS
$('.btn-datas').click(function(e){
	e.preventDefault();

	$('#arquivo').slideToggle();

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