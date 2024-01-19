$(document).ready(function(){

    $('#btn-menu').click(function(){
        $(this).toggleClass('active');
        $('#menu').slideToggle();
    });

	$('.btn-restrito').click(function(e){
		e.preventDefault();

		$('.overlay').fadeIn();

	});

	$('.fechar').click(function(e){
		e.preventDefault();

		$('.overlay').fadeOut();

	});

});

// CRIA O MAPA
var map, google;

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
    
    var styles = [
        {
            stylers: [
                { hue: "#CB2128" }
            ]
        }
    ];
    
    map.setOptions({styles: styles});

}