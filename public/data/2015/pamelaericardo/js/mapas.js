// ++++++
// CERIMONIA
var latMap1 = -23.1599581;
var longMap1 = -49.9793511;

var map1;
var directionsDisplay1;
var directionsService1 = new google.maps.DirectionsService();

function initialize1(lat, lng) {
	directionsDisplay1 = new google.maps.DirectionsRenderer();
	
    var mapOptions = {
        center: new google.maps.LatLng(lat, lng),
        zoom: 17,
        scrollwheel: false,
        disableDefaultUI: true,
    };

    var map1 = new google.maps.Map(document.getElementById('mapa-cerimonia'),
        mapOptions);

    var marker = new google.maps.Marker({
	    position: new google.maps.LatLng(lat, lng),
	    map: map1,
        icon: 'static/img/marker.png'
	});
    
    var styles = [
        {
            stylers: [
                { hue: '#81EFDF' },
                { saturation: 50 }
            ]
        }
    ];
    
    map1.setOptions({styles: styles});
    directionsDisplay1.setMap(map1);

};

initialize1(latMap1, longMap1);

$('#btn-cerimonia').click(function(event){
	event.preventDefault();
	
	var enderecoPartida = $('#end-cerimonia').val();
	var enderecoChegada = '-23.1599581 -49.9793511';
	
	var request = {
		origin: enderecoPartida,
		destination: enderecoChegada,
		travelMode: google.maps.TravelMode.DRIVING
	};
	
	directionsService1.route(request, function(result, status) {
		if (status == google.maps.DirectionsStatus.OK) {
			directionsDisplay1.setDirections(result);
		}
	});
});

// ++++++
// RECEPÇÃO
var latMap2 = -23.2191089;
var longMap2 = -50.009255;

var map2;
var directionsDisplay2;
var directionsService2 = new google.maps.DirectionsService();

function initialize2(lat, lng) {
	directionsDisplay2 = new google.maps.DirectionsRenderer();
	
    var mapOptions = {
        center: new google.maps.LatLng(lat, lng),
        zoom: 17,
        scrollwheel: false,
        disableDefaultUI: true,
    };

    var map2 = new google.maps.Map(document.getElementById('mapa-recepcao'),
        mapOptions);

    var marker = new google.maps.Marker({
	    position: new google.maps.LatLng(lat, lng),
	    map: map2,
        icon: 'static/img/marker.png'
	});
    
    var styles = [
        {
            stylers: [
                { hue: '#81EFDF' },
                { saturation: 50 }
            ]
        }
    ];
    
    map2.setOptions({styles: styles});
    directionsDisplay2.setMap(map2);

};

initialize2(latMap2, longMap2);

$('#btn-recepcao').click(function(event){
	event.preventDefault();
	
	var enderecoPartida = $('#end-recepcao').val();
	var enderecoChegada = 'PR 153 KM 29, Ponte Rio Jacaré, Santo Antônio da Platina';
	
	var request = {
		origin: enderecoPartida,
		destination: enderecoChegada,
		travelMode: google.maps.TravelMode.DRIVING
	};
	
	directionsService2.route(request, function(result, status) {
		if (status == google.maps.DirectionsStatus.OK) {
			directionsDisplay2.setDirections(result);
		}
	});
});