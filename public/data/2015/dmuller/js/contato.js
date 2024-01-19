var latMap = -26.9481057;
var longMap = -48.7409814;

var map;

function initialize(lat, lng) {
	
    var mapOptions = {
        center: new google.maps.LatLng(lat, lng),
        zoom: 16,
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

};

initialize(latMap, longMap);