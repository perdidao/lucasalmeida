// ARQUIVO
$('.btn-datas').click(function(e){
    e.preventDefault();

    $('#arquivo').slideToggle();

});

// MAPA
var latMap = -23.3272063;
var longMap = -51.1583647;

var map,marker;

function initialize(lat, lng) {
	
    var mapOptions = {
        center: new google.maps.LatLng(lat, lng),
        zoom: 17,
        scrollwheel: false,
        disableDefaultUI: true,
    };

    map = new google.maps.Map(document.getElementById('mapa'),
        mapOptions);

    marker = new google.maps.Marker({
	    position: new google.maps.LatLng(lat, lng),
	    map: map,
        icon: 'static/img/marker.png'
	});
    
    var styles = [
        {
            stylers: [
                { hue: '#5EBFBF' },
                { saturation: 50 }
            ]
        }
    ];
    
    map.setOptions({styles: styles});

}

initialize(latMap, longMap);