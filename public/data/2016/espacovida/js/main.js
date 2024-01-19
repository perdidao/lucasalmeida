// MENU
var item = $('#menu a');
item.click(function(){
    var distancia = $($(this).attr("href")).offset().top - 80; 
    $('html, body').animate({
        scrollTop: distancia
    }, 1000);
    return false;
});

// CARROSSEL DE BANNERS
var banners = $('#banners');
banners.owlCarousel({
	items:1,
	singleItem:true
});

$('.s-prev').click(function(e){
	e.preventDefault();

	banners.trigger('owl.prev');

});

$('.s-next').click(function(e){
	e.preventDefault();

	banners.trigger('owl.next');

});

// FANCYBOX DA ESTRUTURA
$('.galeria').fancybox();

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

$(document).scroll(function(){
    var documento = $(document).scrollTop()+81;
    var mSobre = $('#sobre').offset().top;
    var mServicos = $('#servicos').offset().top;
    var mEstrutura = $('#estrutura').offset().top;
    var mContato = $('#contato').offset().top;

    if(documento < mSobre){
        $('#menu a').removeClass('active');
        $('#menu a').eq(0).addClass('active');
    }
    if(documento >= mSobre && documento < mServicos){
        $('#menu a').removeClass('active');
        $('#menu a').eq(1).addClass('active');
    }
    if(documento >= mServicos && documento < mEstrutura){
        $('#menu a').removeClass('active');
        $('#menu a').eq(2).addClass('active');
    }
    if(documento >= mEstrutura && documento < mContato){
        $('#menu a').removeClass('active');
        $('#menu a').eq(3).addClass('active');
    }
    if(documento >= mContato){
        $('#menu a').removeClass('active');
        $('#menu a').eq(4).addClass('active');
    }
});