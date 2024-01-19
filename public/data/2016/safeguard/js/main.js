// Saudações
console.log('feito com ♥ pelo estudioffw.com');

// Botão de menu responsivo
$('#btn-menu').click(function(e){
	e.preventDefault();

	$(this).toggleClass('active');
	$('#menu').slideToggle();

});

// Interação de perguntas frequentes
$('#perguntas li a').click(function(e){
	e.preventDefault();

	$(this).toggleClass('active');
	$(this).parent().find('.content').slideToggle();

});