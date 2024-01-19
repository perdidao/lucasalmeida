var latMap = -23.3114;
var longMap = -51.157587;
var map;
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();

function initialize(lat, lng) {

	directionsDisplay = new google.maps.DirectionsRenderer();
	
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
        icon: 'static/img/ico-visita.png'
	});

	var styles = [
        {
            stylers: [
                { hue: "#1B4A74" },
                { saturation: -50 }
            ]
        }
    ];
    
    map.setOptions({styles: styles});
    
    directionsDisplay.setMap(map);

}

initialize(latMap, longMap);

$("#buscar").click(function(event){
	event.preventDefault();
	
	var enderecoPartida = $("#como-chegar").val();
	var enderecoChegada = '-23.3114, -51.157587';
	
	var request = {
		origin: enderecoPartida,
		destination: enderecoChegada,
		travelMode: google.maps.TravelMode.DRIVING
	};
	
	directionsService.route(request, function(result, status) {
		if (status == google.maps.DirectionsStatus.OK) {
			directionsDisplay.setDirections(result);
		}
	});
});