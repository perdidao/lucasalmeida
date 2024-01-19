// BOTÃO MENU --
// -------------
$('#btn-menu').click(function(e){
	e.preventDefault();
    $(this).toggleClass('active');
    $('#menu-wrapper').slideToggle();
});

// MENU --
// -------
var item = $('#menu a');

$('.anchor').click(function(e){
	e.preventDefault();
	var distancia = $($(this).attr("href")).offset().top+10; 
    $('html, body').animate({
        scrollTop: distancia
    }, 1000);
});

$(document).scroll(function(){
	var documento = $(document).scrollTop();
	var servicos = $('#servicos').offset().top;
	var produtos = $('#produtos').offset().top;
	var labs = $('#labs').offset().top;
	var treinamentos = $('#treinamentos').offset().top;
	var ondeEstamos = $('#onde-estamos').offset().top;
	var clientes = $('#clientes').offset().top;
	var contato = $('#contato').offset().top;

	if(documento < servicos){
		item.removeClass('active');
	}
	if(documento >= servicos && documento < produtos){
		item.removeClass('active');
		item.eq(0).addClass('active');
	}
	if(documento >= produtos && documento < labs){
		item.removeClass('active');
		item.eq(1).addClass('active');
	}
	if(documento >= labs && documento < treinamentos){
		item.removeClass('active');
		item.eq(2).addClass('active');
	}
	if(documento >= treinamentos && documento < ondeEstamos){
		item.removeClass('active');
		item.eq(3).addClass('active');
	}
	if(documento >= ondeEstamos && documento < clientes){
		item.removeClass('active');
		item.eq(4).addClass('active');
	}
	if(documento >= clientes && documento < contato){
		item.removeClass('active');
		item.eq(5).addClass('active');
	}
	if(documento >= contato){
		item.removeClass('active');
		item.eq(6).addClass('active');
	}
});

// SERVIÇOS --
// -----------
var Servicos = $('#lista-servicos');
Servicos.owlCarousel({
	items:3,
	itemsDesktop:[1200,3],
	itemsDesktopSmall:[900,3],
	itemsTablet:[800,2],
	 itemsMobile:[420,1]
});

$("#p-servicos").click(function(){
	Servicos.trigger('owl.prev');
});

$("#n-servicos").click(function(){
	Servicos.trigger('owl.next');
});

// PRODUTOS --
// -----------
var produtos = $('#lista-produtos');
produtos.owlCarousel({
	items:1,
	singleItem:true
});

$("#p-produtos").click(function(){
	produtos.trigger('owl.prev');
});

$("#n-produtos").click(function(){
	produtos.trigger('owl.next');
});

// LABS --
// -------
var labs = $('#lista-labs');
labs.owlCarousel({
	items:1,
	singleItem:true
});

$("#p-labs").click(function(){
	labs.trigger('owl.prev');
});

$("#n-labs").click(function(){
	labs.trigger('owl.next');
});

// TREINAMENTOS --
// ---------------
var treinamentos = $('#lista-treinamentos');
treinamentos.owlCarousel({
	items:1,
	singleItem:true
});

$("#p-treinamentos").click(function(){
	treinamentos.trigger('owl.prev');
});

$("#n-treinamentos").click(function(){
	treinamentos.trigger('owl.next');
});

// DEPOIMENTOS --
// --------------
var depoimentos = $('#lista-depoimentos ul');
depoimentos.owlCarousel({
	items:1,
	singleItem:true,
	pagination:true
});

$("#p-depoimentos").click(function(){
	depoimentos.trigger('owl.prev');
});

$("#n-depoimentos").click(function(){
	depoimentos.trigger('owl.next');
});

// TOPO --
// -------
$('#back-top').click(function(e){
	e.preventDefault();
	$('html, body').animate({
        scrollTop: 0
    }, 1000);
});