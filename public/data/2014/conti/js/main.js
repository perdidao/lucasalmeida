$('.close').click(function(e){
	e.preventDefault();

	$(this).parent().fadeOut();
});

$('#produtos li a').hover(function(){
	$(this).find('.hover').stop(true,true).fadeToggle();
});

$('#subprodutos li a').hover(function(){
	$(this).find('.hover').stop(true,true).fadeToggle();
});