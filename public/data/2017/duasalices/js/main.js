// Saudações
console.log('feito com ♥ pelo estudioffw.com');

// Menu
$('#btn-menu').click(function(e){
	e.preventDefault();

    $(this).toggleClass('active');

    $('#header nav').slideToggle();

});

// Abas
$('#tabs li a').click(function(e){
	e.preventDefault();

	$('#tabs li a').removeClass('active');
	$(this).addClass('active');

	var item = $(this).attr('data-section');
	$('.tabs').hide();
	$(item).fadeIn();

});

// Máscaras de campo
$('#f-fone').mask('(99) 99999999?9');
$('#f-data').mask('99/99/99?99');
$('#f-hora').mask('99:99');

montaUF('BR');