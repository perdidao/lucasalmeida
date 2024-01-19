// INTERAÇÃO COM PRODUTOS
$('#produtos li a').click(function(e){
	e.preventDefault();

	$('#produtos li a').addClass('faded');
	$(this).removeClass('faded').addClass('active');

	$('#subprodutos').slideDown();

	var distancia = $('#subprodutos').offset().top; 
    
    $('html, body').animate({
        scrollTop: distancia
    }, 1000);

});

$('#subprodutos li a').click(function(e){
	e.preventDefault();

	$('#subprodutos li a').addClass('faded');
	$(this).removeClass('faded').addClass('active');

	$('#produto-aberto').slideDown();
	$('#fotos-produto').slideDown();

	var distancia = $('#produto-aberto').offset().top; 
    
    $('html, body').animate({
        scrollTop: distancia
    }, 1000);

});

$('#fechar').click(function(e){
	e.preventDefault();

	$('#produto-aberto').slideUp();
	$('#fotos-produto').hide();
	$('#subprodutos li a').removeClass('active').removeClass('faded');

	var distancia = $('#subprodutos').offset().top; 
    
    $('html, body').animate({
        scrollTop: distancia
    }, 1000);
});

$('#btn-sim').click(function(e){
	e.preventDefault();

	$('#idade').fadeOut();
});

$('#btn-nao').click(function(e){
	e.preventDefault();

	window.location.href = '/index.html';
});

$(document).ready(function(){
	var lista = $('#lista-info-produto');

	lista.owlCarousel({
		items:1,
		singleItem:true
	});

	$("#prev").click(function(){
		lista.trigger('owl.prev');
	});

	$("#next").click(function(){
		lista.trigger('owl.next');
	});

});