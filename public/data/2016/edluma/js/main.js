// Saudações
console.log('feito com ♥ pelo estudioffw.com');

window.sr = ScrollReveal();
sr.reveal('#sobre');

// Menu
$(document).scroll(function(){

    var top = $(document).scrollTop();

    if(top >= 180){
        $('#menu').addClass('scrolled');
        $('#banners').addClass('scrolled');
    } else if(top < 180){
        $('#menu').removeClass('scrolled');
        $('#banners').removeClass('scrolled');
    }

});

var item = $('#menu li a');

item.click(function(){
    var ancora = $(this).attr('href');
    var distancia = $(ancora).offset().top - 90;
    $('html, body').animate({
        scrollTop: distancia
    }, 1000);
    return false;
});

$(document).scroll(function(){

    var documento = $(document).scrollTop() + 95;
    var sobre = $('#sobre').offset().top;
    var produtos = $('#produtos').offset().top;
    var localizacao = $('#localizacao').offset().top;
    var contato = $('#contato').offset().top;

    if(documento < sobre){
        item.removeClass('active');
    }
    if(documento >= sobre && documento < produtos){
        item.removeClass('active');
        item.parent().eq(0).find('a').addClass('active');
    }
    if(documento >= produtos && documento < localizacao){
        item.removeClass('active');
        item.parent().eq(1).find('a').addClass('active');
    }
    if(documento >= localizacao && documento < contato){
        item.removeClass('active');
        item.parent().eq(2).find('a').addClass('active');
    }
    if(documento >= contato){
        item.removeClass('active');
        item.parent().eq(3).find('a').addClass('active');
    }

});

// Banners
$('#banners ul').owlCarousel({
	items:1,
	singleItem:true,
	loop:true,
	nav:true,
	autoplay:true,
	autoplayTimeout:4000
});

// Parallax
$('#parallax1').parallax('100%', -0.3);
$('#parallax2').parallax('100%', -0.3);

// Produtos
$('#produtos ul').owlCarousel({
	items:3,
	loop:true,
	nav:true,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:2
        },
        1000:{
            items:3
        }
    }
});

$('#produtos ul li').hover(function(){
	$('#produtos ul li').not(this).toggleClass('hovered');
});

// Mapa
// var latMap = '-23.1230';
// var longMap = '-50.3689';

// var map;

// function initialize(lat, lng) {
    
//     var mapOptions = {
//         center: new google.maps.LatLng(lat, lng),
//         zoom: 17,
//         scrollwheel: false,
//         disableDefaultUI: true,
//     };

//     var map = new google.maps.Map(document.getElementById("mapa"),
//         mapOptions);

//     var marker = new google.maps.Marker({
//         position: new google.maps.LatLng(lat, lng),
//         map: map,
//         icon: 'static/img/marker.png'
//     });
    
//     var styles = [{"featureType":"all","elementType":"all","stylers":[{"hue":"#ffbb00"}]},{"featureType":"all","elementType":"geometry.fill","stylers":[{"hue":"#ffbb00"}]},{"featureType":"all","elementType":"labels.text.fill","stylers":[{"hue":"#ffbb00"}]}];
    
//     map.setOptions({styles: styles});

//     directionsDisplay.setMap(map);

// }

// initialize(latMap, longMap);
