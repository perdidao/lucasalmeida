var latMap = -23.3029;
var longMap = -51.1552;

var map;

function initialize(lat, lng) {
	
    var mapOptions = {
        center: new google.maps.LatLng(lat, lng),
        zoom: 16,
        scrollwheel: false,
        disableDefaultUI: true,
    };
    $('#container-mapa').attr('lat', lat);
    $('#container-mapa').attr('lng', lng);

    var map = new google.maps.Map(document.getElementById("container-mapa"),
        mapOptions);

    var marker = new google.maps.Marker({
	    position: new google.maps.LatLng(lat, lng),
	    map: map
	});

}

initialize(latMap, longMap);