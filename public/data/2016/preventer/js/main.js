// Saudações
console.info('desenvolvido com ♥ pelo estudioffw.com');

// Carrossel de banners
$('#banners').owlCarousel({
	items:1,
	singleItem:true
	// autoPlay:4000
});

// Interação do menu
$('#btn-menu').click(function(e){
	e.preventDefault();

	$(this).toggleClass('aberto');
	$('#navegacao').toggleClass('aberto');

});

// Links animados do menu
var item = $('#menu li a');

item.click(function(){
	var distancia = $($(this).attr('href')).offset().top; 
    $('html, body').animate({
        scrollTop: distancia
    }, 1000);
    return false;
});

$(document).scroll(function(){

	var documento = $(document).scrollTop() + 20;
	var header = $('#header').offset().top;
	var sobre = $('#sobre').offset().top;
	var propostas = $('#propostas').offset().top;
	var diferenciais = $('#diferenciais').offset().top;
	var clientes = $('#clientes').offset().top;
	var solucoes = $('#solucoes').offset().top;
	var contato = $('#contato').offset().top;

	if(documento >= header && documento < sobre){
		item.removeClass('active');
		item.eq(0).addClass('active');
	}
	if(documento >= sobre && documento < propostas){
		item.removeClass('active');
		item.eq(1).addClass('active');
	}
	if(documento >= propostas && documento < diferenciais){
		item.removeClass('active');
		item.eq(2).addClass('active');
	}
	if(documento >= diferenciais && documento < clientes){
		item.removeClass('active');
		item.eq(3).addClass('active');
	}
	if(documento >= clientes && documento < solucoes){
		item.removeClass('active');
		item.eq(4).addClass('active');
	}
	if(documento >= solucoes && documento < contato){
		item.removeClass('active');
		item.eq(5).addClass('active');
	}
	if(documento >= contato){
		item.removeClass('active');
		item.eq(6).addClass('active');
	}

});

// Interação dos diferenciais
$('#numbers li a').click(function(e){
	e.preventDefault();

	$('#numbers li a').removeClass('active');
	$(this).addClass('active');

	var id = $(this).attr('data-id');
	$('.diferencial').hide();
	$(id).fadeIn();

});

// Construção do Mapa
var latMap = '-25.4733765';
var longMap = '-49.2539172';

var map;

function initialize(lat, lng) {
	
    var mapOptions = {
        center: new google.maps.LatLng(lat, lng),
        zoom: 12,
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
    
    var styles = [
    	{
	        "featureType": "all",
	        "elementType": "labels.text.fill",
	        "stylers": [
	            {
	                "saturation": 36
	            },
	            {
	                "color": "#000000"
	            },
	            {
	                "lightness": 40
	            }
	        ]
	    },
	    {
	        "featureType": "all",
	        "elementType": "labels.text.stroke",
	        "stylers": [
	            {
	                "visibility": "on"
	            },
	            {
	                "color": "#000000"
	            },
	            {
	                "lightness": 16
	            }
	        ]
	    },
	    {
	        "featureType": "all",
	        "elementType": "labels.icon",
	        "stylers": [
	            {
	                "visibility": "off"
	            }
	        ]
	    },
	    {
	        "featureType": "administrative",
	        "elementType": "geometry.fill",
	        "stylers": [
	            {
	                "color": "#000000"
	            },
	            {
	                "lightness": 20
	            }
	        ]
	    },
	    {
	        "featureType": "administrative",
	        "elementType": "geometry.stroke",
	        "stylers": [
	            {
	                "color": "#000000"
	            },
	            {
	                "lightness": 17
	            },
	            {
	                "weight": 1.2
	            }
	        ]
	    },
	    {
	        "featureType": "landscape",
	        "elementType": "geometry",
	        "stylers": [
	            {
	                "color": "#000000"
	            },
	            {
	                "lightness": 20
	            }
	        ]
	    },
	    {
	        "featureType": "poi",
	        "elementType": "geometry",
	        "stylers": [
	            {
	                "color": "#000000"
	            },
	            {
	                "lightness": 21
	            }
	        ]
	    },
	    {
	        "featureType": "road.highway",
	        "elementType": "geometry.fill",
	        "stylers": [
	            {
	                "color": "#000000"
	            },
	            {
	                "lightness": 17
	            }
	        ]
	    },
	    {
	        "featureType": "road.highway",
	        "elementType": "geometry.stroke",
	        "stylers": [
	            {
	                "color": "#000000"
	            },
	            {
	                "lightness": 29
	            },
	            {
	                "weight": 0.2
	            }
	        ]
	    },
	    {
	        "featureType": "road.arterial",
	        "elementType": "geometry",
	        "stylers": [
	            {
	                "color": "#000000"
	            },
	            {
	                "lightness": 18
	            }
	        ]
	    },
	    {
	        "featureType": "road.local",
	        "elementType": "geometry",
	        "stylers": [
	            {
	                "color": "#000000"
	            },
	            {
	                "lightness": 16
	            }
	        ]
	    },
	    {
	        "featureType": "transit",
	        "elementType": "geometry",
	        "stylers": [
	            {
	                "color": "#000000"
	            },
	            {
	                "lightness": 19
	            }
	        ]
	    },
	    {
	        "featureType": "water",
	        "elementType": "geometry",
	        "stylers": [
	            {
	                "color": "#000000"
	            },
	            {
	                "lightness": 17
	            }
	        ]
	    }
	];
    
    map.setOptions({styles: styles});

}

initialize(latMap, longMap);

// Interação do mapa
$('#btn-mapa').click(function(e){
	e.preventDefault();

	$('#mapa').toggleClass('opened');

});