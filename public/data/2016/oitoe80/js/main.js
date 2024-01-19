// Saudações
console.log('feito com ♥ pelo estudioffw.com');

// Setando a altura dos boxes de acordo com a tela
var sH = $(window).height()+'px';
$('.sH').css('height',sH);

$(window).resize(function(){
    sH = $(window).height()+'px';
    $('.sH').css('height',sH);
});

if(window.matchMedia('(max-width:640px)').matches){

    $('#equipe').css('height','auto');
    $('#equipe .center').css('height','auto');

    $(window).resize(function(){
        $('#equipe').css('height','auto');
        $('#equipe .center').css('height','auto');
    });

} else {

    var item = $('#menu li a');

    item.click(function(){
        var ancora = $(this).attr('href');
        var distancia = $(ancora).offset().top;
        $('html, body').animate({
            scrollTop: distancia
        }, 1000);
        return false;
    });

    $(document).scroll(function(){

        var documento = $(document).scrollTop() + 5;
        var sobre = $('#sobre').offset().top;
        var equipe = $('#equipe').offset().top;
        var contato = $('#contato').offset().top;

        if(documento < sobre){
            item.removeClass('active');
        }
        if(documento >= sobre && documento < equipe){
            item.removeClass('active');
            item.eq(0).addClass('active');
        }
        if(documento >= equipe && documento < contato){
            item.removeClass('active');
            item.eq(1).addClass('active');
        }
        if(documento >= contato){
            item.removeClass('active');
            item.eq(2).addClass('active');
        }

    });

    // Alterando o menu no scroll
    $(document).scroll(function(){

        var top = $(document).scrollTop();

        if(top >= 5){
            $('#menu').addClass('scrolled');
        } else if(top < 5){
            $('#menu').removeClass('scrolled');
        }

        var equipe = $('#equipe').offset().top-10;
        
        if(top >= equipe){
        	$('#equipe .inner').addClass('onscreen');
        }

    });

    // Movimentação das engrenagens pelo scroll
    var elem;
    var valor = 0;
    var ultimoScroll = 0;

    $(document).scroll(function(){

    	elem = $(document).scrollTop();

    	if (elem > ultimoScroll){
    	
    		valor++;

    	} else {

    		valor--;
    		
    	}

    	var rotacao = valor/6+360;
    	$('.cw1 .cog').attr('style', 'transform: rotate('+rotacao+'deg)');
    	$('.cw2 .cog').attr('style', 'transform: rotate(-'+rotacao+'deg)');

    	ultimoScroll = elem;

    });
}

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
//         icon: '/content/static/img/marker.png'
//     });
    
//     var styles = [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#fdeb06"},{"visibility":"on"}]}];
    
//     map.setOptions({styles: styles});

//     directionsDisplay.setMap(map);

// }

// initialize(latMap, longMap);