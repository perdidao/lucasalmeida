// Saudações
console.log('feito com ♥ pelo estudioffw.com');

$('#ver-mais').click(function(e){
	e.preventDefault();

	$('.hidden').slideDown();
	$(this).fadeOut();

});