// Saudações
console.log('feito com ♥ pelo estudioffw.com');

// Menu
var item = $('#menu a');

item.click(function(){
    var ancora = $(this).attr('href');
    var distancia = $(ancora).offset().top - 125;
    $('html, body').animate({
        scrollTop: distancia
    }, 1000);
    return false;
});

// Mundo melhor
var fotos = $('.fotos');
fotos.owlCarousel({
    singleItem:true,
    items:1,
    navigation:true,
    pagination:false
});

// Serviços
var sync1 = $("#det-servicos");
var sync2 = $("#lista-servicos");

sync1.owlCarousel({
    singleItem:true,
    items:1,
    navigation:true,
    pagination:false,
    afterAction:syncPosition
});

sync2.owlCarousel({
    items:7,
    afterInit : function(el){
        el.find(".owl-item").eq(0).addClass("synced");
    }
});

function syncPosition(el){

    var current = this.currentItem;

    $("#lista-servicos").find(".owl-item").removeClass("synced").eq(current).addClass("synced");

    if($("#lista-servicos").data("owlCarousel") !== undefined){

        center(current);

    }

} // OK

$("#lista-servicos").on("click", ".owl-item", function(e){

    e.preventDefault();

    var number = $(this).data("owlItem");

    sync1.trigger("owl.goTo",number);

}); // OK

function center(number){

    var sync2visible = sync2.data("owlCarousel").owl.visibleItems;

    var num = number;

    var found = false;

    for(var i in sync2visible){

        if(num === sync2visible[i]){

            var found = true;

        }
    } // OK

    if(found===false){
        
        if(num>sync2visible[sync2visible.length-1]){
        
            sync2.trigger("owl.goTo", num - sync2visible.length+2);
        
        } else {

            if(num - 1 === -1){

                num = 0;

            }

            sync2.trigger("owl.goTo", num);

        }

    } else if(num === sync2visible[sync2visible.length-1]){

        sync2.trigger("owl.goTo", sync2visible[1]);

    } else if(num === sync2visible[0]){

        sync2.trigger("owl.goTo", num-1);

    }

}

// Empresas
$('#categorias li a').click(function(e){
    e.preventDefault();

    // Captura o item
    var categoria = '#' + $(this).attr('data-item');

    // Muda o item ativo
    $('#categorias li a').removeClass('active');
    $(this).addClass('active');

    // Mostra a categoria correta
    $('.lojas').hide();
    $(categoria).fadeIn();

});

// Mapa
var latMap = '-23.3637212';
var longMap = '-51.4042527';

var map;

function initialize(lat, lng) {
    
    var mapOptions = {
        center: new google.maps.LatLng(lat, lng),
        zoom: 17,
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
            stylers: [
                { hue: "#CB352F" },
                { saturation: -50 }
            ]
        }
    ];
    
    map.setOptions({styles: styles});

    directionsDisplay.setMap(map);

}

initialize(latMap, longMap);