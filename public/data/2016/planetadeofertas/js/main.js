// Saudações
console.log('feito com ♥ pelo estudioffw.com');

// Clique da Minha Conta no topo
$('#btn-conta').click(function(e){
	e.preventDefault();

	$('.overlay').fadeToggle();
	$('#submenu-conta').slideToggle();

});

// Banner rotativo
$('#banners').owlCarousel({
	items:1,
	singleItem:true,
	loop:1,
	autoplay:true,
	autoplayTimeout:5000
});


// Clique das categorias
$('#btn-categorias').click(function(e){
	e.preventDefault();

	$('#lista-categorias').stop(true,true).slideToggle();

});

$('#lista-categorias .fechar').click(function(e){
	e.preventDefault();

	$('#lista-categorias').slideUp();

});

// Parceiros
var owl = $('#lista-parceiros');
$('#lista-parceiros').owlCarousel({
	items:1,
	singleItem:true,
	loop:1
});

$('#prev-parc').click(function(){
    owl.trigger('prev.owl.carousel');
});

$('#next-parc').click(function(){
    owl.trigger('next.owl.carousel');
});

// Galeria de fotos do produto
$('#galeria').owlCarousel({
	items:1,
	singleItem:true,
	loop:1,
	autoplay:true,
	autoplayTimeout:5000
});

// Quantidade de produtos
var min = $('#qtd').attr('min');
var max = $('#qtd').attr('max');
var atual = $('#qtd').val();

$('.btn-menos').click(function(e){
	e.preventDefault();

	if(atual > min){
		atual = atual - 1;
		$('#qtd').val(atual);
	}

});

$('.btn-mais').click(function(e){
	e.preventDefault();

	if(atual < max){
		atual++;
		$('#qtd').val(atual);
	} else {
		alert('O máximo de ofertas por pedido é de '+max+'.');
	}

});

// Perguntas
$('#perguntas li a').click(function(e){
	e.preventDefault();

	$(this).find('.mais').toggle();
	$(this).find('.menos').toggle();
	$(this).parent().find('.content').slideToggle();

});

// Dados
$('.dados').owlCarousel({
	items:12,
	loop:1,
	nav:true
});
$('#lista-dados .info').hide();

$('.btn-dados').click(function(e){
	e.preventDefault();

	$(this).toggleClass('active');
	$(this).parent().find('.info').slideToggle();

});

// Mapa
var latMap = '-23.331704';
var longMap = '-51.144441';

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
        icon: 'static/img/ico-endereco.png'
    });
    
    var styles = [{"featureType":"administrative","elementType":"all","stylers":[{"saturation":"-100"}]},{"featureType":"administrative.province","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"all","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","elementType":"all","stylers":[{"saturation":-100},{"lightness":"50"},{"visibility":"simplified"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":"-100"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"all","stylers":[{"lightness":"30"}]},{"featureType":"road.local","elementType":"all","stylers":[{"lightness":"40"}]},{"featureType":"transit","elementType":"all","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]},{"featureType":"water","elementType":"labels","stylers":[{"lightness":-25},{"saturation":-100}]}];
    
    map.setOptions({styles: styles});

    directionsDisplay.setMap(map);

}

initialize(latMap, longMap);